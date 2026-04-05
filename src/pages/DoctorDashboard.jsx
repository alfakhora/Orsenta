import{useState,useEffect}from 'react'
import{supabase}from '../lib/supabase'
import{useNavigate}from 'react-router-dom'
import s from './DoctorDashboard.module.css'
const TIER_COLORS={gp:'#1D9E75',registrar:'#1a5fa8',consultant:'#7C3AED'}
const STATUS_COLORS={pending:'#f59e0b',approved:'#10b981',rejected:'#ef4444'}
export default function DoctorDashboard(){
const[user,setUser]=useState(null)
const[app,setApp]=useState(null)
const[loading,setLoading]=useState(true)
const navigate=useNavigate()
useEffect(()=>{
const load=async()=>{
const{data:{user}}=await supabase.auth.getUser()
if(!user){navigate('/login');return}
setUser(user)
const{data}=await supabase.from('doctor_applications').select('*').eq('auth_user_id',user.id).single()
setApp(data)
setLoading(false)
}
load()
},[navigate])
const logout=async()=>{await supabase.auth.signOut();navigate('/')}
if(loading)return(<div className={s.loading}><div className={s.spinner}></div><p>Loading your dashboard...</p></div>)
const color=TIER_COLORS[app?.tier]||'#1a5fa8'
const statusColor=STATUS_COLORS[app?.status]||'#f59e0b'
return(
<div className={s.pg}>
<nav className={s.nav}>
<a href="/" className={s.logo}>ORSENTA<span>Your TeleDoctor</span></a>
<div className={s.navRight}>
<span className={s.navEmail}>{user?.email}</span>
<button className={s.logoutBtn} onClick={logout}>Logout</button>
</div>
</nav>
<div className={s.content}>
{!app?(<div className={s.noApp}><div className={s.noAppIcon}>?</div><h2>No application found</h2><p>You have not submitted a doctor application yet.</p><a href="/register-doctor" className={s.applyBtn}>Apply now</a></div>):(
<>
<div className={s.welcome}><h1>Welcome back, Dr. {app.first_name} {app.last_name}</h1><p>{app.specialty} - {app.tier_name||app.tier}</p></div>
<div className={s.statusBanner} style={{borderColor:statusColor,background:statusColor+'15'}}>
<div className={s.statusDot} style={{background:statusColor}}></div>
<div><strong style={{color:statusColor}}>Application {app.status==='pending'?'Under Review':app.status==='approved'?'Approved':'Rejected'}</strong><p>{app.status==='pending'?'Our team is reviewing your credentials. You will be notified within 3-5 business days.':app.status==='approved'?'Congratulations! Your application has been approved. You can now receive consultations.':'Your application was not approved. Please contact support for more information.'}</p></div>
</div>
<div className={s.cards}>
<div className={s.card}><span className={s.cardLabel}>Doctor Tier</span><div className={s.cardValue} style={{color}}>{app.tier_name||app.tier}</div></div>
<div className={s.card}><span className={s.cardLabel}>Per Consultation (you earn)</span><div className={s.cardValue} style={{color}}>${app.doctor_share}</div></div>
<div className={s.card}><span className={s.cardLabel}>Patient pays per meeting</span><div className={s.cardValue}>${app.meeting_fee}</div></div>
<div className={s.card}><span className={s.cardLabel}>Registration Fee</span><div className={s.cardValue} style={{color:app.tier==='gp'?'#1D9E75':'inherit'}}>{app.tier==='gp'?'FREE':'$'+(app.tier==='registrar'?'2':'5')}</div></div>
</div>
<div className={s.details}>
<div className={s.detailCard}><h3>Personal Information</h3><div className={s.detailGrid}><div className={s.detailItem}><span>Full Name</span><strong>Dr. {app.first_name} {app.last_name}</strong></div><div className={s.detailItem}><span>Email</span><strong>{app.email}</strong></div><div className={s.detailItem}><span>Phone</span><strong>{app.phone||'Not provided'}</strong></div><div className={s.detailItem}><span>Location</span><strong>{app.city?`${app.city}, `:''}{ app.country||'Not provided'}</strong></div></div></div>
<div className={s.detailCard}><h3>Medical Qualifications</h3><div className={s.detailGrid}><div className={s.detailItem}><span>Specialty</span><strong>{app.specialty||'Not provided'}</strong></div><div className={s.detailItem}><span>Sub-specialty</span><strong>{app.sub_specialty||'None'}</strong></div><div className={s.detailItem}><span>License Number</span><strong>{app.license_number||'Not provided'}</strong></div><div className={s.detailItem}><span>Licensing Authority</span><strong>{app.license_authority||'Not provided'}</strong></div><div className={s.detailItem}><span>Experience</span><strong>{app.years_experience||'Not provided'}</strong></div></div></div>
<div className={s.detailCard}><h3>Availability</h3><div className={s.tags}>{(app.availability||[]).map(d=><span key={d} className={s.tag} style={{background:color+'18',color}}>{d}</span>)}</div></div>
<div className={s.detailCard}><h3>Languages</h3><div className={s.tags}>{(app.languages||[]).map(l=><span key={l} className={s.tag} style={{background:'#f0f7ff',color:'#1a5fa8'}}>{l}</span>)}</div></div>
{app.bio&&<div className={s.detailCard}><h3>Professional Bio</h3><p className={s.bio}>{app.bio}</p></div>}
</div>
<div className={s.submitted}><span>Application submitted: {new Date(app.created_at).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span></div>
</>
)}
</div>
</div>
)
}
