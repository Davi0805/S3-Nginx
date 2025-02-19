import React, { useContext } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useTheme, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../authContext";
import { useNavigate } from "react-router-dom";

import BadgeIcon from '@mui/icons-material/Badge';

import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';

import BusinessIcon from '@mui/icons-material/Business';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Drawer
      variant="temporary"
      open={!isCollapsed}
      onClose={onToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: '200px',
          boxSizing: 'border-box',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiListItem-root': {
            marginBottom: '10px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          },
          '& .MuiListItemIcon-root': {
            minWidth: '45px'
          },
          '& .MuiListItemText-primary': {
            fontSize: '0.9rem'
          }
        }
      }}
    >
      <List>
        <ListItem button onClick={onToggle}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
        </ListItem>
        <Divider sx={{m: "13px"}} />
        <ListItem button component={Link} onClick={onToggle} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider sx={{m: "13px"}} />
        <ListItem button component={Link} onClick={onToggle} to="/dashboard/relatorios">
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Empresa" />
        </ListItem>
        <ListItem button component={Link} onClick={onToggle} to="/dashboard/clientes">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>
        <ListItem button component={Link} onClick={onToggle} to="/dashboard/pedidos">
          <ListItemIcon>
            <DirectionsBoatFilledIcon />
          </ListItemIcon>
          <ListItemText primary="Cargas" />
        </ListItem>
        <Divider sx={{m: "13px"}} />
        <ListItem button component={Link} onClick={onToggle} to="/dashboard/funcionarios">
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText primary="Funcionarios" />
        </ListItem>
      </List>
      
      <List sx={{ marginTop: 'auto' }}>
        <Divider sx={{m: "13px"}} />
        <ListItem button component={Link} onClick={onToggle} to="/dashboard/profile">
          <ListItemIcon>
            <PersonOutlined />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
