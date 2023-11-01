import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContentText = () => {

  const {typeId} = useParams()
  const [detailType, setDetailType] = useState([]) 
  
  useEffect(() => {
    window.scrollTo(0, 0)
    Axios.get(`${import.meta.env.VITE_APP_API_URL}api/Category/GetById?id=${typeId}`).then(res => {
      setDetailType(res.data)
    })
  }, [typeId])

  return (
    <div style={{textAlign: 'justify', fontFamily: 'sans-serif', fontSize: '25px', margin: '100px 140px 200px'}} >
      <h2 style={{ color: 'black', fontWeight: '400'}}>{detailType.name}</h2>
      <p style={{ color: 'black', fontWeight: '300'}}>
        {detailType.description}
      </p>
    </div>
  );
};

export default ContentText;
