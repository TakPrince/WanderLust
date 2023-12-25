const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const warpAsync = require("../utils/wrapAsyn.js");
const { route } = require("./listing");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/user.js");


router.route("/signup")
.get(usercontroller.renderSignupForm)
.post(warpAsync(usercontroller.signup));

router.route("/login")
.get(usercontroller.renderLoginForm)
.post(saveRedirectUrl,
passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true,
}),
usercontroller.Login
);

router.get("/logout",usercontroller.LogOut)

module.exports = router;