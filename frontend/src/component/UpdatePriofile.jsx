import {SubHeading} from "./SubHeading"

import { firstName, lastName, username, password } from "../state/atoms/atoms"
import axios from "axios";
import { useRecoilState } from "recoil"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


export function UpdateProfile(){

    const [userInfo, setUserInfo] = useState({        
                username: "",
                firstName: "",
                lastName: "",
                _id: ""
            });

    const [wrongPassword, setWrongPassword] = useState(false);

    const [firstName1, setFirstname] =  useRecoilState(firstName);
    const [lastName1, setLastname] = useRecoilState(lastName);
    const [password1, setPassword] =  useRecoilState(password);
    const navigate = useNavigate();
    const { state } = useLocation();
    const {token} = state;


    if (state == null){
        return <div>Access Denied</div>
    }


    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/info", 
            {
                headers:{
                    "authorization": "Bearer " + token
                },
            }
        )
        .then((response)=>{
            
            setUserInfo(response.data);
        })
        .catch((e)=>{
            console.log(e);
        })
    }, [])


    async function onUpdateClick(){

        let updatedFirstName = firstName1;
        let updatedLastName = lastName1;
        let updatedPassword = password1;

        if (updatedFirstName.length === 0){
            updatedFirstName = userInfo.firstName;
        }
        if (updatedLastName.length === 0){
            updatedLastName = userInfo.lastName;
        }
        if (updatedPassword.length === 0){
            updatedPassword = userInfo.password;
        }

        try{
            const response = await axios.put("http://localhost:3000/api/v1/user/", {
                firstName: updatedFirstName,
                lastName: updatedLastName,
                password: updatedPassword
                },
                {
                    headers:{
                        "authorization": "Bearer " + token
                    },
                }
            )
    
            if(response.status == 200){
                setWrongPassword(false);
                alert("Updation Successfull")
                navigate("/dashboard" , { state: { token: token } })
            }
        }
        catch(e){
            setWrongPassword(true);
        }

    }

    return <div className="bg-[#C2A5FF] w-full h-screen flex items-center justify-center">

        <div className="bg-white w-[20rem]  rounded-lg">
            

            <h2 className="text-2xl font-bold text-center mt-6">Update Information</h2>
            
            
            <div className="text-[#5F7187] mt-1.5">
            <SubHeading content={"Enter your new information to update"}></SubHeading>
            </div>
          
            <div className="px-4">
                <h1 className="font-semibold text-2sm pt-2 read-only:">Username</h1>
                <input value={userInfo.username} className="w-full border-2 py-1.5  rounded-md pl-2" disabled/>
            </div>
            <div className="px-4">
                <h1 className="font-semibold text-2sm pt-2">Firstname</h1>
                <input defaultValue={userInfo.firstName} onChange={(e)=> setFirstname(e.target.value)} className="w-full border-2 py-1.5  rounded-md pl-2"/>
            </div>
            <div className="px-4">
                <h1 className="font-semibold text-2sm pt-2">Lastname</h1>
                <input defaultValue={userInfo.lastName} onChange={(e)=> setLastname(e.target.value)} className="w-full border-2 py-1.5  rounded-md pl-2"/>
            </div>
            <div className="px-4">
                <h1 className="font-semibold text-2sm pt-2">Password</h1>
                <input defaultValue={userInfo.password} onChange={(e)=> setPassword(e.target.value)} type="password" className="w-full border-2 py-1.5  rounded-md pl-2"/>
            </div>

            <div>
                {wrongPassword && <div className="text-red-600 px-8 mt-2 text-center">Password length should not be lesser than 6</div>}
            </div>

            <div className="px-4">
                <button onClick={onUpdateClick} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 w-full mt-4 bg-green-500 text-white">
                    Update
                </button>
            </div>
            

            <div className="px-4">
                <button onClick={()=>{navigate("/dashboard", { state: { token: token } })}} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10  w-full mt-2.5 mb-6 bg-red-500 text-white">
                    Cancel
                </button>
            </div>

        
        </div>

    </div>
}