import{useState}from 'react'
import s from './Navbar.module.css'
export default function Navbar(){
const[open,setOpen]=useState(false)
return(<nav className={s.nav}><a href="#" className={s.logo}>ORSENTA<span>Your TeleDoctor</span></a><div className={`${s.links} ${open?s.open:''}`}><a href="#features" onClick={()=>setOpen(false)}>For Patients</a><a href="#how" onClick={()=>setOpen(false)}>How it works</a><a href="#join-doctors" onClick={()=>setOpen(false)}>For Doctors</a><a href="#specialties" onClick={()=>setOpen(false)}>Specialties</a><a href="#contact" className={s.btn} onClick={()=>setOpen(false)}>Book a visit</a></div><button className={s.burger} onClick={()=>setOpen(!open)}><span/><span/><span/></button></nav>)
}
