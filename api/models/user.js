const mongoose = require("mongoose") // Initialize mongoose

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    sales: [ // It contains the sales made by the user identified by the SalesID
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sale"  //saleId or Sale
        }
    ],
    profileImages: [{
        type: "String"
    }],
    verified: { // Check whether a user has been authenticated or not. 
        type: Boolean,
        default: false
    },
    verificationToken: String,
})

const User = mongoose.model("User", userSchema)

module.exports = User