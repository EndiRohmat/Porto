import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import MailIcon from '@mui/icons-material/Mail';
import { Email } from '@mui/icons-material';

const Footer = () => {
  return (
        <footer>
            <div style={{maxwidth: '1280px', marginTop:'100px', paddingLeft:'30px'}}>
                <div 
                style={{display:'flex',flexDirection:'row',alignItems:'center' ,justifyContent:'center',maxWidth: '100%', height:'100%',
                fontFamily: 'Montserrat', gap: '40px', flexWrap: 'wrap'}}
                > 
                    <div style={{height:'137px', width:'350px'}}>
                        <span style={{fontFamily:'Poppins', fontWeight:'500', fontSize:'16px', color:'#790B0A'}}>About Us</span>
                        <div style={{fontFamily:'Poppins', fontWeight:'400', fontSize:'14px'}}>Sed ut perspiciatis unde omnis iste natus error 
                            sit voluptatem accusantium doloremque laudantium, 
                            totam rem aperiam, eaque ipsa quae ab illo inventore 
                            veritatis et quasi architecto beatae vitae dicta sunt 
                            explicabo. 
                        </div>
                    </div>
                    <div style={{height:'146px', width:'229px'}}>
                        <span style={{fontFamily:'Poppins', fontWeight:'500', fontSize:'16px', color:'#790B0A'}}>Product</span>
                        <div style={{display:'flex', fontFamily:'Poppins', fontWeight:'400', fontSize:'14px'}}>
                            <div>
                            <ul>
                                <li>Electric</li>
                                <li>LCGC</li>
                                <li>Offroad</li>
                                <li>Suv</li>
                            </ul>
                            </div>
                            <div>
                                <ul>
                                <li>Hatchback</li>
                                <li>MPV</li>
                                <li>Sedan</li>
                                <li>Truck</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{height:'146px', width:'352px'}}>
                        <span style={{fontFamily:'Poppins', fontWeight:'500', fontSize:'16px', color:'#790B0A'}}>Address</span>
                        <div style={{fontFamily:'Poppins', fontWeight:'400', fontSize:'14px', marginBottom:'10px'}}>
                        Sed ut perspiciatis unde omnis iste natus error 
                        Sed ut perspiciatis unde omnis iste natus error sit 
                        voluptatem accusantium doloremque.
                        </div>
                        <div>
                        <span style={{fontFamily:'Poppins', fontWeight:'500', fontSize:'16px', color:'#790B0A'}}>Contact Us</span> 
                            <div style={{display:'flex',gap:'20px'}}>
                                <div style={{padding:'10px',backgroundColor: '#790B0A', borderRadius: '50px',display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <LocalPhoneIcon style={{color: '#fff'}}/>
                                </div >
                                <div style={{padding:'10px',backgroundColor: '#790B0A', borderRadius: '50px',display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <InstagramIcon style={{color: '#fff'}}/>
                                </div>
                                <div style={{padding:'10px',backgroundColor: '#790B0A', borderRadius: '50px',display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <YouTubeIcon style={{color: '#fff'}}/>
                                </div>
                                <div style={{padding:'10px',backgroundColor: '#790B0A', borderRadius: '50px',display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TelegramIcon style={{color: '#fff'}}/>
                                </div>
                                <div style={{padding:'10px',backgroundColor: '#790B0A', borderRadius: '50px',display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <MailIcon style={{color: '#fff'}}/>
                                </div >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
  )
}

export default Footer