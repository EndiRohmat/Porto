

const Benefits = () => {
  return (
    <section>
    <div style={{maxwidth: '1280px', marginTop:'100px', paddingLeft:'30px'}}>
        <div 
        style={{display:'flex',flexDirection:'column',alignItems:'center' ,maxWidth: '100%', height:'100%',
        fontFamily: 'Montserrat', gap: '40px'}}
        > 
            <div style={{display:'flex' }}>
                <div style={{fontWeight: '600', fontSize:'40px', color:'#790B0A'}}>
                    Gets your best benefit
                </div>
            </div>
            <div style={{display: 'flex', gap: '30px', flexWrap:'wrap'}}>
                <div style={{maxWidth: '720px', height:'200px', marginBottom:'40px'}}>
                    <div style={{fontWeight: '500', fontSize:'16px'}}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.

                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </div>
                </div>
                <div style={{width: '375px', height:'280px' }}>
                    <img style={{width: '100%', height:'100%',objectFit: 'cover'}} src="/img1.png" alt="" />
                </div>
            </div>
        </div>
    </div>
    </section>
  )
}
export default Benefits