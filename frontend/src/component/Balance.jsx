


export const Balance = ({ value }) => {
    return <div className="flex mt-2 items-center">
        <div className="font-bold text-lg">
            Your balance :
        </div>
        <div className="ml-4 text-2xl text-green-500 font-extrabold">
            Rs {value}
        </div>
    </div>
}