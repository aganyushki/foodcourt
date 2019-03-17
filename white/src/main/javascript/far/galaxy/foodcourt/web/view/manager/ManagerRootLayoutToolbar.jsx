import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";

import {APPLICATION_TYTLE, URL} from '../../Constants';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AdminCustomersMainToolbarView from "./activity/customer/AdminCustomersMainToolbarView";
import {inject, observer} from "mobx-react";
import {ManagerRootLayoutStyles} from "./Style";
import LinearProgress from "@material-ui/core/LinearProgress";

@inject("systemStore")
@observer
class ManagerRootLayoutToolbar extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        systemStore: PropTypes.object.isRequired
    };

    render() {
        const {classes, systemStore} = this.props;
        return (
            <AppBar position="fixed" className={classes.appBar}>
                { // todo, progress style is not best decision yet
                    systemStore.globalProcessingStatus
                        ? <LinearProgress color="secondary" />
                        : <LinearProgress color="primary" variant="determinate" value={100} />
                }
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        {APPLICATION_TYTLE}
                    </Typography>

                    <div className={classes.grow} />

                    <Switch>
                        <Route path={URL.ADMIN_CUSTOMERS} component={AdminCustomersMainToolbarView} />
                    </Switch>

                    <Button color="inherit" onClick={systemStore.doLogout}>logout</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(ManagerRootLayoutStyles)(ManagerRootLayoutToolbar);
