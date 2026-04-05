import { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import s from './DoctorRegister.module.css'

const T=[{id:'gp',name:'General Practitioner',short:'GP',color:'#1D9E75'},{id:'registrar',name:'Registrar / Specialist',short:'Registrar',color:'#1a5fa8'},{id:'consultant',name:'Consultant',short:'Consultant',color:'#7C3AED'}]

export default function DoctorRegister(){
  const[step,setStep]=useState(1);
  const[sel,setSel]=useState(null);
  const[done,setDone]=useState(false);
  const[loading,setLoading]=useState(false);
  const[form,setForm]=useState({fn:'',ln:'',email:'',password:'',spec:'',lic:''});

  const h=e=>setForm({...form,[e.target.name]:e.target.value});
  const tier=T.find(t=>t.id===sel) || T[0];

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      if (authError) throw authError;

      const { error: dbError } = await supabase
        .from('doctor_applications')
        .insert([{
          user_id: authData.user.id,
          first_name: form.fn,
          last_name: form.ln,
          email: form.email,
          tier: sel,
          specialty: form.spec,
          license_number: form.lic,
          status: 'pending'
        }]);
      if (dbError) throw dbError;
      setDone(true);
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  if(done) return <div style={{padding:'100px', textAlign:'center', fontFamily:'sans-serif'}}><h2>Check your email!</h2><p>Click the link in the email to activate your account, then <a href="/login">Login</a>.</p></div>;

  return (
    <div className={s.pg} style={{padding:'20px', fontFamily:'sans-serif'}}>
      {step === 1 ? (
        <div style={{maxWidth:'600px', margin:'0 auto'}}>
          <h2>Select your Tier</h2>
          {T.map(t=>(
            <div key={t.id} onClick={()=>{setSel(t.id);setStep(2)}} style={{border:'1px solid #ddd', margin:'10px 0', padding:'20px', borderRadius:'10px', cursor:'pointer', background:'white'}}>
              <h3 style={{color:t.color, margin:0}}>{t.name}</h3>
              <p style={{margin:'5px 0 0 0', color:'#666'}}>Apply as a {t.short}</p>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleRegister} style={{maxWidth:'400px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'10px'}}>
          <button type="button" onClick={()=>setStep(1)} style={{alignSelf:'flex-start'}}>← Back</button>
          <h3>Register as {tier.name}</h3>
          <input name="fn" placeholder="First Name" onChange={h} required style={{padding:'10px'}} />
          <input name="ln" placeholder="Last Name" onChange={h} required style={{padding:'10px'}} />
          <input name="email" type="email" placeholder="Email" onChange={h} required style={{padding:'10px'}} />
          <input name="password" type="password" placeholder="Password" onChange={h} required style={{padding:'10px'}} />
          <input name="spec" placeholder="Specialty (e.g. Cardiology)" onChange={h} required style={{padding:'10px'}} />
          <input name="lic" placeholder="License Number" onChange={h} required style={{padding:'10px'}} />
          <button type="submit" disabled={loading} style={{background:tier.color, color:'white', border:'none', padding:'15px', borderRadius:'5px', fontWeight:'bold'}}>
            {loading ? 'Processing...' : 'Submit Application'}
          </button>
        </form>
      )}
    </div>
  )
}
