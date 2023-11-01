import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const AddUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate()

    const addNewUser = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailRegex)) {
            setEmailError('Masukkan alamat email yang valid!');
            return;
        } else {
            setEmailError('');
        }

        try {
            axios.post(`${import.meta.env.VITE_APP_API_URL}api/User/CreateUser`, {
                username : name,
                email : email,
                password : password,
                role : role
            })
            .then(alert('User di tambahkan'))
        }catch(error){
            alert('Tambah User Gagal')
        }
    }

  return (
    <div>
        <div>
            <Typography variant='h5'>Add New User</Typography>

            <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
                <TextField 
                    fullWidth 
                    type='text' 
                    label = 'Name' 
                    defaultValue = {name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <TextField 
                    fullWidth
                    sx={{mt:3}} 
                    type='text' 
                    label = 'Email' 
                    defaultValue = {email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                {emailError && <div style={{ color: 'red', fontSize: '14px' }}>{emailError}</div>}
                <TextField 
                    fullWidth 
                    sx={{mt:3}}  
                    type="password"
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <TextField
                    select
                    sx={{mt:3, width:'120px'}} 
                    label="Role"
                    defaultValue='Role'
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='user'>User</MenuItem>
                </TextField>
            </Box>
            <Button onClick={addNewUser} sx={{ mt: 3, px: 5, borderRadius: 2, backgroundColor:'#790B0A' }} variant='contained' >Save</Button>
        </div>
    </div>
  )
}

export default AddUser