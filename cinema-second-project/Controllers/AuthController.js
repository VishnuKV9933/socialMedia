const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Error } = require("mongoose");
const UserModel = require("../Models/UserModel");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.userJwtKey, {
    expiresIn: maxAge,
  });
};

const createAdminToken = (id) => {
  return jwt.sign({ id }, process.env.adminJwtKey, {
    expiresIn: maxAge,
  });
};

const handleErr = (err) => {
  let errors = { email: "", password: "" };
  if (err.message === "Email not in use") {
    errors.email = "Email not in use";
    return errors;
  } else if (err.message === "wrong pasword") {
    errors.password = "wrong pasword";
    return errors;
  } else if (err.message.includes("Users validation failed")) {
    console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};
const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  console.log(err);
  if (err.keyPattern?.email === 1) {
    console.log("err");
    errors.email = "email is already in use";
    return errors;
  } else if (err.keyPattern?.mobile === 1) {
    console.log("err12");
    errors.email = "Mobile number is already in use";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};

const userSignUP = async (req, res) => {
  try {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashPassword,
    });
    await newUser.save().then((user) => {
      const token = createToken(user._id);

      res.cookie("jwt", token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 10000,
      });
      res.status(200).json({ user: user._id,created: true });
    });
  } catch (err) {
    const errors = handleErrors(err);
    console.log("errors");
    console.log(errors);

    res.json({ errors, created: false });
  }
};

const userLogin = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email });
    console.log("-----------------3----------------------");

    if (!user) {
      console.log("-----------------3----------------------");

      throw new Error("Email not in use");

    }

    if (user) {
      console.log("-----------------4----------------------");

      const validpassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validpassword) {
        console.log("-----------------5----------------------");

        throw new Error("wrong pasword");
      }

      if (validpassword) {
        console.log("-----------------6----------------------");

        const token = createToken(user._id);
        res.cookie("jwt", token, {
          withCredentials: true,
          httpOnly: false,
          maxAge: maxAge * 10000,
        });

        res.status(200).json(user);
      }
    }
  } catch (err) {
    console.log("-----------------7----------------------");

    const errors = handleErr(err);

    res.json({ errors, created: false });
  }
};


const AdminLogin=(req,res)=>{

console.log("adminlogin");
  try {
    console.log("________________1--------------------------");
    const Adminemail=process.env.AdminEmail
    const Adminpassword=process.env.AdminPassword
  
    const { email,password } = req.body
    console.log(email+password);
  
    if(Adminemail!=email){
      console.log("________________2--------------------------");
      throw new Error("Email not in use");
    }else if(Adminpassword!=password){
      console.log("________________2--------------------------");
      throw new Error("wrong pasword");
    }else{
      console.log("________________3--------------------------");
      const token = createAdminToken(process.env.AdminId);
      res.cookie("adminjwt",token,{
       withCredentials:true,
       httpOnly:false,
       maxAge:maxAge*1000
      })
      console.log("________________4--------------------------");
      res.json({status:true})
      
    }
  }
  catch (err){
    console.log("________________5--------------------------");
    const errors = handleErr(err);

    res.json({ errors, created: false });
  }

 



}

const Otplogin=async(req,res)=>{
console.log(req.params.mobile);

const user=await UserModel.findOne({mobile:req.params.mobile})

if(!user){

  res.json({user:false})
}
else{

  res.json({user:user})
}
}


const otpVerify=async(req,res)=>{

  const user=await UserModel.findOne({mobile:req.params.mobile})

if(!user){

  res.json({user:false})
}
else{

  const token = createToken(user._id);
  res.cookie("jwt", token, {
    withCredentials: true,
    httpOnly: false,
    maxAge: maxAge * 10000,
  });

  res.json({user:user})
}

}

module.exports = {
  userSignUP,
  userLogin,
  AdminLogin,
  Otplogin,
  otpVerify
};
