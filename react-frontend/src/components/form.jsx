import { useNavigate } from "react-router-dom";
import { verifylogin ,signup} from "../redux/apistore";
import { MessageCircleHeart } from "lucide-react";
import { useMutation,useQueryClient } from '@tanstack/react-query';
import {sendData,logindata} from "../redux/axios";
import { useState } from "react";   

function LoginForm() {
    const queryClient = useQueryClient();
    function handlesubmit(e){
          e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        const formdata={
            email:email,
            password:password
        }
        console.log("formdata of login",formdata)
        mutate(formdata);
    };
    const {mutate}=useMutation({
        mutationFn:logindata,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['authUser']})
        }
    })
    return <><form onSubmit={(e)=>handlesubmit(e)}>
        <div className="mb-3 hh">
            <span> <MessageCircleHeart strokeWidth={0.75} />
             STUDY-SYNC</span>
             <hr/>
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email" />
        </div>
        <div className="mb-3 hh">
            <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password...</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
    </form></>
}
function SignupForm() {
    const queryClient = useQueryClient();
    function handlesubmit(e){
          e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const formdata={
                username:username,
                email:email,
                password:password,
        };
        console.log("printing data",formdata);
        mutate(formdata);
    }

    const {mutate}=useMutation({
        mutationFn:sendData,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] })
    })

    
    return <><form onSubmit={(e)=>handlesubmit(e)}>
        <div className="mb-3 hh">
            <span> <MessageCircleHeart strokeWidth={0.75} />
            STUDY-SYNC
            </span>
            <hr/>
            <label htmlFor="exampleInputUsername" className="htmlForm-label">Username</label>
            <input type="text" name="username" className="form-control" id="exampleInputUsername" placeholder="Enter your username" />
        </div>
        <div className="mb-3 hh">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email" />
        </div>
        <div className="mb-3 hh">
            <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password...</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        <p style={{textAlign:'center'}}>already have an account go for log-in</p>
    </form></>
}
export { LoginForm, SignupForm };