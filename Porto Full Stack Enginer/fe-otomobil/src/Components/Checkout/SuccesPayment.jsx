import { useNavigate } from 'react-router'
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const SuccesPayment = () => {
    const navigate = useNavigate()
  return (
        <div style={{width: '100%',height:'70vh',gap:'30px', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <div>
                <div style={{backgroundImage: 'url(/succes.png)', width: '250px', height:'250px',backgroundSize: 'cover' }}></div>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}>
                <div style={{fontFamily:'Montserrat', fontWeight: '500', fontSize:'24px', color:'#790B0A'}}>Purchase Successfully</div>
                <div style={{fontFamily:'Montserrat', fontWeight: '400', fontSize:'16px', color:'#4F4F4F'}}>That’s Great! We’re ready for driving day</div>
            </div>
            <div style={{display:'flex', gap:'20px'}}>
                <button style={{padding:'10px 20px',backgroundColor: '#FFFF',fontFamily:'Montserrat', fontSize: '16px', 
                    fontWeight: '500',color: '#790B0A',width: '189px', height:'50px', borderRadius:'8px',
                    border:'1px solid #790B0A',cursor:'pointer', display: 'flex', alignItems: 'center',gap:'5px'}} onClick={() => navigate('/')}><HomeIcon />Back to Home 
                </button>
                <button style={{padding:'10px 20px',backgroundColor: '#790B0A',fontFamily:'Montserrat', fontSize: '16px', 
                    fontWeight: '500',color: 'white',width: '189px', height:'50px', borderRadius:'8px',
                    border:'none',cursor:'pointer',  display: 'flex', alignItems: 'center',gap:'5px'}} onClick={() => navigate('/invoices')}><ArrowForwardIcon /> Open Invoice
                </button>
            </div>
        </div>
  )
}

export default SuccesPayment