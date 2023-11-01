import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div>
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FFFF',
      }}
    >
      <Typography variant="h1" style={{ color: 'grey' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'grey' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button onClick={() => navigate('/')} variant="contained">Back Home</Button>
    </Box>
    </div>
  )
}

export default PageNotFound