import React from 'react'
import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const UpdateCourse = () => {
  const [type, setType] = useState()
  const [category, setCategory] = useState()
  const [course, setCourse] = useState()
  const [image, setImage] = useState()
  const [price, setPrice] = useState() 
  const [description, setDescription] = useState()
  const [active, setActive] = useState(null)
  const [allCategory, setAllCategory] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()


  useEffect(() => {
    getCourse()
    getAllType()
},[])

const getCourse = async () => {
    try {
        const menuResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}api/Course/GetById?id=${id}`);
        const menuData = menuResponse.data;
        setType(menuData.fkIdCategory);
        setCourse(menuData.name);
        setDescription(menuData.description);
        setImage(menuData.image);
        setPrice(menuData.price);
        setActive(menuData.isActivated);
        setCategory(menuData.fkIdCategory);
    } catch (error) {
        console.error(error);
    }
}


const getAllType = () => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}api/Category`).then(res => {
    setAllCategory(res.data)
})
}

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

const updateData = () => {
  axios.put(`${import.meta.env.VITE_APP_API_URL}api/Course/?id=${id}`, {
      name: course,
      description: description,
      price: price,
      image: image,
      fkIdCategory: category,
      isActivated: active
  })
  .then(navigate('/admin-view/manage-course'))
}

  return (
    <div>
<Typography variant="h5">Update Course</Typography>
{category && 
    <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
        <TextField
                select
                sx={{width:'250px'}}
                label="Category"
                defaultValue={type}
                onChange={(e) => setCategory(e.target.value)}
            >
                {allCategory && allCategory.map((option) => (
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
            defaultValue = {course} 
            onChange={(e) => setCourse(e.target.value)} 
        />
        
        <Box sx={{mt:3}}>
            {image && (
                <Box>
                    <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${image}`}/>
                </Box>
            )}
            <TextField type="file" inputProps={{accept:"image/*"}} onChange={handleImageChange} />    
        </Box>
        <TextField 
            fullWidth 
            sx={{mt:3}} 
            type='number' 
            label = 'Price' 
            defaultValue = {price} 
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
                label="Status"
                defaultValue={active}
                helperText="Please select status this course"
                onChange={(e) => setActive(e.target.value)}
            >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
            </TextField>
        </Box>
            <Button sx={{ mt: 3, px: 4, borderRadius: 2 }} variant='contained' onClick={updateData}>Save</Button>
    </Box>}      
    </div>
  )
}

export default UpdateCourse