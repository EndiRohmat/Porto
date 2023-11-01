

const LessonsBanner = () => {
  return (
    <section>
    <div style={{width:'100%', height:'496px', display:'flex', justifyContent:'center'}}>
        <div 
        style={{display:'flex',flexDirection:'column',justifyContent:'center',color:'white',alignItems:'center' ,width:'1280px',maxWidth: '100%', height:'100%',
        backgroundImage:'url(/banner1.png)', backgroundSize:'cover',fontFamily: 'Montserrat', gap: '40px', paddingLeft:'20px', borderRadius:'8px'}}
        >
            <div style={{display:'flex',flexDirection:'column', alignItems:'center', gap: '20px'}}>
                <div style={{fontWeight: '600', fontSize:'32px'}}>We provide driving lessons for various types of cars</div>
                <div style={{fontWeight: '400', fontSize:'24px'}}>Professional staff who are ready to help you to become a much-needed reliable driver</div>
            </div>
            <div style={{display:'flex',alignItems:'center', gap: '20px'}}>
                <div style={{display:'flex',flexDirection:'column',gap: '40px', alignItems:'center'}}>
                    <div style={{fontWeight: '600', fontSize:'48px'}}>50+</div>
                    <div style={{fontWeight: '500', fontSize:'16px'}}>A class ready to make you a reliable driver</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap: '40px', alignItems:'center'}}>
                    <div style={{fontWeight: '600', fontSize:'48px'}}>20+</div>
                    <div style={{fontWeight: '500', fontSize:'16px'}}>Professional workforce with great experience</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap: '40px', alignItems:'center'}}>
                    <div style={{fontWeight: '600', fontSize:'48px'}}>10+</div>
                    <div style={{fontWeight: '500', fontSize:'16px'}}>Cooperate with driver service partners</div>
                </div>
            </div>
        </div>
    </div>
    </section>
  )
}

export default LessonsBanner