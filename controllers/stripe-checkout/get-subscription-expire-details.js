import User from "../../models/user-model/user-model.js";

const getSubscriptionExpireDetails = async (req, res) => {
  const { uuid } = req.query;
  try {
    const user = await User.findOne({ uuid: uuid });
    if (!!user) {
      return res.status(200).send({
        subscriptionExpiresOn: user?.subscriptionExpiresOn,
      });
    }
    return res.status(200).send({ subscriptionExpiresOn: new Date() });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ subscriptionExpiresOn: new Date() });
  }
};

export default getSubscriptionExpireDetails;
