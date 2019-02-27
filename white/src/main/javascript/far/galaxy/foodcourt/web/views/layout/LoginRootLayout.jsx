import React, {Component} from "react";
import {getSystemStore} from "../../store/SystemStore";
import {observer} from "mobx-react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import LoginView from "../component/LoginView";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

@observer
class LoginRootLayout extends Component {
    render() {
        const {classes} = this.props;
        const user = getSystemStore().user;
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            WILEY, Korolev
                        </Typography>
                    </Toolbar>
                </AppBar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    {
                        user === null
                            ? <LoginView />
                            : <div>processing...</div>
                    }
                </main>
            </div>
        )
    }
}

LoginRootLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginRootLayout);
