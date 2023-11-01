import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddCourse = () => {
  const [getCategory, setGetCategory] = useState([])
  const [course, setCourse] = useState('')
  const [category, setCategory] = useState(0)
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0) 
  const [description, setDescription] = useState('')
  const [active, setActive] = useState(false)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target.result;
        const bytes = dataURL.split(',')[1];
        setImage(bytes);
      };
      reader.readAsDataURL(file);
    }
};
function base64ToHex(str) {
  const raw = atob(str);
  let hex = '0x'
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return hex+=result.toLowerCase();
}
  useEffect(() => {
    getAllType()
  },[])

  const getAllType = () => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}api/Category`).then(res => {
      setGetCategory(res.data)
    })
  }

  const addNew = () => {
    axios.post(`${import.meta.env.VITE_APP_API_URL}api/Course`, {
      name : course,
      image : image,
      price : price,
      description : description,
      fkIdCategory : category,
      isActivated : active
  })
    .then(navigate('/admin-view/manage-course'))
}


  return (
    <div>
      <Typography variant="h5">Add New Course</Typography>
        <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
          <TextField
            select
            sx={{width:'250px'}}
            label="Category"
            defaultValue = 'category'
            onChange={(e) => setCategory(e.target.value)}
          >
          {getCategory && getCategory.map((option) => (
            <MenuItem key={option.idCategory} value={option.idCategory}>
              {option.name}
            </MenuItem>
          ))}
          </TextField>
          <TextField 
            fullWidth
            sx={{mt:3}} 
            type='text' 
            label = 'Course Name' 
            defaultValue = ''
            onChange={(e) => setCourse(e.target.value)} 
          />
                    
          <Box sx={{mt:3}}>
            <Box>
              <Typography>Image for this Course:</Typography>
              <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${image}`}/>
            </Box>
            <TextField type="file" inputProps={{accept:"image/*"}} onChange={handleImageChange} />    
          </Box>
            <TextField 
            fullWidth 
            sx={{mt:3}} 
            type='number' 
            label = 'Price' 
            defaultValue = '0'
            onChange={(e) => setPrice(e.target.value)} 
            />
            <TextField 
            fullWidth 
            multiline
            sx={{mt:3}} 
            type='text' 
            label = 'Description' 
            defaultValue = {description} 
            onChange={(e) => setDescription(e.target.value)}
            />
          <Box sx={{mt:3}}>
            <TextField
              select
              sx={{width:'250px'}}
              label="Status"
              defaultValue='false'
              onChange={(e) => setActive(e.target.value)}
            >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
            </TextField>
          </Box>
          <Button onClick={addNew} sx={{ mt: 3, px: 5, borderRadius: 2 }} variant='contained' >Save</Button>
      </Box>
    </div>
  )
}

export default AddCourse