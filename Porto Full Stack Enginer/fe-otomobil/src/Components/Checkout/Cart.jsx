
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Stack, Typography, Button } from '@mui/material';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';

const Cart = () => {
    const navigate = useNavigate()
    const {payload} = useAuth()
    const [paymentMethod, setPaymentMethod] = useState([])
    const [open, setOpen] = React.useState(false);
    const [cart, setCart] = useState([])
    const [checkedState, setCheckedState] = useState([]);
    const [isItemDeleted, setIsItemDeleted] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    const [dataOrder, setDataOrder] = useState([])
   // const [dataInvoice, setDataInvoice] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_APP_API_URL}api/Cart/GetCartByUserID?id_user=${payload.id}`).then(res => {
            setCart(res.data)
            setCheckedState(new Array(res.data.length).fill(false));
        })
        .catch((error) => console.log(error))
        
    }, [isItemDeleted])
    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_APP_API_URL}api/Payment/GetAllActivePayment`).then(res => {
            setPaymentMethod(res.data)
        })
        .catch((error) => console.log(error))
    },[])
    const deleteCart = (id_cart) =>{
        const confirmation = window.confirm('Apakah yakin akan menghapus course?');
        if (confirmation) {
            axios
            .delete(`${import.meta.env.VITE_APP_API_URL}api/Cart/DeleteCart?id_cart=${id_cart}`)
            .then(() => {
                setTotalPrice(0)
                window.location.reload();
                alert('Course telah dihapus');
                })
            .catch((error) => console.log(error))

            setIsItemDeleted(!isItemDeleted); 
        } else{
            alert('Penghapusan dibatalkan')
        }
        
    }

    const handleOnChange = (event, position) => {
        const isChecked = event.target.checked;
      
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? isChecked : item
        );
        setCheckedState(updatedCheckedState);
      
        const newDataOrder = cart.filter((_, index) => updatedCheckedState[index]);
        setDataOrder(newDataOrder);
      
        const finalPrice = newDataOrder.reduce(
            (sum, item) => sum + item.price,
            0
        );
        setTotalPrice(finalPrice);

 
    };

    const handleAll = () => {
        const selectAll = checkedState.map(() => true);
        setCheckedState(selectAll);
      
        setDataOrder(cart);

        const finalPrice = cart.reduce(
            (sum, item) => sum + item.price,
            0
        );
        setTotalPrice(finalPrice);
      
  
    };

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
      
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
      
        return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
    }

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleListItemClick = (value, index) => {
        setSelectedIndex(index)
        //setSelectedPayment(value)
    };

    const handleCheckout = async () => {
        if(dataOrder.length === 0){
            return alert('Pilih Course Yang Inin Dibayar')
        }
        try {
            // Langkah 1: Kirim permintaan POST untuk membuat invoice
            const invoiceResponse = await axios.post(`${import.meta.env.VITE_APP_API_URL}api/Invoice/CreateInvoice`, {
                totalPrice: totalPrice,
                total_course: dataOrder.length,
                fk_id_user: payload.id
            });
    
            if (!invoiceResponse.data) {
                console.log("Respons gagal saat membuat invoice.");
                return;
            }
    
            const dataInvoice = invoiceResponse.data;
    
            // Langkah 2: Kirim permintaan POST untuk menambahkan invoice detail
            for (const item of dataOrder) {
                await axios.post(`${import.meta.env.VITE_APP_API_URL}api/InvoiceDetail/AddInvoiceDetail`, {
                    fk_id_invoice: dataInvoice.idInvoice,
                    fk_id_schedule: item.idSchedule
                });
            }
    
            // Langkah 3: Kirim permintaan DELETE untuk menghapus item dari keranjang
            for (const item of dataOrder) {
                await axios.delete(`${import.meta.env.VITE_APP_API_URL}api/Cart/DeleteCart?id_cart=${item.idCart}`);
            }
    
            // Jika semua langkah berhasil, maka navigasikan ke halaman sukses
            setTotalPrice(0);
            navigate('/checkout/success');
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        }
    }

  return (
    <div style={{position:'relative'}}>
        <Box sx={{pt:4, px:{sm:10, xs:5}, mb:15}}>
            <Box sx={{borderBottom:2, borderColor:'grey.300', py:1}}>
                <FormControlLabel
                    label="Pilih Semua"
                    control={
                    <Checkbox sx={{'&.Mui-checked':{color: '#790B0A'}}}
                        checked={checkedState.every(value => value === true)}
                        onChange={handleAll}
                    />
                    }
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            {cart && cart.map((list, index) => (
                <Box key={index} sx={{borderBottom:3, borderColor:'grey.300', py:2, display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                    <Stack direction={{sm:'row', xs:'column'}}>
                        <Stack direction='row'>
                            <FormControlLabel
                                control={
                                <Checkbox sx={{'&.Mui-checked':{color: '#790B0A'}}} checked={checkedState[index]} onChange={(event) => handleOnChange(event, index)}/>
                                }
                            />
                            <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${list.image}`}/>
                        </Stack>
                        <Box sx={{px:{sm:3, xs:6}}}>
                            <Typography sx={{pb:1, mt:{sm:0, xs:2}, fontWeight:'400', fontSize:'16px', color: '#828282'}}>{list.category}</Typography>
                            <Typography variant='h5' sx={{pb:1, fontWeight:'600', fontSize:'24px', color: '#333333'}}>{list.nameCourse}</Typography>
                            <Typography sx={{pb:1, fontWeight:'400', fontSize:'16px', color: '#4F4F4F'}}>Schedule : {formatDate(list.date)}</Typography>
                            <Typography variant='h6' sx={{pb:1, fontWeight:'600', fontSize:'20px', color: '#790B0A'}}>
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(list.price)}
                            </Typography>
                        </Box>
                    </Stack>
                    <Button onClick={() => deleteCart(list.idCart)}>
                        <DeleteForeverIcon fontSize='large' sx={{color:'red'}}/>
                    </Button>
                </Box>
            ))}
            </Box>
        </Box>
        <Box sx={{position:'fixed', width:'100vw', boxSizing:'border-box', 
            bottom:0, py:3, px:{sm:10, xs:5}, display:'flex', justifyContent: 'space-between', borderTop:3, borderColor:'grey.300', backgroundColor:'white'}}>
                <Stack direction='row' spacing={3}>
                    <Typography sx={{fontWeight:'400', fontSize:'18px', color: '#333333', pt:1}}>Total Price</Typography>
                    <Typography sx={{fontWeight:'600', fontSize:'24px', color: '#790B0A'}}>
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice)}
                    </Typography>
                </Stack>
                <Box>
                        <Button sx={{px:{sm:4, xs:2}, borderRadius:2, backgroundColor: '#790B0A', color: 'white', fontFamily:'Montserrat'}} variant='contained' onClick={handleClickOpen}>Pay Now</Button>
                </Box>
        </Box>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
            <span style={{fontFamily: 'Poppins', fontWeight:'500', fontSize:'20px', color: '#41454D'}}>Select Payment Method</span>
        </div>
        <List sx={{ px:1 }}>
            {paymentMethod && paymentMethod.map((item, index) => (
            <ListItem sx={{py:0}} disableGutters key={index}>
                <ListItemButton selected={selectedIndex === index} onClick={() => handleListItemClick(item.id_payment, index)}>
                <Box component='img' sx={{height:'40px', width:'40px'}} src={`data:image/png;base64,${item.image}`}/>
                <ListItemText sx={{px:2}} primary={item.payment_name} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <div style={{display:'flex', justifyContent:'center', gap:'18px', margin:'20px'}}>
        <button style={{padding:'10px 20px',backgroundColor: '#FFFF',fontFamily:'Montserrat', fontSize: '16px', 
                    fontWeight: '500',color: '#790B0A',width: '155px', height:'48px', borderRadius:'8px',
                    border:'1px solid #790B0A',cursor:'pointer'}} onClick={handleClose}>Cancel 
        </button>
        <button style={{padding:'10px 20px',backgroundColor: '#790B0A',fontFamily:'Montserrat', fontSize: '16px', 
                    fontWeight: '500',color: 'white',width: '155px', height:'48px', borderRadius:'8px',
                    border:'none',cursor:'pointer'}} onClick={handleCheckout}>Pay Now
        </button>
        </div>
      </Dialog>
    </div>
  )
}

export default Cart