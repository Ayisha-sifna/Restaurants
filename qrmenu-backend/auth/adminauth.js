const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const admin = require("../models/admin");
module.exports = {
    adminAuthMiddleWare: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, String(process.env.TOKEN_SECRET));
            req.adminData = decode;
            const exist = await admin.findOne({ username: decode.userName });
            if (!exist) {
                return res.status(200).json({
                    status: "fail",
                    message: 'Please login as admin',

                });
            }
            if (!(decode?.exp)) {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Your token has expired. Please login again',
                });
            }
            const expirationDateTimeInSeconds = decode?.exp * 1000;
            if (Date.now() > expirationDateTimeInSeconds) {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Your token has expired. Please login again',

                });

            }

            next()
        } catch (error) {
            return res.status(200).json({
                status: 'fail',
                message: 'Your token has expired. Please login again',
            });
        }
    }
};