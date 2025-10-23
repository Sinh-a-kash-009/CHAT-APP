const { generateStreamToken } = require("../model/stram")

exports.getstreamtoken=async(req,res)=>{
    try {
        console.log("id recieved ",req.params.id);
        const token =await generateStreamToken(req.params.id);
        console.log("token generated ",token);
        res.status(200).json({token});
    } catch (error) {
        console.log("error in getstream token controller ",error);
        res.status(500).json({message:"internal server error"});
    }
}