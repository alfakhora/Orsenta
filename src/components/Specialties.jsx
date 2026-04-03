import s from './Specialties.module.css'
const L=['General Practice','Cardiology','Dermatology','Mental Health','Pediatrics','Gynecology','Neurology','Orthopedics','Endocrinology','Nutrition','Oncology','Ophthalmology']
export default function Specialties(){return(<section id="specialties" className={s.s}><div className={s.i}><span className={s.l}>Specialties</span><h2>Doctors across <em>every field</em></h2><p className={s.sub}>From general practice to specialised care.</p><div className={s.tags}>{L.map(l=><span key={l} className={s.tag}>{l}</span>)}</div></div></section>)}
