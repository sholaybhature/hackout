import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom'

import { ReactComponent as HomeIcon } from '../svg/home-24px.svg';
import { ReactComponent as MapIcon } from '../svg/explore-24px.svg';
import { ReactComponent as AboutIcon } from '../svg/help-24px.svg';

import '../App.css'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '55px',
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        {/* <Divider /> */}
        <div className = 'pad'></div>
        <List>
          <Link to = "/" className = 'list-buttonlink'>
            <ListItem button key='Home' className = 'list-button'>
              <ListItemIcon><HomeIcon className = "svg_icons"/></ListItemIcon>
              <ListItemText primary='Home' className = 'list-text' />
            </ListItem>
          </Link>
          <Link to = "/map" className = 'list-buttonlink'>
            <ListItem button key='Map' className = 'list-button'>
              <ListItemIcon><MapIcon className = "svg_icons"/></ListItemIcon>
              <ListItemText primary='Map' className = 'list-text' />
            </ListItem>
          </Link>
          <Link to = "/about" className = 'list-buttonlink'>
            <ListItem button key='About' className = 'list-button'>
              <ListItemIcon><AboutIcon className = "svg_icons"/></ListItemIcon>
              <ListItemText primary='About' className = 'list-text' />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}