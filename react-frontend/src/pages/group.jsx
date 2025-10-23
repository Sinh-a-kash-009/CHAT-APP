import {GooeyNav2} from "../components/gooenav";
import { items1 } from "../redux/store";
import Sidebar from "../components/group-sidebar";
import { LogOut } from 'lucide-react';
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { logout_func } from "../redux/axios";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../redux/store";
import ThemeSelector from "../components/themeselector";
import Chatbox from "../components/chat";
function GROUP() {
    const {theme} = useThemeStore();
    const navigate=useNavigate();
    console.log("items2",items1)

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
            colors={[1, 2, 3, 1, 2, 3, 1, 4]} />
        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <ThemeSelector />
            <LogOut size={32} strokeWidth={1.25} className="logout" style={{color: 'var(--primary-color)'}} onClick={()=>logout_task()} />
        </div>
    </div>
    <div style={{height:"calc(100vh - 60px)", overflow:'hidden', display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <Sidebar />
        <div style={{backgroundColor:'var(--bg-color)', width:"95.5vw", height:"90.8vh", borderRadius:"15px", border: '1px solid var(--primary-color)'}}>
            <Chatbox />
        </div>
    </div>
 </div>
</>
}
export default GROUP;