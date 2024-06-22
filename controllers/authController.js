const { hashPassword, comparePassword } = require('../helper/auth');
// const verifyEmail = require('../helper/verifyEmail');
// const VerifyTamp = require('../utils/VerifyTemp')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const { default: verifyTemp } = require('../utils/verifyTemp');
const env = require('dotenv').config();
const mailer = require('../helper/mailer');
const { validationResult } = require('express-validator');
const randomstring = require('randomstring')
const PasswordReset = require('../models/passwordReset');
const { json } = require('body-parser');
// const emailVerify = async (req, res) => {
//     const { Id } = req.params;
//     const {id} = req.query;
//     if (Id == process.env.JWT_SECRET) {
//         await User.updateOne({_id:id},{$set:{isVerified:true}});
//     }
//     return res.json({message:'mail is verifird',success:true})
    
// }

const registerUser = async (req, res) => {

    const { name, email, password, role } = req.body;

    try {

        if (!name) {
            return res.json({ 
                error: "name is require"
            })
        }
        if (!email) {
            return res.json({
                error: "email is require"
            })
        }

        if (!password || password.length < 6) {
            return res.json({
                error: "password is require it whould be at least 6 characters"
            })
        }

        const exist = await User.findOne({ email });

        if (exist) {
            return res.json({
                error: "Email is already taken"
            })
        }
 

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ name, email, role, password: hashedPassword, isVerified:false });

        //mail send
        const msg = '<p>Hi '+name+', Please <a href="http://localhost:8000/mail-verification?id='+user._id+'">Verify</a> your mail.</p>'

        mailer.sendMail(email, 'Mail Verification', msg);

        // const token=await jwt.sign({ email,name, id: user._id, role,isVerified:false }, process.env.JWT_SECRET)
        // return res.cookie('token', token, {
        //     expires: new Date(Date.now() + 2589200000),
        //     httpOnly: true,
        // }).json({ success: true, user });
        return res.status(201).json({
            success:true
        })
    

    }
    catch (error) {
        res.json({ error: "some error are there " })
    }
}
const loginUser = async (req, res) => {
        

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.json({
                error: "user not found"
            })
        }

        if(user.isVerified == false){
            return res.json({
                error: "Mail is not verified"
            })
        }
        const matched = await comparePassword(password, user.password);

        if (matched) {
            //jwt........
            jwt.sign({ email: user.email, name: user.name, id: user._id, role: user.role, isVerified:user.isVerified }, process.env.JWT_SECRET, {}, (error, token) => {
                if (error) throw error;
                res.cookie('token', token, {
                    expires: new Date(Date.now() + 2589200000),
                    httpOnly: true,
                }).json({success:true,token:token});

            })
 
        } else {
            return res.json({
                error: "password is not matched"
            })
        }

    }
    catch (error) {
        throw error;
    }
}

const getProfile = async (req, res) => {
      
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
            if (error) return res.json({success :false })
            res.json({
            data:user,
            success:true,
        });
        })

    } else {
         return res.json({success :false })
    }    
}

const getUsers = async (req, res) => {
    try {

        const users = await User.find();
        const usersData = [];
        users.map((user, ind) => {

            let obj = {
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email
            }
            usersData.push(obj);

        })

        res.json(usersData);

    } catch (error) {
        res.json({
            error: 'user not found'
        })
    }
}

const removeUser = async (req, res) => {
    try {

        const { id } = req.params;

        const dUser = await User.deleteOne({ _id: id });
        res.json(dUser);

    } catch (error) {
        res.json({
            error: "User are not deleted",
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({
            seccess:true,
            message: 'Logout successful',
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const mailVerification = async(req,res) =>{

    try{
        if(req.query.id == undefined){
            return res.render('404')
        }
        const userData = await User.findOne({_id:req.query.id});
        if(userData){ 
            if(userData.isVerified == true){
                return res.render('mail-verification',{message:'Your mail already verified!'})
            }
           await User.findByIdAndUpdate({_id:req.query.id},{
            $set:{
                isVerified:true
            }
           })
           return res.render('mail-verification',{message:'Mail has been verified Successfully'})
            
           
        }else{
            return res.render('mail-verification',{message:"user not found"})
        }

    }catch(error){
        // console.log(error);
        return res.render('404')
    }
}

const forgotPassword = async(req,res) =>{
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:"Error",
                error:errors.array()
            });
        }

        const {email} = req.body;

        const userData = await User.findOne({email});

        if(!userData){
            return res.status(400).json({
                success:false,
                msg:"Email doesn't exists!"
            })
        }

        const randomString = randomstring.generate();
        const msg = '<p>Hii '+userData.name+', Please click <a href="http://localhost:8000/reset-password?token='+randomString+'">Here</a> to Reset your Password</p>'
        await PasswordReset.deleteMany({user_id: userData._id});
        const passwordReset = PasswordReset({
            user_id:userData._id,
            token:randomString
        })
        await passwordReset.save();
        mailer.sendMail(userData.email, 'Reset password', msg);
        return res.status(201).json({
            success:true,
            msg:'Reset Password Link send to your mail, Please check!'
        })


    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}

const resetPassword = async (req,res) =>{
    try{
        if(req.query.token == undefined){
            return res.render('404');
        }
        const resetData = await PasswordReset.findOne({token: req.query.token});
        
        if(!resetData){
            
            return res.render('404');
        }
        console.log(resetData.token);
        return res.render('reset-password',{resetData});

    }catch(error){
        
        return res.render('404');
    }
}

const updatePassword = async(req,res) =>{
    try{
        const {user_id, password, c_password} = req.body;

        const resetData = await PasswordReset.findOne({user_id});

        if(password != c_password){
            return res.render('reset-password',{resetData, error:'Confirm Password not matching!'})
        }

        const hashedPassword = await hashPassword(c_password);
        await User.findByIdAndUpdate({_id:user_id},{
            $set:{
                password:hashedPassword
            }
        });

        PasswordReset.deleteMany({user_id});

        return res.redirect('/reset-success');

    }catch(error){
        
        return res.render('404');
    }
}


const resetSuccess = async (req,res) =>{
    try{
        return res.render('reset-success') 
    }catch(error){ 
        return res.render('404');
    }
}

module.exports = { registerUser, loginUser, getProfile, getUsers, removeUser, logoutUser,mailVerification,forgotPassword,resetPassword,updatePassword,resetSuccess };

