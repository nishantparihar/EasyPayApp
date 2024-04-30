import { useLocation } from "react-router-dom";
import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { Users } from "./Users";
import { userBalance, userInfo } from "../state/atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";



export function Dashboard(){

    const [balance, setBalance] = useRecoilState(userBalance);
    const [userInformation, setUserInformation] = useRecoilState(userInfo);
    const { state } = useLocation()
    

    if (state == null){
        return <div>Access Denied</div>
    }

    const {token} = state

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance", {
            
            headers:{
                "authorization": "Bearer " + token
            },
            
        })
        .then((response)=>{
            setBalance(response.data.balance.toFixed(2));
        })
    }, [])


    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/info", 
            {
                headers:{
                    "authorization": "Bearer " + token
                },
            }
        )
        .then((response)=>{
            
            setUserInformation(response.data);
        })
        .catch((e)=>{
            console.log(e);
        })
    }, [])
   
    return <div className="bg-[#f3d3a5] w-full h-screen">
            <div className="mx-20 px-20 bg-[#E0FFD7] h-full">
                <Appbar userInfo = {userInformation} token={token}></Appbar>
                <Balance value={balance}></Balance>
                <Users token = {token}></Users>
            </div>
    </div>
}