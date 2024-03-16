import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//get all users
export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find()
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc
            return otherDetails
        })
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json(error)
    }
}


//get a user
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id)
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails)
        }
        else {
            res.status(404).json("No such user exists")
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
};

//update a User
export const updateUser = async (req, res) => {
    const id = req.params.id
    const { _id, currentUserAdmin, password } = req.body
    
    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            console.log({user, token})
            res.status(200).json({user,token})
        }
        catch (error) {
            console.log("Error")
            res.status(500).json(error)
        }
    }
        else {
        res.status(403).json("Access Denied! You can only Update your own Account.")
        }   
};

//Delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, currentUserAdmin } = req.body
    if (currentUserId == id || currentUserAdmin) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User Deleted Successfully")
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json("Access Denied! You can only Delete your own Account")
    }
}

//Follow a User
export const followUser = async (req, res) => {
    const id = req.params.id
    const { _id } = req.body
    if (_id === id)
    {
        res.status(403).json("Action Forbidden")
    }
    else {
        try {
            const followUser = await UserModel.findById(id); 
            const followingUser = await UserModel.findById(_id);
            
            if(!followUser.followers.includes(_id))
            {
                await followUser.updateOne({ $push: { followers: _id } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json("User Followed!");
            }
            else {
                res.status(403).json("User is Already followed by you");
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}





//UnFollow a User
export const UnFollowUser = async (req, res) => {
    const id = req.params.id
    const { _id } = req.body
    if (_id === id)
    {
        res.status(403).json("Action Forbidden")
    }
    else {
        try {
            const followUser = await UserModel.findById(id); 
            const followingUser = await UserModel.findById(_id);
            
            if(followUser.followers.includes(_id))
            {
                await followUser.updateOne({ $pull: { followers: _id } });
                await followingUser.updateOne({ $pull: { following: id } });
                res.status(200).json("User UnFollowed!");
            }
            else {
                res.status(403).json("User is not followed by you");
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}


export const getUserCount = async (req, res) => {
    try {
        const usercount = await UserModel.countDocuments({ isAdmin: false });
        res.status(200).json({ usercount });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAdminCount = async (req, res) => {
    try {
        const admincount = await UserModel.countDocuments({ isAdmin: true });
        res.status(200).json({ admincount });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserRegistrationStats = async (req, res) => {
    try {
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);

        const registrationsLastMonth = await UserModel.countDocuments({
            createdAt: { $gte: oneMonthAgo, $lt: currentDate }
        });
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(currentDate.getDate() - 7);
        const registrationsLastWeek = await UserModel.countDocuments({
            createdAt: { $gte: oneWeekAgo, $lt: currentDate }
        });
        const oneDayAgo = new Date();
        oneDayAgo.setDate(currentDate.getDate() - 1);
        const registrationsLastDay = await UserModel.countDocuments({
            createdAt: { $gte: oneDayAgo, $lt: currentDate }
        });

        res.status(200).json({
            registrationsLastMonth,
            registrationsLastWeek,
            registrationsLastDay
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserList = async (req, res) => {
    try {
        const users = await UserModel.find({ isAdmin: false }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAdminList = async (req, res) => {
    try {
        const users = await UserModel.find({ isAdmin: true }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

