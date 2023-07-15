import{ BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/home/Home";
import ContactUs from "./pages/contact/Contact"
import QrReader from "./pages/qrreader/Qr"
import Signup from "./pages/user/Signup"
import Login from "./pages/user/Login"
import DataContent from './pages/dynamic/DataContent'; // Update the import
import Admin from "./pages/admin/Admin"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/contactUs" element={<ContactUs/>}/>
        <Route path="/qrReader" element={<QrReader/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/DataContent/:title" element={<DataContent />} />
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
     
  );
}

export default App;