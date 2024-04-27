import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { Users } from "./Users";



export function Dashboard(){
    
    return <div>
            <div className="mx-40">
                <Appbar></Appbar>
                <Balance value={5000}></Balance>
                <Users></Users>
            </div>
    </div>
}