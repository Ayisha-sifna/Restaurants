const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const { login, emailSend, verifyOtp, addCategory, addSubCategory, getCategory, editCategory, deleteCategory,
  deleteSubcategory, editSubcategory, getSubcategory, saveRestaurant, getCategorybyId, getCategoryById, getRestaurant, getSubCategoryById } = require("../controller/admincont")
const { adminAuthMiddleWare } = require("../auth/adminauth");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });



router.post("/login", login);
router.post("/emailSend", adminAuthMiddleWare, emailSend)
router.post("/verify-otp", adminAuthMiddleWare, verifyOtp)
router.post("/categories", adminAuthMiddleWare, addCategory)
router.get("/categories", getCategory)
router.put("/categories/:categoryId", adminAuthMiddleWare, editCategory)
router.delete('/categories/:categoryId', adminAuthMiddleWare, deleteCategory)
router.get('/categories/:categoryId', adminAuthMiddleWare, getCategoryById)
router.post('/categories/:categoryId/subcategories', adminAuthMiddleWare, addSubCategory)
router.delete('/categories/:categoryId/subcategories/:subcategoryId', adminAuthMiddleWare, deleteSubcategory)
router.put('/categories/:categoryId/subcategories/:subcategoryId', adminAuthMiddleWare, editSubcategory)
router.get('/categories/:categoryId/subcategories', adminAuthMiddleWare, getSubcategory)
router.get('/categories/:categoryId/subcategories/:subcategoryId', adminAuthMiddleWare, getSubCategoryById)
router.post("/save-restaurant", upload.fields([{ name: 'coverImage' }, { name: 'restImage' }]), adminAuthMiddleWare, saveRestaurant)
router.get("/restaurant", adminAuthMiddleWare, getRestaurant)
mongoose.connect("mongodb://127.0.0.1:27017/restaurant").then(() => {
  console.log("server started")
})


module.exports = router;
