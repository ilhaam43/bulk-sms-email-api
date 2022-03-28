const config = require('./../config/config')
const User = require('../models/user');
const res = require('express/lib/response');
const client = require('twilio')(config.accountSid, config.authToken);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//function for get all users data
const getUsers = async (req, res) =>  {
    try {
        let getUsers = await User.find({});
        res.json(getUsers);
    } catch (error) {
        res.json(error)
    }
}

//function for create user data
const createUser = async (req, res) =>  {
    const userData = new User({
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
    });

    try {
        let createUser = await userData.save();
        res.status(201).json(createUser);
    } catch (error) {
        res.json(error)
    }
}

//function for send SMS to all users
const sendSMS = async (req, res) =>  {
    const message = 'Test message';
    const fromNumber = config.twilioNumber;
    let usersData = await User.find({});
    const targetNumbers = usersData.map(user => { 
        return user.phone;
    }); //get all users phone number

    try {
        let sendMessage = await targetNumbers.map(targetNumber => {
                client.messages.create({
                to: targetNumber,
                from: fromNumber,
                body: message
            });
        });
        res.status(200).json('Send SMS Success');
    } catch (error) {
        res.json(error)
    }
}

//function for send email to all users
const sendEmail = async (req, res) => {
    let usersData = await User.find({});
    const targetEmails = usersData.map(user => {
        return user.email;
    });
    const emailMessage = {
        to: targetEmails,
        from: 'test@gmail.com',
        subject: 'Test Email',
        text: 'This is test email',
        html: '<p>This is test email</p>',
    };

    try {
        let sendEmail = await sgMail.sendMultiple(emailMessage);
        res.status(200).json('Send Email Success');
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    getUsers,
    createUser,
    sendSMS,
    sendEmail
}