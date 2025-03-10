import User from "../../models/user-model/user-model.js";

const getSubscriptionExpireDetails = async (req, res) => {
  const { uuid } = req.query;
  try {
    const user = await User.findOne({ uuid: uuid });
    console.log(user);
    if (!!user) {
      return res.status(200).send({
        subscriptionExpiresOn:
          user?.subscriptionExpiresOn ||
          new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
      });
    }
    return res.status(200).send({
      subscriptionExpiresOn: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
    });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({
      subscriptionExpiresOn: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
    });
  }
};

export default getSubscriptionExpireDetails;
