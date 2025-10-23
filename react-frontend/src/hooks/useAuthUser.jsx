import { useQuery } from "@tanstack/react-query"
import { getData } from "../redux/axios"
function useAuthUser(){
      const authData=useQuery({
    queryKey:['authUser'],
    queryFn:getData,
  });
  return {isLoading:authData.isLoading,authUser:authData.data};
}
export default useAuthUser;