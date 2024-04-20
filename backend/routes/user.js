const express = require("express");

const zod = require("zod");
const router = express.Router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const { authMiddleware } = require("../middleware");


const signupValidation = zod.object({
    username: zod.string().email().min(3).max(30),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
    password: zod.string().min(6),
})



router.post("/signup", async (req, res)=>{
    const signupDetails = req.body;
    const parsedDeatials = signupValidation.safeParse(signupDetails);

    if(!parsedDeatials.success){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    else{
        const findResult = await userModel.find({'username' : parsedDeatials.data.username});
        if(findResult){
            res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            });
        }
        else{
            const createResult = await userModel.create({
                username: parsedDeatials.data.username,
                password: parsedDeatials.data.password,
                firstName: parsedDeatials.data.firstName,
                lastName: parsedDeatials.data.lastName
            })

            res.status(200).json({
                message: "User created successfully",
                token: jwt.sign({userId: createResult._id}, JWT_SECRET)
            })
        }
    }
    
})



const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})


router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await userModel.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})


const passwordValidation = zod.object({
	password: zod.string().min(6).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})


router.put("/", authMiddleware, async (req, res) => {
    const newInfo = req.body;
    const { success } = passwordValidation.safeParse(newInfo);
  
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })

        return;
    }
    else{
        await userModel.updateOne({_id: req.userId}, newInfo);
        res.status(200).json({
            message: "Updated successfully"
        })
    }

})



router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
                {
                   firstName: { "$regex": filter }
                },
                {
                   lastName: { "$regex": filter }
                }
             ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;