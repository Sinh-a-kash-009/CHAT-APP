import {useQuery } from "@tanstack/react-query";
import {fetch_friends} from "../redux/axios";
import useAuthUser  from '../hooks/useAuthUser'
import { Link } from "react-router";
function Val(){ 

 const { isLoading, authUser } = useAuthUser();
     if(isLoading){
        <div> loading..</div>
     }
    const {data:friends_data=[],isloading:friends_loading}=useQuery({
        queryKey:['friends'],
        queryFn:()=>fetch_friends(authUser._id),

     })
     console.log('friends_data in sidebarval',friends_data);
return<><ul className="nav nav-pills mb-auto" style={{ overflowY: "auto", display: "block", gap: "20px" }}>
  {friends_data.map((friend) => (
    <li className="nav-item d-flex align-items-center mb-2" key={friend._id}>
      <Link to={`/group/${friend._id}`} className="nav-link text-white d-flex align-items-center">
        <img 
          src={friend.profilePicture} 
          alt={friend.username} 
          className="rounded-circle me-2" 
          width="32" 
          height="32" 
        />
        <span>{friend.username}</span>
      </Link>
    </li>
  ))}
</ul>
<hr />
</>}
export default Val;