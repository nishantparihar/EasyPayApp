import { useLocation } from "react-router-dom";
import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { Users } from "./Users";
import { userBalance } from "../state/atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";



export function Dashboard(){

    const [balance, setBalance] = useRecoilState(userBalance);
    const { state } = useLocation()
    const {token} = state

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance", {
            
            headers:{
                "authorization": "Bearer " + token.token
            },
            
        })
        .then((response)=>{
            setBalance(response.data.balance.toFixed(2));
        })
    }, [])

    return <div>
            <div className="mx-40">
                <Appbar></Appbar>
                <Balance value={balance}></Balance>
                <Users></Users>
            </div>
    </div>
}