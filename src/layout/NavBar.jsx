import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import customAxios from '../server/utils/customAxios.js';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Announcements', path: '/announcements' },
  { name: 'Teams', path: '/teams' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
  { name: 'Login', path: '/login' }
];

const Navbar = ({ children, navbarVisible, setNavbarVisible }) => {
  const { isAuth } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleNavigate = (path) => {
    if (path === '/') {
      setNavbarVisible(false);
    }
    navigate(path);
    setAnchorElNav(null);
  };

  const logout = async () => {
    await customAxios.get('/clear-session');
    window.location.reload();
  }

  return (
    <>
      {navbarVisible && (
        <AppBar position="fixed" style={{ width: '100%' }}>
          <Toolbar disableGutters style={{ width: '100%', margin: '0' }}>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={(e) => setAnchorElNav(e.currentTarget)}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={() => handleNavigate(page.path)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
              {pages.map((page) => (
                !(page.name === "Login" && isAuth) && (
                  <Button
                    key={page.name}
                    onClick={() => handleNavigate(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                )
              ))}
            </Box>
            {isAuth &&
              <h3 style={{ cursor: 'pointer' }} onClick={logout}>Logout</h3>
            }
          </Toolbar>
        </AppBar>
      )}
      <Toolbar />
      <div>
        {children}
      </div>
    </>
  );
};

export default Navbar;
