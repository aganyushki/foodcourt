import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import LoginForm from "./LoginForm";
import {LoginRootLayoutStyles} from "./Style";
import RootProcessingIndicator from "../component/RootProcessingIndicator";
import GlobalNotificationCtrl from "../component/GlobalNotificationCtrl";

@inject("systemStore")
@observer
class LoginRootLayout extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        systemStore: PropTypes.object.isRequired
    };

    render() {
        const {classes, systemStore} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {
                        systemStore.user === null
                            ? <LoginForm />
                            : <RootProcessingIndicator />
                    }
                    <GlobalNotificationCtrl />
                </main>
            </div>
        )
    }
}

export default withStyles(LoginRootLayoutStyles)(LoginRootLayout);
