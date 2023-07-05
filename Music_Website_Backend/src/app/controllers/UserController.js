const accountModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const util = require('util');
const hashAsync = util.promisify(bcrypt.hash);


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
            return res.status(409).json({ message: 'Email already exists' });
          }
      
          // Hash the password
          const saltRounds = 10;
        //   const hashedPassword = await hashAsync(userBody.password, saltRounds);
      
          // Create a new user object with hashed password
          const newUser = new accountModel({
            email: userBody.email,
            password: userBody.password,
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

    getAllUser(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        accountModel.countDocuments({}, function (err, count) {
            if (err) {
                return res.status(500).json({ error: 'Error!!!' });
            }
    
            accountModel
                .find({})
                .skip(skip)
                .limit(limit)
                .exec(function (err, accountModels) {
                    if (err) {
                        return res.status(500).json({ error: 'Error!!!' });
                    }
    
                    const totalPages = Math.ceil(count / limit);
    
                    res.json({
                        accountModels,
                        currentPage: page,
                        totalPages,
                    });
                });
        });
    }
}

module.exports = new userController();
