import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {ManagerCustomersMainToolbarViewStyles} from "./Style";
import {inject, observer} from "mobx-react";

@inject("customerStore")
@observer
class ManagerCustomersMainToolbarView extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        customerStore: PropTypes.object.isRequired,
    };

    render() {
        const {classes, customerStore} = this.props;
        return (
            <div className={classes.root}>
                <IconButton color="inherit" onClick={customerStore.addNewCustomer}><PersonAddIcon /></IconButton>
            </div>
        )
    }
}

export default withStyles(ManagerCustomersMainToolbarViewStyles)(ManagerCustomersMainToolbarView);
