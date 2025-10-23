import axios from "axios";
const axiosInstance=axios.create({
    baseURL:'http://localhost:3001/',

    withCredentials: true, // send cookies with req
});
const sendData=async(formdata)=>{
            const response=await axiosInstance.post('loginorsignup/signup',formdata);
            return response.data;
        }
const getData= async()=>{
    try {
        const response=await axiosInstance.get('loginorsignup/me');
      console.log("recieved auth data",response.data);
       return response.data;
    } catch (error) {
        console.log("logged out error axios");
        return null;
    }
}
const completeOnboarding=async(formdata)=>{
    const response=await axiosInstance.post('loginorsignup/onboard',formdata);
    return response.data;
}
const logindata=async(formdata)=>{
    console.log('login axios')
    const response =await axiosInstance.post('loginorsignup/login',formdata);
    console.log(response.data ,"login axios");
    return response.data;
}
const logout_func= async()=>{const response=await axiosInstance.get('loginorsignup/logout');
      console.log("recieved logout data in axios",response.data);
       return response.data;}

const fetch_friends= async(id)=>{const response=await axiosInstance.get(`member/friends/${id}`);
      console.log("recieved fetch_friends data in axios",response.data);
       return response.data;}

       const fetch_recc_friends= async(authUser)=>{
        console.log("authUser in axios checking for recommended",authUser);
        const response=await axiosInstance.get(`http://localhost:3001/member/recc/`,{params:authUser});
      console.log("recieved recc friends data in axios",response.data);
       return response.data;}

        const outgoing_friends_req= async(id)=>{
            console.log("id of the authenticated user in axios ",id);
            const response=await axiosInstance.get(`member/outgoing/${id}`);
      console.log("recieved outgoing data in axios",response.data.outgoingrequest);
       return response.data.outgoingrequest;}

       const send_req=async(userId)=>{
        console.log("friend req sent to this id",userId);
        const response=await axiosInstance.post('member/friend-req/',userId);
        console.log("the data from send_req axios ",response.data)
        return response.data;
       }
       const getfriendreq=async(id)=>{
        console.log("id in axios get friend req",id);
        const response=await axiosInstance.get(`member/friend-request/${id}`);
        console.log("the data from get_req axios ",response.data)
        const {incomingreq,acceptreq}=response.data;
        console.log("incoming req",incomingreq);
        console.log("accept req",acceptreq);
        return response.data;
       }
       const acceptreq=async(id)=>{
        console.log("id in axios accept req",id);
        const response=await axiosInstance.put(`member/friend-req/${id}`);
        console.log("the data from accept_req axios ",response.data)
        return response.data;
       }
       const getStreamToken=async(id)=>{
        const response=await axiosInstance.get(`chat/token/${id}`);
        console.log("the data from getStreamToken axios ",response.data)
        return response.data;
       }

export  {axiosInstance,sendData,getData,completeOnboarding,logindata,logout_func,fetch_friends,fetch_recc_friends,outgoing_friends_req,send_req,getfriendreq,acceptreq,getStreamToken};