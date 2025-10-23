const { default: FriendRequest } = require('../model/friend-req');
const User = require('../model/user');
exports.getrecommendedmembers = async (req, res) => {
    try {
        console.log('req.query',req.query);
        const {_id}=req.query;
        const currentMember=await User.findById(_id)
        console.log(currentMember);
        if(!currentMember){
            return res.status(404).json({message:"user not found"});
        }
        const recommendedMembers = await User.find({
            $and:[
                {_id:{$ne:currentMember._id}},
                {_id:{$nin:currentMember.friends}},
                {isOnboarded:true}
            ]            
        })
        console.log(recommendedMembers,"membercontroller");
        res.json(recommendedMembers);
    } catch (error) {
        console.error('Error getting recommended members:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getmyfriends=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id).select("friends")
        .populate("friends","username profilePicture nativelanguauge learninglanguage");
        res.status(200).json(user.friends);
    }
    catch(error){
        console.log("error in getMyfriends controller");
    }
}
exports.sendFriendreq=async(req,res)=>{
    try{
        console.log("the data recieved ",req.body)
        const {sentTo,sendBy}=req.body;
        // prevent sending req to myself
        console.log(sentTo,"   ",sendBy)
        if(sendBy===sentTo){
            return res.status(400).json({message:"you cant friend request to yourself"});
        }
        const recipient=await User.findById(sentTo);
        if(!recipient){
            return res.status(404).json({message:"recipient not found"});
        }
        //checks if user is already friends 
        if(recipient.friends.includes(sendBy)){
            return res.status(400).json({message:"you are already friends with user"});
        }
        //check if a req already exsists
        const existingRequest=await FriendRequest.findOne({
            $or:[
                {sender:sendBy,recipient:sentTo},
                {sender:sentTo,recipient:sendBy},
            ],
        });
        if(existingRequest){
            return res.status(400)
            .json({message:"a friend request already exist between you and the user"})
        }
        // create a friend req now
        const friendRequest=await FriendRequest.create({
            sender:sendBy,
            recipient:sentTo,
        });
        res.status(201).json(friendRequest);
    }
    catch(error){
        console.log("error in sending friendrequest ");
        res.status(500).json({message:"internal server error"});
    }
}
exports.acceptFriendreq=async(req,res)=>{
    try {
        const requestId=req.params.id; 
        const friendRequest=await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(404).json({message:"friend request not found"});
        }
        if(friendRequest.recipient.toString()!== req.params.id){
            return res.status(403).json({
                message:"you are not authorized to acept this request"
            });
        }

        friendRequest.status="accepted";
        await friendRequest.save();

        //add each other to there friend array list
        //$addtoset :adds elements to an array only if they do not already exists
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{friends:friendRequest.recipient},
        });
        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{
                friends:friendRequest.sender
            },
        });
        res.status(200).json({message:"Friends request accepted"});
    } catch (error) {
        console.log("error in accepted friend req controller");
        res.status(500).json({message:"internal server error"});
    }
}
exports.getfriendrequests=async(req,res)=>{
    try {
        const id=req.params.id;
       const incomingreq=await FriendRequest.find({
        recipient:id,
        status:"pending",

       }).populate("sender","username profilePicture nativeLanguage lrearningLanguage");
       const acceptedreq=await FriendRequest.find({
        sender:req.params.id,
        status:"accepted",
       }).populate("recipient","username profilePicture");
       res.status(200).json({incomingreq,acceptedreq});
    } catch (error) {
        console.log("error in get friend req controller");
        res.status(500).json({message:" internal server error"}); 
    }
}
exports.getoutgoingfriendreq=async(req,res)=>{
    try {
        if(req.params.id){
            console.log("the data recieved in outgoing friend req controller",req.params.id);
       
        }
         const id=req.params.id;

        const outgoingrequest=await FriendRequest.find({
            sender:id,
            status:"pending",

        }).populate("recipient","username profilePicture nativelanguage learningLanguage");
        res.status(200).json({outgoingrequest});
    } catch (error) {
        console.log("error in get outgoing friend req controller");
        res.status(500).json({message:" internal server error"}); 
    }
}