const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { HOST } = require("../constants/index.js");
const admin = require("../models/admin")
const Otp = require("../models/otp.js")
const session = require('express-session');
const category = require("../models/category.js");
const subcategory = require("../models/subCategory.js");
//const bcrypt = require('bcryptjs');
const Restaurant = require("../models/restaurant.js")
dotenv.config();
const mongoose = require('mongoose');
module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;
        console.log(username)
        try {
            const existingUser = await admin.findOne({ username: username });
            if (!existingUser)
                return res.json({ status: "fail", message: "user not found " });
            if (existingUser.password != password)
                return res.json({ status: "fail", message: "incorrect password " });
            const token = jwt.sign(
                { userName: req.body.username, type: 'admin ' },
                process.env.TOKEN_SECRET,
                { expiresIn: "2h" }
            );
            res.cookie("cookie", token, {
                withCredentials: true,
                httpOnly: false,
            });
            res.json({
                status: "success",
                message: "logged in successfully",
                token: token,
                username: req.body.username,
            });
        } catch (error) {
            console.log(error.message);
        }
    },
    emailSend: async (req, res) => {
        const email = req.body.email
        console.log(email)
        let data = await admin.findOne({ username: email })

        if (data) {
            let otpCode = Math.floor((Math.random() * (99999 - 10000) + 100000))
            let otpData = new Otp({
                email: req.body.email,
                code: otpCode,
                expireIn: new Date().getTime() + 300 * 1000
            })

            let otpRespone = await otpData.save()
            var otpResponeCode = otpRespone.code
            mailer(email, otpResponeCode)
            res.json({ status: "success", message: "please check your email" })
        }
        else {
            res.json({ status: "fail", message: "email not exist" })
        }

    },
    verifyOtp: async (req, res) => {
        const { email, otp, newPassword } = req.body;

        let data = await Otp.find({ code: otp })
        //let data=await otp.findOne({code:otpCode})
        console.log(data)

        if (data && data.length > 0) {
            let currentTime = new Date().getTime()
            let expirationTime = data[0].expireIn
            let timeDifference = expirationTime - currentTime;
            console.log(timeDifference)
            if (timeDifference <= 0) {
                res.status(400).json({ message: "otp expired" })

            }
            else {
                const filter = { username: email }; // Specify the filter to identify the user
                const update = { $set: { password: newPassword } }; // Set the new password field

                admin.findOneAndUpdate(filter, update)
                    .then(result => {
                        res.status(200).json({ message: 'Password changed successfully' });
                    })
            }
            // bcrypt.genSalt(10, (err, salt) => {
            //     bcrypt.hash(newPassword, salt, (err, hash) => {
            //         if (err) throw err;
            // Store the new password hash in your database

            // res.status(200).json({ message: 'Password changed successfully' });
            //     });
            // });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }

    }, getCategory: async (req, res) => {
        try {
            const categories = await category.find().populate('subcategories');
            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    },
    addCategory: async (req, res) => {
        const { name } = req.body;
        try {

            let categoryExists = await category.findOne({ name: name });

            if (categoryExists) {
                return res.status(409).json({ success: false, error: 'category_exists', message: 'Category already exists' });
            }


            let newCategory = await category.create({ name });
            if (!newCategory) {
                return res.status(500).json({ success: false, error: 'unable_to_add', message: 'Unable to add category' });
            }

            return res.status(200).json({ success: true, category: newCategory });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'server_error', message: 'Failed to save category' });
        }
    },

    editCategory: async (req, res) => {

        const { categoryId } = req.params;
        const { categname } = req.body;
        console.log("name", categname)

        try {
            const categ = await category.findByIdAndUpdate(
                categoryId,
                { name: categname },
                { new: true }
            );

            console.log("Updated Category:", categ);
            res.status(200).json({ message: " category is edited" });
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }, deleteCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            await category.findByIdAndDelete(categoryId);
            res.status(200).json({ message: "category deleted" });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }, getCategoryById: async (req, res) => {
        const categoryId = req.params.categoryId;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ error: 'Invalid categoryId' });
        }

        try {
            const getcategory = await category.findById(categoryId);
            console.log(getcategory)

            if (!getcategory) {
                return res.status(404).json({ error: 'Category not found' });
            }

            res.json(getcategory);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch category details' });
        }
    },

    addSubCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const name = req.body.name;
            const categ = await category.findById(categoryId);
            let categoryeexist = await subcategory.findOne({ name: name })
            if (categoryeexist) {
                return res.json({ status: "fail", message: 'subcategory already exist' })
            }
            const subcateg = new subcategory({ name });
            let subdata = await subcateg.save();
            console.log(subdata)
            console.log(categ)
            categ.subcategories.push(subcateg._id);
            let data = await categ.save();
            res.status(200).json({ message: subcateg });
        } catch (error) {
            console.error('Error creating subcategory:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }, deleteSubcategory: async (req, res) => {
        try {
            const { categoryId, subcategoryId } = req.params;
            await category.findByIdAndUpdate(categoryId, { $pull: { subcategories: subcategoryId } });
            await subcategory.findByIdAndDelete(subcategoryId);
            res.json({ message: 'Subcategory deleted successfully' });
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    },
    editSubcategory: async (req, res) => {
        try {
            const { categoryId, subcategoryId } = req.params;
            const { name } = req.body;
            await subcategory.findByIdAndUpdate(subcategoryId, { name });
            res.json({ message: 'Subcategory updated successfully' });
        } catch (error) {
            console.error('Error updating subcategory:', error);
            res.status(500).json({ error: 'An error occurred' });
        }

    }, getSubcategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const categ = await category.findById(categoryId).populate('subcategories');
            res.json(categ.subcategories);
        } catch (error) {
            console.error('Error retrieving subcategories:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    },
    getSubCategoryById: async (req, res) => {
        const categoryId = req.params.categoryId;
        const subcategoryId = req.params.subcategoryId;

        try {
            const getcategory = await category.findById(categoryId);
            console.log(getcategory)
            if (!getcategory) {
                console.log('Category not found');
                res.status(404).json({ message: "Category not found" })
                return;
            }

            const getsubcategory = await subcategory.findById(subcategoryId);

            if (!getsubcategory) {
                res.status(404).json({ message: "SubCategory not found" })
                return;
            }

            console.log('Subcategory:', getsubcategory);
            return res.status(200).json({ message: getsubcategory });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch category details' });
        }
    },

    saveRestaurant: async (req, res) => {
        const { restname, slug, subtitle, time, description, location, waiter } = req.body;
        let coverImage = req.files['coverImage'] ? req.files['coverImage'][0].originalname : '';
        let restImage = req.files['restImage'] ? req.files['restImage'][0].originalname : '';


        try {
            let restaurant = await Restaurant.findOne()
            console.log(restaurant)
            if (!restaurant) {
                // Create a new restaurant instance if it doesn't exist
                restaurant = new Restaurant({
                    restname,
                    slug,
                    subtitle,
                    time,
                    description,
                    location,
                    waiter,
                    coverImage: coverImage,
                    restImage: restImage,
                });

                await restaurant.save();
                console.log("New restaurant data added");
                res.status(200).json({ message: 'New restaurant data saved successfully' });
            } else {
                // Update the existing restaurant document
                restaurant.restname = restname || restaurant.restname;
                restaurant.subtitle = subtitle || restaurant.subtitle;
                restaurant.time = time || restaurant.time;
                restaurant.description = description || restaurant.description;
                restaurant.location = location || restaurant.location;
                restaurant.waiter = waiter || restaurant.waiter;
                restaurant.coverImage = coverImage || restaurant.coverImage;
                restaurant.restImage = restImage || restaurant.restImage;

                await restaurant.save();
                console.log("Restaurant data updated");
                res.status(200).json({ message: 'Restaurant data saved successfully' });
            }
        } catch (error) {
            console.error('Error saving restaurant data:', error);
            res.status(500).json({ error: 'An error occurred while saving the restaurant data' });
        }
    },

    getRestaurant: async (req, res) => {
        try {
            const restaurant = await Restaurant.find()
            res.status(200).json({ message: restaurant });
        } catch (error) {
            console.error('Error fetching :', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }
}
const mailer = (email, otp) => {
    console.log(email)
    var nodemailer = require('nodemailer')
    //   console.log(otp)
    //  var otpResponeCode=strings.bold(otp)
    //  console.log(otpResponeCode)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'ayishasifna@gmail.com',
            pass: 'kvthkbvgfnzpyywe'
        }
    })
    var mailOptions = {
        from: 'ayishasifna@gmail.com',
        to: email,
        subject: otp + " otp verification",
        html: "<h3>Hi! Here is your single use verification code for:</h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" +
            "<p>Be quick! it expire soon</p>"
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Email sent:" + info.response)
        }
    })
}

