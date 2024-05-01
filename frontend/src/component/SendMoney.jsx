import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import {server} from "../assets/server"

export const SendMoney = () => {

    // const [errorMsg, setErrorMsg] = useState("");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    

    const {state} = useLocation()

    if (state == null){
        return <div>Access Denied</div>
    }

    const {sendTo, name, token} = state;
    
    
    async function makeTransaction(){

        try{
            const response = await axios.post(`${server}account/transfer`, {
                amount,
                to: sendTo
                },
                {
                    headers:{
                        authorization: "Bearer " + token,
                    }
                }
            )

            document.getElementById("amount").value = "";
            alert("Transaction Successfull")
            navigate("/dashboard", { state: { token: token } })
            
        }
        catch(e){
            document.getElementById("amount").value = "";
            alert("Transaction Denied")
        }

    }

    return <div className="flex justify-center h-screen bg-[#C2A5FF]">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md px-4 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 px-6 pt-8 pb-2">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="px-6 pt-4 pb-10">
                <div className="flex items-center space-x-4 pb-3">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0]}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        onKeyDown={(event) => {
                            if (event.key !== 'Backspace' && !/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }

                          }}
                        onChange={(e) => {setAmount(e.target.value)}}
                        className= " flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                        required
                    />
                    </div>
                    <button onClick={makeTransaction} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                    <button onClick={()=>{navigate("/dashboard", { state: { token: token } })}} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-red-500 text-white">
                        Cancel
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}