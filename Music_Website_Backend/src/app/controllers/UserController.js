const accountModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class userController {
    login = async (req, res) => {
        try {
            const userBody = req.body;
            const user = await accountModel.findOne({
                email: String(userBody.username),
            });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User not found', status: 'error' });
            }

            const isPasswordValid = await bcrypt.compare(
                userBody.password,
                user.password,
            );

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: user._id }, 'secret', {
                expiresIn: '1h',
            });
            const signStatus = {
                status: 'ok',
                type: 'account',
                currentAuthority: user.access,
            };

            res.json({ token, signStatus });
            console.log(signStatus);
            console.log(token);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
        }
    };

    register = async (req, res) => {
        try {
            const userBody = req.body;

            // Check if the email already exists in the database
            const existingUser = await accountModel.findOne({
                email: userBody.email,
            });
            if (existingUser) {
                return res
                    .status(409)
                    .json({ message: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(userBody.password, 10);

            // Create a new user object with hashed password
            const newUser = new accountModel({
                email: userBody.email,
                password: hashedPassword,
                access: userBody.access,
                name: userBody.name,
                phone: userBody.phone,
                avatar: userBody.avatar,
                address: userBody.address,
            });

            // Save the new user to the database
            const savedUser = await newUser.save();

            res.status(201).json({
                message: 'User registered successfully',
                user: savedUser,
            });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({
                error: 'Failed to register user',
                status: 'error',
            });
        }
    };

    findUser = async (req, res) => {
        try {
            const userBody = req.body;
            console.log(userBody);
            const user = await accountModel.findOne({
                email: String(userBody.username),
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({
                name: user.name,
                access: user.access,
                avatar: user.avatar,
                userid: user._id,
                phone: user.phone,
                email: user.email,
                address: user.address,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
        }
    };

    findUserByToken = async (req, res) => {
        try {
            const token = req.body;
            console.log(token);
            const decodedToken = jwt.verify(token.token, 'secret');
            console.log(decodedToken);
            const user = await accountModel.findOne({
                _id: String(decodedToken.id),
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({
                name: user.name,
                access: user.access,
                avatar: user.avatar,
                userid: user._id,
                phone: user.phone,
                email: user.email,
                address: user.address,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
        }
    };
}

module.exports = new userController();
