import{useState}from 'react'
import s from './Hero.module.css'
const SLOTS=['9:00 AM','10:30 AM','1:00 PM','3:30 PM','5:00 PM']
export default function Hero(){
const[active,setActive]=useState(0)
return(<section className={s.section}><div className={s.inner}><div className={s.content}><div className={s.badge}><span className={s.dot}/>Trusted telemedicine platform</div><h1>Healthcare from the <em>comfort</em> of your home</h1><p>Connect with certified doctors online. Get consultations, prescriptions, and follow-ups anytime, from anywhere.</p><div className={s.btns}><a href="#contact" className={s.btnP}>Book a consultation</a><a href="#specialties" className={s.btnO}>Meet our doctors</a></div></div><div className={s.card}><div className={s.drow}><div className={s.avatar}>DR</div><div><p className={s.dname}>Dr. Amara Osei</p><span className={s.dspec}>General Practitioner</span></div><span className={s.online}>Online</span></div><p className={s.slbl}>Available slots Today</p><div className={s.slots}>{SLOTS.map((sl,i)=><button key={sl} className={`${s.slot} ${i===active?s.act:''}`} onClick={()=>setActive(i)}>{sl}</button>)}</div><button className={s.confirm}>Confirm appointment</button></div></div></section>)
}
