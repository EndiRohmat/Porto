import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from "axios";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirmClick = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.match(emailRegex)) {
      setEmailError('Masukkan alamat email yang valid');
      return;
    } else {
      setEmailError('');
    }

    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}api/User/ForgetPassword?email=${email}`)
      .then(alert('Check email untuk reset password'))
      navigate('/')
    }catch(error){
      alert('Reset Password error')

    
  }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <div style={{ width: '616px', height: '257px', padding: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', height: '100%', fontFamily: 'Montserrat' }}>
          <span style={{ fontSize: '24px', fontWeight: '400' }}>Forgot Password</span>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              onChange={handleEmailChange}
              style={{ height: '33px', borderRadius: '8px', border: '1px solid #4f4f4f', padding: '1px 10px', fontFamily: 'Montserrat', fontSize: '16px', fontWeight: '400' }}
              type="text"
              placeholder="Email"
            />
            {emailError && <div style={{ color: 'red', fontSize: '14px' }}>{emailError}</div>}
          </form>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
            <button onClick={() => navigate('/login')}
              style={{
                backgroundColor: 'transparent', fontFamily: 'Montserrat', fontSize: '16px',
                fontWeight: '500', color: '#790B0A', width: '140px', height: '38px', borderRadius: '8px',
                border: '1px solid #790B0A', cursor: 'pointer'
              }}
            >Cancel</button>
            <button onClick={handleConfirmClick}
              style={{
                backgroundColor: '#790B0A', fontFamily: 'Montserrat', fontSize: '16px',
                fontWeight: '500', color: 'white', width: '140px', height: '38px', borderRadius: '8px',
                border: 'none', cursor: 'pointer'
              }}
            >Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
