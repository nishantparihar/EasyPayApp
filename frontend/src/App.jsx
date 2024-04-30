import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { Signin } from "./component/Signin";
import { Signup } from "./component/Signup";
import { Dashboard } from "./component/Dashboard";
import { SendMoney } from "./component/SendMoney";
import { UpdateProfile } from "./component/UpdatePriofile";
import { Welcome } from "./component/Welcome";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/updateProfile" element={<UpdateProfile />} />
                <Route path="/dashboard" element={ <Dashboard />} />
                <Route path="/send" element={ <SendMoney />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
