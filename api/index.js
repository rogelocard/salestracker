require('dotenv').config();
//.env variables
const dbUri = process.env.DB_URI;
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;
const apiHost = process.env.API_HOST;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 8000;
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
mongoose.connect(`${dbUri}`).then(() => {
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
    try {
        const {name, email, password} =  req.body;

        //Check wether the email is already register
        const existingUser = await User.findOne({email});
        if (existingUser) {
            // res.status(400).json({message: "User already exists"})
           return res.status(400).json({message: "User already exists"})
        }

        // Encrypt/Cypher text plain password, provided by the user
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new User
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        //Generate a verification Token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // Save the user to the backend
        await newUser.save();
        console.log("Se guardo el nuevo usuario")
        //Send the verification email to the registered User
        sendVerificationEmail(newUser.email, newUser.verificationToken)
        res.status(200).json({message:"Registration succeded"})

    } catch (error) {
        console.log("Error registering user")
        res.status(500).json({message:"Registration failed"})
    }
})

/**
 * Function to send the email for verification
 * @param {*} email registerd by the user
 * @param {*} verificationToken created during registration
 */
const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: mailUser,
            pass: mailPass
        }
    })

    const mailOptions = {
        from: "matchmake.com",
        to:email,
        subject: "Verificación de email",
        text:`Has click en el siguiente link para verificar tu correo : ${apiHost}/verify/${verificationToken}`
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
            return res.status(404).json({message:"Token de verificación invalido"})
        }
        //mark the user as verified
        user.verified = true  // We change the default value from the model to true
        user.verificationToken = undefined

        await user.save();
        res.status(200).json({message:"El email se verificó satisfactoriamente"})

    } catch (error) {
        console.log("error ", error)
        res.status(500).json({message: "Fallo en la verificación del email"})
    }
 })

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey
}

const secretKey = generateSecretKey();

/******************************
 * API to LOGIN
 ******************************
 */
app.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;

        // Check if the user exists already
        const user = await User.findOne({email});
        // console.log("user: ", user)
        if (!user) {
            return res.status(401).json({message: "Email o contraseña invalidos"})
        }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message:"Contraseña invalidos"})
        }
        // if(user.password !== password){
        //     return res.status(401).json({message:"Contraseña invalidos"})
        // }
        const token = jwt.sign({userId:user._id}, secretKey)
        res.status(200).json({token})

    } catch (error) {
        res.status(500).json({message: "Falló en el login"})
    }
})