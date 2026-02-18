import User from '../models/User.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET ,{ expiresIn: "30d" });
}

// Route for user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //checking if user already exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesnot exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            //provide a token
            const token = createToken(user._id);
            res.json({ success: true, token });
        }
        else {
            res.json({success:false , message:"Invalid Credentials"});
        }

    } catch (error) {
        console.log(error.message);

        return res.json({ success: false, message: error.message });
    }



}

//Route for user register
export const registerUser = async (req, res) => {


    try {
        const { officailId, email, password } = req.body;

        //checking if the user already exists
        const exists = await User.findOne({ email });
        if (exists) {
           return res.json({ success: false, message: "User already exists ,Login" });

        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        // HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = User.create({
            officailId,
            email,
            password: hashedPassword
        });

        const token = createToken(newUser._id)
        res.json({ success: true,token });



    } catch (error) {
        console.log(error.message);

        res.json({ success: false, message: error.message });
    }

}


