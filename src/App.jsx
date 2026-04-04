import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Specialties from "./components/Specialties"
import JoinAsDoctor from "./components/JoinAsDoctor"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import DoctorRegister from "./pages/DoctorRegister"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
const path=window.location.pathname
export default function App(){
if(path==="/doctor-register")return <DoctorRegister/>
if(path==="/login")return <Login/>
if(path==="/signup")return <Signup/>
return(<><Navbar/><main><Hero/><Stats/><Features/><HowItWorks/><Specialties/><JoinAsDoctor/><CTA/></main><Footer/></>) 
}