import User from "../../models/user-model/user-model.js";

const createSubscribedUser = async (uuid) => {
  try {
    return await User.create({
      uuid: uuid,
      subscribedOn: Date.now(),
      subscriptionExpiresOn: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const subscribeUserAfterPayment = async (req, res) => {
  const { uuid } = req.body;

  try {
    const userAlreadyExist = await User.findOne({ uuid: uuid });

    if (userAlreadyExist) {
      const subscriptionExpiresOn = userAlreadyExist?.subscriptionExpiresOn;

      if (subscriptionExpiresOn > Date.now()) {
        return res.status(200).send({
          message: "User Already Subscribed",
          code: "already_subscribed",
          subscriptionExpiresOn,
        });
      }

      const subscribedUser = await createSubscribedUser(uuid);
      return res.status(201).send({
        message: "User subscribed successfully",
        subscriptionExpiresOn: subscribedUser?.subscriptionExpiresOn,
      });
    } else {
      const subscribedUser = await createSubscribedUser(uuid);
      return res.status(201).send({
        message: "User subscribed successfully",
        subscriptionExpiresOn: subscribedUser?.subscriptionExpiresOn,
      });
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
};

export default subscribeUserAfterPayment;
