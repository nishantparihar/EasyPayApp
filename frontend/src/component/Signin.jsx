import { Heading } from "./Heading"
import {SubHeading} from "./SubHeading"
import {InputBox} from "./InputBox"
import { Button } from "./Button"
import { BottomWarning } from "./BottomWarning"
import { username, password} from "../state/atoms/atoms"
import { useRecoilValue } from "recoil"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


export function Signin(){
  const username1 = useRecoilValue(username);
  const password1 = useRecoilValue(password);
  const navigate = useNavigate()
  const [wrongPassword, setWrongPassword] = useState(false);

  async function onSignInClick(){

    try{
      const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
          username: username1,
          password: password1
      })

      if(response.status == 200){
        setWrongPassword(false);
        navigate("/dashboard" , { state: { token: response.data } })
      }
    }      
    catch(e){
      setWrongPassword(true);
    }


  }


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        
        <Heading label={"Sign in"} />

        <div className="text-[#5F7187]">
        <SubHeading content={"Enter your credentials to access your account"} />
        </div>


        <InputBox value={"Email"} placeholder={"example@gmail.com"} name={username} type={"email"}></InputBox>
            
        <InputBox value={"Password"} placeholder={"123456"} name={password} type={"password"}></InputBox>

        
        <div className="pt-4">
          <Button label={"Sign in"}  onClick={onSignInClick}/>
        </div>
        {wrongPassword && <div className="text-red-600">Worng username or password</div>}
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}