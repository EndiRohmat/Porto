import { useNavigate } from 'react-router'
import { Outlet } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"
import useAuth from '../../Hooks/useAuth';
import { useState, useEffect } from 'react'
import jwt from 'jwt-decode'

const Navbar = () => {
  const navigate = useNavigate()
  const {logout, payload} = useAuth()
  const handleLogout = ()=>{
        logout()
        navigate('/')
        window.location.reload()
  }
  const handleAdmin = ()=>{
    navigate('/admin-view')
  }
  const [role, setRole] = useState('')
  useEffect(()=>{
    if(payload){
      const token = jwt(payload.token)
      setRole(token.role)
    }
  },[])
  const NavBefore = () => {
    return(
        /* navbar sebelum login */
        <div style={{display: 'flex', alignItems: 'center', gap:'10px' }}>
        <button onClick={() => navigate('/register')} 
        style={{backgroundColor: 'transparent', fontFamily:'Montserrat', fontSize: '16px', 
        fontWeight: '500', color: '#790B0A',width: '86px', height:'40px', borderRadius:'8px',
        border:'none',cursor:'pointer'}}
        >Sign up</button>
        <button onClick={() => navigate('/login')}
        style={{backgroundColor: '#790B0A',fontFamily:'Montserrat', fontSize: '16px', 
        fontWeight: '500',color: 'white',width: '86px', height:'40px', borderRadius:'8px',
        border:'none',cursor:'pointer'}}
        >Login</button>
        </div>
    )
}
    
    const NavAfter =() => {
        return(
        <div style={{display: 'flex', alignItems: 'center',color:'#790B0A', gap:'40px' }}>
        <Link style={{textDecoration:'none', color:'#790B0A'}} to='/checkout'><ShoppingCartIcon style={{width: '20px', height:'20px', cursor:'pointer'}} /> </Link>
        <Link style={{textDecoration:'none', color:'#790B0A'}} to='/my-class'>
        <span style={{fontSize: '16px', fontWeight: '500', cursor:'pointer'}}>My Class</span> </Link>
        <Link style={{textDecoration:'none', color:'#790B0A'}} to='/invoices'>
        <span style={{fontSize: '16px', fontWeight: '500', cursor:'pointer'}}>Invoice</span></Link>
        {role === 'admin' && 
        <PersonIcon onClick={handleAdmin}style={{ width: '24px', height:'24px', cursor:'pointer'}}/>
        }
        <LogoutIcon onClick={handleLogout} style={{width: '24px', height:'24px', cursor:'pointer'}}/>
        </div>
        )
    }
    
  return (
        <>
        <nav style={{display:'flex',justifyContent:'center'}}>
            <div style={{ 
            display: 'flex', justifyContent: 'space-between', padding: '5px 5px', 
            fontFamily :'Montserrat', maxWidth:'1700px', width:'100%'}}
            >
                <Link style={{textDecoration:'none', color:'black'}} to='/'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src="/iconotomobil.png" alt="" style={{width:'62.44px', height:'50px'}}/>
                    <span style={{fontSize: '20px', fontWeight: '400'}}>Otomobil</span>                
                </div>
                </Link>
                {!payload? 
                    <NavBefore/>
                    :
                    <NavAfter/>
                }

            </div>
        </nav>
            <Outlet />
        </>
  )
}

export default Navbar