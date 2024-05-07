const { hashPassword, comparePassword } = require('../helper/auth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

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
        const user = await User.create({ name, email, role, password: hashedPassword });

        return res.json({success:true,user});

    }
    catch (error) {
        res.json({ error: "some error are there " })
    }

}
const loginUser = async (req, res) => {


    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "user not found"
            })
        }

        const matched = await comparePassword(password, user.password);


        if (matched) {
            //jwt........
            jwt.sign({ email: user.email, name: user.name, id: user._id, role: user.role }, process.env.JWT_SECRET, {}, (error, token) => {
                if (error) throw error;
                res.cookie('token', token, {
                    expires: new Date(Date.now() + 2589200000),
                    httpOnly: true, 
                }).json(user);

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
            if (error) throw error
            res.json(user);
        })

    } else {
        res.json(null)
    }
}

const getUsers = async(req, res) =>{
    try{

        const users = await User.find();
        const usersData= [];
        users.map((user, ind)=>{

            let obj = {
                id : user._id,
                name: user.name,
                role:user.role,
                email:user.email
            }
            usersData.push(obj);

        }) 

        res.json(usersData);

    }catch(error){
        res.json({
            error:'user not found'
        })
    }
}

const removeUser = async(req, res) =>
{
    try{

        const {id} = req.params;
    
        const dUser = await User.deleteOne({_id :id});
        res.json(dUser);
        
    }catch(erro)
    {
        res.json({
            error:"User are not deleted",
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({
            message: 'Logout successful',
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
module.exports = { registerUser, loginUser, getProfile, getUsers, removeUser, logoutUser };

