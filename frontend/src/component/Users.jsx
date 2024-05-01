import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usersAtom } from "../state/atoms/atoms";
import axios from "axios";
import {server} from "../assets/server"

export const Users = ({token}) => {
    // Replace with backend call
    const [users, setUsers] = useRecoilState(usersAtom);
    const [filter, setFilter] = useState("")

    useEffect(()=>{
        axios.get(`${server}user/bulk?filter=${filter}`,
            {
                headers:{
                    "authorization": "Bearer " + token,
                },
            }
        )
        .then((response)=>{
            setUsers(response.data.users);
        })
    }, [])


    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange={(e)=>{setFilter(e.target.value)}} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} key={user._id} sendTo = {user._id} token = {token} />)}
        </div>
    </>
}



function User({user, sendTo, token}) {

    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button 
            label={"Send Money"} 
            onClick={()=>{navigate("/send", {state:{sendTo, name: user.firstName + " " + user.lastName, token}})}}/>
        </div>
    </div>
}