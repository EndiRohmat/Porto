import React from 'react'
import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const UpdateUser = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [role, setRole] = useState()
    const [active, setActive] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      getUser()
    },[])

    const getUser = () => {
      axios.get(`${import.meta.env.VITE_APP_API_URL}api/User/GetByIdUser?id=${id}`)
      .then(res => {
          setName(res.data.username)
          setEmail(res.data.email)
          setRole(res.data.role)
          setActive(res.data.isActivated)
      })
      .catch(error => {
          console.error(error);
      });
    }

    const updateData = () => {
      axios.put(`${import.meta.env.VITE_APP_API_URL}api/User/PutUser?id=${id}`, {
          username: name,
          email: email,
          isActivated: active
      })
      axios.put(`${import.meta.env.VITE_APP_API_URL}api/User/PutUserRole?id=${id}`, {
        role: role
      })
      .then(navigate('/admin-view'))
  }
  console.log(role)
    return (
    <div>
      <Typography variant='h5'>Update User</Typography>
      {name && 
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
              <TextField
                  select
                  sx={{mt:3, width:'120px'}} 
                  label="Role"
                  defaultValue={role}
                  onChange={(e) => setRole(e.target.value)}
              >
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='user'>User</MenuItem>
              </TextField>
              <Box sx={{mt:3}}>
                  <TextField
                      select
                      label="Status"
                      defaultValue={active}
                      sx={{width:'120px'}}
                      onChange={(e) => setActive(e.target.value)}
                  >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                  </TextField>
              </Box>
                  <Button sx={{ mt: 3, px: 5, borderRadius: 2 }} variant='contained' onClick={updateData}>Save
                  </Button>
          </Box>
        }
    </div>
  )
}

export default UpdateUser