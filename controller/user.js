require('dotenv').config();
const {logger} = require('../utils/logger');
const userModel = require('../models/DB_associations').User;
const productModel = require('../models/DB_associations').Product;

const { signupValidate } = require('../validation/user');
const jwt = require('jsonwebtoken');


class User {
    signup = async (req,res, next) => {
        try{
            // Validate request
            logger.info('Start signup user - - -');
            const {error, value} = signupValidate(req.body);

            if (error) {
                logger.error('ValidationError', error.message);
                return res.status(400).json({
                    message:error.message
                })
            }

            const oldUser = await userModel.findOne({ where: {email: req.body.email} })
            if (oldUser) {
                logger.error('User Already Exist. Please Login')
                return res.status(409).json({
                    message:"User Already Exist. Please Login"
                });
            }

            // Save User in the database
            const user = await userModel.create({
                ...value
            });
            await user.save()
            return res.status(201).json({
                user
            })
        } catch (e) {
            logger.error(`Signup Error: ${e.message}`)
            next(e)
        }
    };

    login = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userModel.findOne({ where: {email: req.body.email} })
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            if (password != user.password) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            if(user && await user.password){
                // Create token
                const token = jwt.sign(
                    { id: user.id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                // user
                res.status(200).json({
                    user,
                    access_token:token
                });
            }

        } catch (e) {
            console.log(`Login Error: ${e.message}`)
            next(e)
        }
    };

    getOne = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userModel.findOne({ where: {id: id} });
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                })
            };

            return res.status(200).json({user})
        } catch (e) {
            console.log(e.message)
            next(e)
        }
    };

    getUserWithProducts = async (req, res, next) => {
        try{
            const { id } = req.params;
            const user = await userModel.findOne({
                where: {
                    id
                } ,
                include: [{
                    required:true,
                    model:productModel
                }]
            });
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                })
            };
            return res.status(200).json({user})

        } catch (e) {
            next(e)
        }
    };
};

module.exports = new User()