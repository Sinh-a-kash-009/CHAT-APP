import {GooeyNav2} from "../components/gooenav";
import ThemeSelector from "../components/themeselector";
import TrackerComponents from "../components/trackercomponents";
import GradientText from "../components/study-sync-title";
import {SpotlightCard3} from "../components/spotlightcard";
import { AiFillDelete } from "react-icons/ai";
import { items1,deleteTracker,addTracker } from "../redux/store";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deletetodo, todoitem_fetch } from "../redux/apistore";
import { LogOut } from 'lucide-react';
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { logout_func } from "../redux/axios";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../redux/store";

function TRACKER() {
    const {theme} = useThemeStore();
    console.log('item3',items1)
    const tracker= useSelector((state) => state.tracker);
    console.log("this is my tracker",tracker.trackerItems);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    /** */
    const deletetask=useCallback(async(task,deadline)=>{
        try{
            console.log(`${task} clicked`);
            const response=await deletetodo(task,deadline);
            console.log("response",response);
            console.log("task deleted");
            // Fetch updated list from backend
            const todoitem = await todoitem_fetch();
            console.log("data in todo item", todoitem);
            
            if (todoitem && Array.isArray(todoitem)) {
              // Clear existing items first to prevent duplicates
              dispatch(deleteTracker());
              
              // Add new items
              todoitem.forEach((item) => {
                dispatch(addTracker({ task: item.task, date: item.date }));
              });
            }
        }catch(error){
            console.log(error);
        }
    },[]);

   function logout_task(){
        mutate();
    }
    const queryClient = useQueryClient();
     const {mutate}=useMutation({
        mutationFn:logout_func,
        onSuccess:()=>{alert("logged out successfully");queryClient.invalidateQueries({queryKey:['authUser']});
    },
     })

    return <>
      <div data-theme={theme} style={{ 
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--bg-color)',
          color: 'var(--text-color)'
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center", padding: '10px 20px'}}> 
            <GooeyNav2
                items={items1}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}/>
            <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                <ThemeSelector />
                <LogOut size={32} strokeWidth={1.25} className="logout" style={{color: 'var(--primary-color)'}} onClick={()=>logout_task()} />
            </div>
        </div>
        <div style={{height:"calc(100vh - 60px)", overflow:'auto', padding: '0 20px'}}>
           <div style={{marginTop:'32px'}}> 
              <GradientText><h1 style={{color: 'var(--primary-color)'}}>TRACK STUDY GOALS AND TASK</h1></GradientText>
           </div>
           <div style={{marginTop:'40px'}}> 
              <GradientText><h3 style={{color: 'var(--secondary-color)'}}>ENTER ITEM AND DEADLINE</h3></GradientText>
           </div>
            <TrackerComponents />
            <div style={{marginTop:'40px', marginBottom: '40px'}}>
            {tracker.trackerItems.length >0 ? (
                <SpotlightCard3 className="custom-spotlight-card" spotlightColor="rgba(202, 11, 30, 0.2)">
                {tracker.trackerItems.map((item,index)=>(
                    <div key={index} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',padding:'6px'}}> 
                         <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                         <p style={{color: 'var(--text-color)'}}>{`${item.task}---->`}</p>
                         <p style={{color: 'var(--primary-color)'}}>{`${item.deadline.slice(0, 10)}`}</p>
                         </div>
                    <div key={`btn-${index}`} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <button className="btn btn-danger" style={{padding: '4px 8px', fontSize: '12px'}}
                        onClick={()=>{
                           console.log(`${item.task} clicked`);
                           deletetask(item.task,item.deadline.slice(0, 10));
                        }}
                        ><AiFillDelete /></button>
                    </div>
                    </div>
                ))}
            </SpotlightCard3>
            ) : (
                <SpotlightCard3 className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <p style={{textAlign:'center',fontSize:'20px',fontWeight:'bold',color:'white'}}>No tasks added yet</p>
                </SpotlightCard3>
            )}
            </div>  
        </div>
      </div>
    </>
};

export default TRACKER;