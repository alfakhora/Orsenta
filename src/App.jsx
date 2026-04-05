import React from 'react'
import{BrowserRouter as Router,Routes,Route}from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Specialties from './components/Specialties'
import JoinAsDoctor from './components/JoinAsDoctor'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DoctorRegister from './pages/DoctorRegister'
import DoctorDashboard from './pages/DoctorDashboard'
const LandingPage=()=>(<div><Navbar/><main><Hero/><Stats/><Features/><HowItWorks/><Specialties/><JoinAsDoctor/><CTA/></main><Footer/></div>)
function App(){
return(
<Router>
<Routes>
<Route path="/" element={<LandingPage/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/register-doctor" element={<DoctorRegister/>}/>
<Route path="/dashboard" element={<DoctorDashboard/>}/>
</Routes>
</Router>
)
}
export default App
