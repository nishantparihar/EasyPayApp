import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { Signin } from "./component/Signin";
import { Signup } from "./component/Signup";
import { Dashboard } from "./component/Dashboard";
import { SendMoney } from "./component/SendMoney";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/" element={<Signup />} />
                <Route path="/dashboard" element={ <Dashboard />} />
                <Route path="/send" element={ <SendMoney />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
