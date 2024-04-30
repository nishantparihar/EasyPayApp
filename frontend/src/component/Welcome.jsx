import { Heading } from "./Heading"
import {SubHeading} from "./SubHeading"
import { useLocation, useNavigate } from "react-router-dom"
import Arrow from "../assets/arrow.svg?react"



export function Welcome(){

    const navigate = useNavigate();

    return <div className="bg-[#C1A7FE] h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        
        <Heading label={<div>Welcome to <span className="text-[#002970]">Easy</span><span className="text-[#00BAF2]">Pay</span> </div>} />

        <div className="text-[#5F7187]">
        <SubHeading content={"Easy Money Transfer"} />
        </div>

        <button onClick={()=>{navigate("/signup", {})}}className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 mt-6 w-full bg-[#5F16C5] hover:bg-green-500 text-white">
            <div className="flex justify-center items-center relative">
                New Users 
                <div className="absolute left-60" >
                  <Arrow />
                </div>
            </div>
        </button>
        <button onClick={()=>{navigate("/signin", {})}}className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 mt-6 mb-10 w-full bg-[#5F16C5] hover:bg-green-500 text-white">
            <div className="flex justify-center items-center relative">
                Existing Users 
                <div className="absolute left-60" >
                  <Arrow />
                </div>
            </div>
        </button>
        

      </div>
    </div>
  </div>
}