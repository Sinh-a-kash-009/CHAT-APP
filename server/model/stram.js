const { StreamChat } = require('stream-chat');
require('dotenv').config();
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_VALUE;
if(!apiKey || !apiSecret) {
    console.log('STREAM_API_KEY and STREAM_API_VALUE are required');
}
const serverClient = StreamChat.getInstance(apiKey, apiSecret);
exports.upsertUser = async(userdata)=>{
    try {
        const user = await serverClient.upsertUsers([userdata]);
        return user;
    } catch (error) {
        console.error('Error connecting to Stream:', error);
        throw error;
    }
}
exports.generateStreamToken = async(userdata)=>{
try {
    console.log("in generate stream token")
    const userIdStr=userdata.toString();
    return serverClient.createToken(userIdStr);
} catch (error) {
    console.log("error generating Stream token",error);
}
}
