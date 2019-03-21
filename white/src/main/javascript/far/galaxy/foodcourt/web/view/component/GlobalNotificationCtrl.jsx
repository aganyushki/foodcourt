import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

@inject("systemStore")
@observer
export default class GlobalNotificationCtrl extends Component {
    static propTypes = {
        systemStore: PropTypes.object.isRequired
    };

    render() {
        const {systemStore} = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={systemStore.globalErrorNotification !== null}
                    onClose={systemStore.clearGlobalErrorNotification}
                    ContentProps={{
                        'aria-describedby': 'login-error-message',
                    }}
                    message={<span id="login-error-message">{systemStore.globalErrorNotification}</span>}
                />
            </div>
        )
    }
}