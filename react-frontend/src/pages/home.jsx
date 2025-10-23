import {GooeyNav2} from "../components/gooenav";
import { useEffect, useState,useRef } from "react";

import { items1} from "../redux/store";
import { LogOut } from 'lucide-react';
import { useMutation,useQueryClient,useQuery } from "@tanstack/react-query";
import { logout_func,fetch_friends,fetch_recc_friends,outgoing_friends_req ,send_req} from "../redux/axios";
import useAuthUser  from '../hooks/useAuthUser'
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../redux/store";
import LearnerRecommendations from "../components/recc-user";
import Notification from "../components/notification";
import FriendCard from "../components/FriendCard";




function Home() {
      const { isLoading, authUser } = useAuthUser();
       const buttonchanger= useRef(new Set());
    
    if (isLoading) {
        return <div>Loading...</div>;
      }
    if (authUser) {
      console.log("auth user in homepage ",authUser);

      }
    const {theme}=useThemeStore()
    console.log(items1);
    function logout_task(){
        mutate();
    }
    const queryClient = useQueryClient();
     const {mutate}=useMutation({
        mutationFn:logout_func,
        onSuccess:()=>{alert("logged out successfully");queryClient.invalidateQueries({queryKey:['authUser']});
    },
     })

     
     const {data:friends_data=[],isloading:friends_loading}=useQuery({
        queryKey:['friends'],
        queryFn:()=>fetch_friends(authUser._id),

     })

      const {data:recc_friends_data=[],isloading:recc_friends_loading}=useQuery({
        queryKey:['recc_friends'],
        queryFn:()=>fetch_recc_friends(authUser),

     })

       const {data:outgoingreq_friendreq,isloading:outgoing}=useQuery({
        queryKey:['outgoing_friends_req'],
         queryFn: () => outgoing_friends_req(authUser._id),
     })

     const {mutate:sendfreq={},isPending}=useMutation({
        mutationFn:send_req,
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:['outgoing_friends_req']})}
     })

    //  useEffect(()=>{
    //     const outgoingids=new Set();
    //     if(outgoingreq_friendreq &&outgoingreq_friendreq.length>0){
    //         outgoingreq_friendreq.forEach((item)=>{
    //             outgoingids.add(item.data);
    //             console.log("outgoing in homejsx",item.data);
    //         })
    //     }
    //  },[outgoingreq_friendreq])

 if(recc_friends_data.length===0){
    console.log("recc friends data",recc_friends_data);
 }

 if(outgoingreq_friendreq){
const sentdata=outgoingreq_friendreq;
console.log("send data in home page",sentdata)
const recipientIdSet = new Set(
  outgoingreq_friendreq.map((request) => request.recipient._id)
);
console.log("recipientIdSet",recipientIdSet);
recipientIdSet.forEach((id) => {
  buttonchanger.current.add(id);
});
console.log('buttonchanger valuervsb', buttonchanger.current)
console.log("fetch friends data in hopme page",friends_data)

}



    return <>
        <div data-theme={theme} style={{ 
            width: '100vw',
            height: '100vh',
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-color)'
            ,overflowY:'auto',overflowX:'hidden'
        }}> 
            <div style={{ display:"flex",justifyContent:"center",alignItems:"center"}}>
                <GooeyNav2
                    items={items1}
                    particleCount={15}
                    particleDistances={[90, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
                <LogOut size={32} strokeWidth={1.25} className='logout' onClick={()=>logout_task()} style={{ color: 'var(--primary-color)' }}/>
            </div>
           <div style={{boxSizing:'border-box', padding: '12px 12px' ,margin:'auto'}}>


             <div style={{backgroundColor: 'var(--bg-color)', border:'1px solid var(--primary-color)' ,width:'98.5vw',
            height:'500px',position:'relative',top:'20px',}}>
               <div me='friendREqshowing'>
                <Notification isloading={isLoading} current_user={authUser._id}></Notification>
               </div>
               <hr/>
               <div me="friend_list">
                { friends_data?.length>0 ? 
            <FriendCard/> : 
            <h1 style={{color:'var(--primary-color)',textAlign:'center'}}>No friends</h1>}
               </div>
            </div>

            <div style={{backgroundColor: 'var(--bg-color)', border:'1px solid var(--primary-color)' ,width:'98.5vw',
            height:'336px',position:'relative',top:'35px', borderRadius:'12px'}}>
             <LearnerRecommendations recommendedUsers={recc_friends_data} loadingUsers={recc_friends_loading} sendRequestMutation={sendfreq} isPending={isPending} sender={authUser._id} buttonchanger={buttonchanger.current}/>
            </div>

           </div>


      
                  {/* <div me="recc_friends">
                {recc_friends_loading ? "loading" : recc_friends_data.length>0 ? recc_friends_data.map((item)=>{
                 <FriendCard key={item._id} friends={item}/>
                }) : "no recc friends"}
               </div> */}



        </div>
    </>
}
export default Home;