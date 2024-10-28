import mongoose from "mongoose";
// Define schema
const userSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  subscribedOn: { type: Date, default: Date.now(), required: true },
  subscriptionExpiresOn: { type: Date },
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

export default User;
