import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useAuth from '../../Hooks/useAuth';

const drawerWidth = 240;

const red = createTheme({
    palette: {
        primary: {
            main: '#790B0A'
        },
    },
  });

const DashboardAdmin = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = ()=>{
      logout()
      navigate('/')
}

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

      const drawer = (
        <div>
          <Toolbar>
            <IconButton size='large' edge='start' aria-label='logo'>
              <img src='/iconotomobil.png' height={'40px'} alt='logo'/>
            </IconButton>
            <span style={{fontSize: '20px', fontWeight: '400'}}>Otomobil</span>  
          </Toolbar>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/admin-view')}>
                <ListItemIcon>
                  <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary={'Users'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('manage-category')}>
                <ListItemIcon>
                  <CategoryIcon/>
                </ListItemIcon>
                <ListItemText primary={'Category'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('manage-course')}>
                <ListItemIcon>
                  <DirectionsCarIcon/>
                </ListItemIcon>
                <ListItemText primary={'Course'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('manage-payment')}>
                <ListItemIcon>
                  <PaymentsIcon/>
                </ListItemIcon>
                <ListItemText primary={'Payment Methods'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('manage-invoice')}>
                <ListItemIcon>
                  <ReceiptIcon/>
                </ListItemIcon>
                <ListItemText primary={'Invoice'} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <ThemeProvider theme={red}>
            <Button onClick={handleLogout} sx={{ mt: 4, ml:6, px: 4, borderRadius: 2 }} variant='contained'>Logout</Button>
          </ThemeProvider>
        </div>
      );

      const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{backgroundColor:'#FFFF'}}>
          <IconButton
            color="default"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color='#790B0A' variant="h6" noWrap component="div">
            Dashboard Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { xs: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
  )
}

export default DashboardAdmin