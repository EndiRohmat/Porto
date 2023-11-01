import React from 'react'
import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:'122px', gap:'40px', left:'422px', top:'122px'}}>
            <div style={{maxWidth:'250px', height:'250px'}}>
                <img src="/succes.png" alt="Success" />
            </div>
            <div style={{maxWidth:'435px', height:'57px', gap:'8px', textAlign:'center', marginBottom:'50px'}}>
                <h2 style={{fontFamily:'Montserrat', fontWeight:'500', fontSize:'24px', lineHeight:'29.26px', color:'#790B0A'}}>Email Confirmation Success</h2>
                <p style={{fontFamily: 'Montserrat',fontSize: '16px',fontWeight: '400',lineHeight: '20px',letterSpacing: '0em', color:'#4F4F4F'}}>Your email already! Please login first to access the web</p>
            </div>
            
            <div style={{display: 'flex', justifyContent:'flex-end', gap: '20px'}}>
                <button
                    style={{
                        maxWidth:'133px', height:'50px', borderRadius:'6px', border:'none',padding:'16px 24px 16px 24px', gap:'8px', backgroundColor: '#790B0A'
                    }}>
                        <Link to="/login" style={{display:'flex', cursor:'pointer', fontFamily:'Montserrat', fontWeight:'600', fontSize:'15px', color:'#FFFFFF', textDecoration:'none' }}>Login Here</Link>
                </button>
            </div>
        </div>
  )
}

export default RegisterSuccess