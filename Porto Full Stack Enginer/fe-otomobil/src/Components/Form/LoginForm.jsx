import { useState } from "react";
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom"
import axios from "axios";
import jwt from 'jwt-decode'
import useAuth from "../../Hooks/useAuth";

const LoginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const { login } = useAuth()

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    const handleLogin = async () => {
        // Validasi email
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email.match(emailRegex)) {
            setEmailError('Masukkan alamat email yang valid');
            return;
        } else {
            setEmailError('');
        }

        // if (password.length < 8) {
        //     setPasswordError('Password harus minimal 8 ');
        //     return;
        // } else {
        //     setPasswordError('');
        // }

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}api/User/login`, {
                email : email,
                password : password
            })
            const token = response.data.token
            const user = jwt(token)
            const payload = {
                token : token,
                id : user.UserId
            }
            login(payload)
            // userPayload(user)
            navigate('/')
            window.location.reload()

        }catch(error){
            alert('login gagal')
        }

    }

    return (
        <div style={{ display: 'flex', alignItems:'center', justifyContent:'center', height:'60vh'}}>
            <div style={{width:'616px',height:'257px', padding:'10px'}}>
                <div style={{display: 'flex', flexDirection:'column', gap: '40px',width:'100%',height:'100%', fontFamily:'Montserrat'}}>
                    <span style={{fontSize: '24px', fontWeight: '500', color:'#790B0A'}}>Welcome back!</span>
                    <span style={{fontSize: '16px', fontWeight: '400'}}>Please login first</span>
                    <form style={{display: 'flex', flexDirection:'column', gap: '20px'}}>
                        <input onChange={handleEmailChange}
                        style={{height: '33px', borderRadius:'8px',border:'1px solid #4f4f4f',padding:'1px 10px', fontFamily:'Montserrat',fontSize: '16px', fontWeight: '400'}} type="text" placeholder="Email"
                        />
                        {emailError && <div style={{ color: 'red', fontSize: '14px' }}>{emailError}</div>}
                        <input onChange={handlePasswordChange}
                        style={{height: '33px', borderRadius:'8px',border:'1px solid #4f4f4f',padding:'1px 10px', fontFamily:'Montserrat',fontSize: '16px', fontWeight: '400'}} type="password" placeholder="Password"
                        />
                        {passwordError && <div style={{ color: 'red', fontSize: '14px' }}>{passwordError}</div>}
                    </form>
                    <span style={{fontSize: '16px', fontWeight: '400'}}>Forgot Password? <Link to='/reset-password'>Click Here</Link></span>
                    
                    <div style={{display: 'flex', justifyContent:'flex-end', gap: '20px'}}>
                        <button onClick={handleLogin}
                                style={{backgroundColor: '#790B0A',fontFamily:'Montserrat', fontSize: '16px', 
                                fontWeight: '500',color: 'white',width: '140px', height:'38px', borderRadius:'8px',
                                border:'none',cursor:'pointer'}}
                        >Login</button>
                    </div>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <span style={{fontSize: '16px', fontWeight: '400'}}>Dont have an account? <Link to='/register'>Sign Up here</Link></span>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
