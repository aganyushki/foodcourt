import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Cake from '@material-ui/icons/Cake';
import Add from '@material-ui/icons/Add';
import CakeListView from "./CakeListView";
import Fab from "@material-ui/core/Fab";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    menuBorder: {
        boxShadow: 'none'
    }
});

function ClippedDrawer(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        WILEY, Korolev
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <ListItem button selected={true}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={"order history"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><Cake /></ListItemIcon>
                        <ListItemText primary={"cakes"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={"customers"} />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />

                <CakeListView/>

            </main>

            <Fab color="primary" aria-label="Add" className={classes.fab}>
                <Add />
            </Fab>
        </div>
    );
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);