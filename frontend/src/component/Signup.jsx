import { Heading } from "./Heading"
import {SubHeading} from "./SubHeading"
import {InputBox} from "./InputBox"
import { Button } from "./Button"
import { BottomWarning } from "./BottomWarning"
import { firstName, lastName, username, password } from "../state/atoms/atoms"
import axios from "axios";
import { useRecoilValue } from "recoil"
import { useNavigate } from "react-router-dom"
import {server} from "../assets/server"
import { useState } from "react"

export function Signup(){

    const [wrongPassword, setWrongPassword] = useState(null);
    const username1 = useRecoilValue(username);
    const firstName1 =  useRecoilValue(firstName);
    const lastName1 = useRecoilValue(lastName);
    const password1 =  useRecoilValue(password);
    const navigate = useNavigate();

    function onSignUpClick(){

        try{
           axios.post(`${server}user/signup`, {
                username: username1,
                firstName: firstName1,
                lastName: lastName1,
                password: password1
                }
            )
            .then((response)=>{
                if(response.status == 200){
                    setWrongPassword(null);
                    navigate("/dashboard" , { state: { token: response.data.token } })
                }

            })
            .catch((response)=>{
                try{
                    setWrongPassword(response.response.data.message);
                }
                catch(e){
                    setWrongPassword("Server Error");
                }
            })
 
        }
        catch(e){
            setWrongPassword("Server Error");
        }

    }


    return <div className="bg-[#C2A5FF] w-full h-screen flex items-center justify-center">

        <div className="bg-white w-[20rem]  rounded-lg">
            
            <Heading label={"Sign up"}></Heading>
            
            <div className="text-[#5F7187]">
            <SubHeading content={"Enter your information to create an account"}></SubHeading>
            </div>
          
            <InputBox value={"First Name"} placeholder={"John"} name={firstName} type={"text"}></InputBox>
            <InputBox value={"Last Name"} placeholder={"Doe"} name={lastName} type={"text"}></InputBox>
            <InputBox value={"Email"} placeholder={"example@gmail.com"} name={username} type={"email"}></InputBox>
            <InputBox value={"Password"} placeholder={"123456"} name={password} type={"password"}></InputBox>
            
            <div className="px-4 mt-6">
                <Button label={"Sign up"} onClick={onSignUpClick}></Button>
            </div>

            {wrongPassword && <div className="text-red-600 text-center">{wrongPassword}</div>}
            
            <div className="mb-4">
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} ></BottomWarning>
            </div>
        
        </div>

    </div>
}