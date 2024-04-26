import { Heading } from "./Heading"
import {SubHeading} from "./SubHeading"
import {InputBox} from "./InputBox"
import { Button } from "./Button"
import { BottomWarning } from "./BottomWarning"



export function Signup(){

    function onSignUpClick(){

    }

    return <div className="bg-main-bg w-full h-screen flex items-center justify-center">

        <div className="bg-white w-[20rem]  rounded-lg">
            
            <Heading label={"Sign up"}></Heading>
            
            <div className="text-[#5F7187]">
            <SubHeading content={"Enter your information to create an account"}></SubHeading>
            </div>
          
            <InputBox value={"First Name"} placeholder={"John"} name={"fname"}></InputBox>
            <InputBox value={"Last Name"} placeholder={"Doe"} name={"lname"}></InputBox>
            <InputBox value={"Email"} placeholder={"example@gmail.com"} name={"email"}></InputBox>
            <InputBox value={"Password"} placeholder={"123456"} name={"password"}></InputBox>
            
            <div className="px-4 mt-6">
                <Button label={"Sign up"} onClick={onSignUpClick}></Button>
            </div>
            
            <div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} ></BottomWarning>
            </div>
        
        </div>

    </div>
}