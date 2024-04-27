import { useSetRecoilState } from "recoil";


export function InputBox({value, placeholder, name, type}){
        const setField = useSetRecoilState(name);
        
        
        return <div className="px-4">
                <h1 className="font-semibold text-2sm pt-2">{value}</h1>
                <input type={type} name={name} placeholder={placeholder} onChange={(e)=>{setField(e.target.value)}} className="w-full border-2 py-1.5  rounded-md pl-2"/>
        </div>

}