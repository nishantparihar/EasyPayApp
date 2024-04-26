

export function InputBox({value, placeholder, name}){

        return <div className="px-4">
                <h1 className="font-semibold text-2sm pt-2">{value}</h1>
                <input type="text" name={name} placeholder={placeholder} className="w-full border-2 py-1.5  rounded-md pl-2"/>
        </div>

}