const knex = require('../model/table')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt');

Registration = (req, res) => {
    console.log('hello')
    if (!req.body.FirstName || !req.body.LastName || !req.body.Email || !req.body.Password) {
        res.status(400).json({
            succes: 0,
            message: 'Failed All filed Required'
        })
    } else {
        bcrypt.hash(req.body.Password, 10)
            .then((hashedPassword) => {
                console.log(hashedPassword)
                const registrationData = {
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    Email: req.body.Email,
                    Password: hashedPassword
                }
                knex('Users').insert(registrationData)
                    .then((data) => {
                        knex.select('*').from('Users').where('id', data)

                            .then((post) => {
                                console.log(post)
                                res.status(200).json({
                                    succes: 1,
                                    message: 'New Registration added',
                                    data: post})
                            }).catch((err) => {
                                console.log(err);
                                res.send({
                                    error: 'Invalid details!'})
                                    console.log(err)})
                    }).catch((err) => {
                        console.log(err);
                        res.send({
                            error: 'Email already exits!'})
                            console.log(err)})

            }).catch(error => next(error))
        }
}








get_registration = (req, res) => {
    knex.select('*').from('Users')
        .then((getData) => {
            console.log(getData)
            res.send({
                message: 'Get registartion data successfully',
                data: getData,
                decode: req.userData})
        }).catch((err) => {
            res.send({
                error: 'Someting problme'
            })
            console.log(err)})
}





Login = (req, res) => {
    if (!req.body.Email || !req.body.Password) {
        res.status(401).json({
            succes: 0,
            message: 'Failed Required Both Fild'})
    }else{
        knex.select("*").from("Users").where('Email', '=',req.body.Email,'Password', '=', req.body.Password)
            .then((loginData) => {
                console.log(loginData)
                if (loginData.length < 1) {
                    res.status(401).json({
                        message: 'user Failed'})
                } else {
                    bcrypt.compare(req.body.Password, loginData[0].Password, function (err, result) {
                        // agar error h to err show karega
                        if (err) {
                            // console.log(err)
                            res.status(401).json({
                                message: 'Password Failed'})
                                // agar password sahi raha to result dega
                }
                        //using JWT for 
                        var token = jwt.sign({id: loginData[0].id}, 'sangeetapaswan', {expiresIn: '6h'})
                        res.cookie("user ",token)
                        if (result) {
                            res.status(200).json({
                                message: 'You are login successfully',
                                Profile: loginData,
                                token: token })
                        } else {
                            res.status(401).json({
                                message: 'Auth Failed'
                            })
                        }
                    });
                }
            }).catch((err) => {
                res.send({
                    message: "Invalid credentials!"
                })
                 })
    }
}





// Logout = (req, res) => {
//     res.clearCookie('user')
//     .then((deleteCookie)=>{
//         console.log(deleteCookie,'cookies')
//         res.status(200).json({
//             message:'Logout Sccesfully'
//         })
//     }).catch((err)=>{
//         res.send({message:'You are login'})
//     })
   



// }







module.exports = {
    Registration,
    get_registration,
    Login
    //Logout
}