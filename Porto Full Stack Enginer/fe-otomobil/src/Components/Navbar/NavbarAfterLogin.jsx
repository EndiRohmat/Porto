import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"

const NavbarAfterLogin= () => {
    return (
        <nav>
            <div style={{ 
            display: 'flex', justifyContent: 'space-between', padding: '5px 10px', 
            fontFamily :'Montserrat', Width:'1280px', Height:'86px'}}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src="/iconotomobil.png" alt="" style={{width:'62.44px', height:'50px'}}/>
                    <span style={{fontSize: '20px', fontWeight: '400'}}>Otomobil</span>                
                </div>
                <div style={{display: 'flex', alignItems: 'center',color:'#790B0A', gap:'40px' }}>
                <Link style={{textDecoration:'none', color:'#790B0A'}} to='/checkout'><ShoppingCartIcon style={{width: '20px', height:'20px'}} /> </Link>
                <Link style={{textDecoration:'none', color:'#790B0A'}} to='/my-class'><span style={{fontSize: '16px', fontWeight: '500'}}>My Class</span> </Link>
                <span style={{fontSize: '16px', fontWeight: '500'}}>Invoice</span>
                <span>|</span>
                <PersonIcon style={{ width: '24px', height:'24px'}}/>
                <LogoutIcon style={{width: '24px', height:'24px'}}/>
                </div>
            </div>
        </nav>
      )
   
}

export default NavbarAfterLogin