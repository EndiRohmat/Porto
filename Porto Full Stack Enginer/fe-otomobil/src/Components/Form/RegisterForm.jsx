import { useState } from "react"
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import axios from "axios";
const RegisterForm = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
        };
    const handleClose = () => {
        setOpen(false);
        };
    const handleNameChange = (e) => {
        setName(e.target.value)
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    };

    const handleRegister = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailRegex)) {
            setEmailError('Masukkan alamat email yang valid');
            return;
        } else {
            setEmailError('');
        }

        if(password !== confirmPassword){
            setPasswordError('Password tidak sama')
            return;
        }else{
            setPasswordError('')
        }

        try {
            axios.post(`${import.meta.env.VITE_APP_API_URL}api/User/CreateUser`, {
                username : name,
                email : email,
                password : password,
                role : role
            })
            .then(alert('Cek email untuk aktivasi'))
        }catch(error){
            alert('Register Gagal')
        }

    }
  return (
    <div style={{ display: 'flex', alignItems:'center', justifyContent:'center', height:'60vh'}}>
    <div style={{width:'616px',height:'257px', padding:'10px'}}>
    <div style={{display: 'flex', flexDirection:'column', gap: '40px',width:'100%',height:'100%', fontFamily:'Montserrat'}}>
        <span style={{fontSize: '24px', fontWeight: '500', color:'#790B0A'}}>Lets Join our course!</span>
        <span style={{fontSize: '16px', fontWeight: '400'}}>Please register first</span>
        <form style={{display: 'flex', flexDirection:'column', gap: '20px'}}>
            <input onChange={handleNameChange}
            style={{height: '33px', borderRadius:'8px',border:'1px solid #4f4f4f',padding:'1px 10px', fontFamily:'Montserrat',fontSize: '16px', fontWeight: '400'}} type="text" placeholder="Name"
            />  
            <input onChange={handleEmailChange}
            style={{height: '33px', borderRadius:'8px',border:'1px solid #4f4f4f',padding:'1px 10px', fontFamily:'Montserrat',fontSize: '16px', fontWeight: '400'}} type="text" placeholder="Email"
            />
            {emailError && <div style={{ color: 'red', fontSize: '14px' }}>{emailError}</div>}
            <input onChange={handlePasswordChange}
            style={{height: '33px', borderRadius:'8px',border:'1px solid #4f4f4f',padding:'1px 10px', fontFamily:'Montserrat',fontSize: '16px', fontWeight: '400'}} type="password" placeholder="Password"
            />
            <input onChange={handleConfirmPasswordChange}
            style={{height: '33px', borderRadius:'8px',border:'1px solid #4f4f4f',padding:'1px 10px', fontFamily:'Montserrat',fontSize: '16px', fontWeight: '400'}} type="password" placeholder="Confirm Password"
            />
            {passwordError && <div style={{ color: 'red', fontSize: '14px' }}>{passwordError}</div>}
        </form>
        
        <div style={{display: 'flex', justifyContent:'flex-end', gap: '20px'}}>
        <button onClick={handleRegister}
                style={{backgroundColor: '#790B0A',fontFamily:'Montserrat', fontSize: '16px', 
                fontWeight: '500',color: 'white',width: '140px', height:'38px', borderRadius:'8px',
                border:'none',cursor:'pointer'}}
        >Sign Up</button>
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
        <span style={{fontSize: '16px', fontWeight: '400'}}>Have account? <Link to='/login'>Login here</Link></span>
        </div>
    </div>
    </div>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
            <span style={{fontFamily: 'Poppins', fontWeight:'500', fontSize:'20px', color: '#790B0A'}}>Check your email</span>
            <span style={{fontFamily: 'Poppins', fontWeight:'500', fontSize:'13px', color: '#41454D'}}>Click link in email to activate your account</span>
        </div>
        <div style={{display:'flex', justifyContent:'center', gap:'18px', marginBottom:'20px'}}>
        <button style={{padding:'10px 20px',backgroundColor: '#790B0A',fontFamily:'Montserrat', fontSize: '16px', 
                    fontWeight: '500',color: 'white',width: '155px', height:'48px', borderRadius:'8px',
                    border:'none',cursor:'pointer'}} onClick={() => navigate('/login')}>Login
        </button>
        </div>
      </Dialog>
</div>
  )
}

export default RegisterForm