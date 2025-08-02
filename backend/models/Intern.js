import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    referralCode: String,
    totalDonations: Number,
    rewards: [{ title: String, unlock: String }],
    donationsHistory: [{ month: String, amount: Number }],
});

const Intern = mongoose.model("Intern", internSchema);
export default Intern;
