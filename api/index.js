const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken")
const User = require("./models/user")

/**
 * Conection to the Database Atlas MongoDB
 */
mongoose.connect("mongodb+srv://rsca:admin123@cluster0.qbz06cj.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB")
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error)
    })

app.listen(port, () => {
    console.log("Server is running on port", port)
})

/*********************************************
 * Endpoint to register a user to the backend
 *********************************************
 */
app.post("/register", async(req, res) => {
    console.log("Info recibida en el back para mandar a DB: ", req.body)
    try {
        const {name, email, password} =  req.body;

        //Check wether the email is already register
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(400).json({message: "User already exists"})
        }
        // Create a new User
        const newUser = new User({
            name,
            email,
            password
        });
        //Generate a verification Token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // Save the user to the backend
        await newUser.save();

        //Send the verification email to the registered User
        sendVerificationEmail(newUser.email, newUser.verificationToken)
    } catch (error) {
        console.log("Error registering user")
        res.status(500).json({message:"Registration failed"})
    }
})

const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:"...",
            pass: "..."
        }
    })

    const mailOptions = {
        from: "matchmake.com",
        to:email,
        subject: "Verficación de email",
        text:`Por favor click en el siguiente link para verificar tu correo : http://localhost:3000/verify/${verificationToken}`
    }

    // Send the email
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("Error sending the verification email")
    }
}

/***********************
 * Api to verify the user
 **********************
 */
 app.get("/verify/:token", async(req, res) => {
    try {
        const token = req.params.token
        const user = await User.findOne({verificationToken:token})
        if (!user) {
            return res.status(404).json({message:"Invalid verification token"})
        }
        //mark the user as verified
        user.verified = true  // We change the default value from the model to true
        user.verificationToken = undefined

        await user.save();
        res.status(200).json({message:"Email verified Succesfully"})

    } catch (error) {
        console.log("error ", error)
        res.status(500).json({message: "Email verification failed"})
    }
 })
