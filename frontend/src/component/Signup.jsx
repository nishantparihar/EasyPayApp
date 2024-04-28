import { Heading } from "./Heading"
import {SubHeading} from "./SubHeading"
import {InputBox} from "./InputBox"
import { Button } from "./Button"
import { BottomWarning } from "./BottomWarning"
import { firstName, lastName, username, password } from "../state/atoms/atoms"
import axios from "axios";
import { useRecoilValue } from "recoil"
import { useNavigate } from "react-router-dom"


export function Signup(){

    const username1 = useRecoilValue(username);
    const firstName1 =  useRecoilValue(firstName);
    const lastName1 = useRecoilValue(lastName);
    const password1 =  useRecoilValue(password);
    const navigate = useNavigate();

    async function onSignUpClick(){

        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username: username1,
                firstName: firstName1,
                lastName: lastName1,
                password: password1
                }
            )
    
            if(response.status == 200){
               
                navigate("/dashboard" , { state: { token: response.data.token } })
            }
        }
        catch(e){
            console.log(e)
        }

    }

    return <div className="bg-main-bg w-full h-screen flex items-center justify-center">

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
            
            <div className="mb-4">
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} ></BottomWarning>
            </div>
        
        </div>

    </div>
}