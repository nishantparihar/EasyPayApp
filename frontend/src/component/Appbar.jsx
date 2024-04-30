import { useNavigate } from "react-router-dom"
import Moneysvg from "../assets/currency.svg?react"

export const Appbar = ({userInfo, token}) => {

    const navigate = useNavigate()

    return <div className="shadow h-14 flex justify-between bg-[#e6f9ee]">
        <div className="flex flex-col justify-center h-full ml-4 text-2xl font-bold">
            <div className="flex justify-center gap-2">
                <span className="text-[#002970]">Easy</span><span className="text-[#00BAF2] ml-[-6px]">Pay</span>
                <Moneysvg />
            </div>


        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 font-bold">
                {"Hi " + userInfo.firstName}  
            </div>
            <div className="avtar *:hover:visible relative">
                <div onClick={()=>{navigate("/updateProfile", {state:{token}})}} className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer">
                    <div className="flex flex-col justify-center h-full text-xl relative">
                        {userInfo.firstName[0]}
                    </div>
                </div>
                <div className="invisible absolute top-14 bg-white px-2 py-1 shadow-md text-center leading-4">Update Profile</div>
            </div>

            <div className="flex flex-col justify-center h-full mr-4 cursor-pointer text-red-700 underline font-semibold" onClick={()=>{navigate("/signin")}}>
                Sign Out
            </div>

        </div>
    </div>
}