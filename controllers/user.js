const user = require("../models/user.js");

module.exports.renderSignupForm =(req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup =async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new user({ email, username });
        const registeredUser = await user.register(newUser, password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome To WonderLust");
            res.redirect("/listing");
        })
    } catch (e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm =(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.Login =async(req,res)=>{
    req.flash("success","Welcome back to WonderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect( redirectUrl);
}

module.exports.LogOut =(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","You are Logged Out!");
        res.redirect("/listing");
    })
}
