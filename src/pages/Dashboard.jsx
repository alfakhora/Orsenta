import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/login'); return; }
      
      const { data, error } = await supabase
        .from('doctor_applications')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (data) setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <div style={{padding:'50px', textAlign:'center'}}>Loading Portal...</div>;

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1>Doctor Dashboard</h1>
        <button onClick={() => supabase.auth.signOut().then(() => navigate('/'))}>Logout</button>
      </div>
      <div style={{ background: '#fff', border: '1px solid #eee', padding: '30px', borderRadius: '12px', marginTop: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <h2>Welcome, Dr. {profile?.first_name} {profile?.last_name}</h2>
        <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', background: profile?.status === 'pending' ? '#fffbeb' : '#f0fdf4' }}>
           <strong>Status: {profile?.status?.toUpperCase()}</strong>
           <p>{profile?.status === 'pending' ? "Our team is currently reviewing your medical license." : "You are approved to see patients!"}</p>
        </div>
      </div>
    </div>
  );
}
