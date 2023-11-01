import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
      setEmail(queryParameters.get("email"))
  }, [])

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleLoginClick = async () => {

    if (password !== confirmPassword) {
      setPasswordError('Password harus sama');
      return
    } else{
      setPasswordError('')
    }

    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}api/User/ResetPassword`, {
          password : password,
          confirmPassword : confirmPassword,
          email : email
      })
      .then(alert('Reset password berhasil'))
      navigate('/login')
  }catch(error){
      alert('Reset gagal')
  }
 
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <div style={{ width: '616px', height: '257px', padding: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', height: '100%', fontFamily: 'Montserrat' }}>
          <span style={{ fontSize: '24px', fontWeight: '400' }}>Create Password</span>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              style={{ height: '33px', borderRadius: '8px', border: '1px solid #4f4f4f', padding: '1px 10px', fontFamily: 'Montserrat', fontSize: '16px', fontWeight: '400' }}
              type="password"
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              style={{ height: '33px', borderRadius: '8px', border: '1px solid #4f4f4f', padding: '1px 10px', fontFamily: 'Montserrat', fontSize: '16px', fontWeight: '400' }}
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </form>
          {passwordError && <div style={{ color: 'red', fontSize: '14px' }}>{passwordError}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
            <button onClick={() => navigate('/login')}
              style={{
                backgroundColor: 'transparent', fontFamily: 'Montserrat', fontSize: '16px',
                fontWeight: '500', color: '#790B0A', width: '140px', height: '38px', borderRadius: '8px',
                border: '1px solid #790B0A', cursor: 'pointer'
              }}
            >Cancel</button>
            <button onClick={handleLoginClick}
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

export default CreatePassword;
