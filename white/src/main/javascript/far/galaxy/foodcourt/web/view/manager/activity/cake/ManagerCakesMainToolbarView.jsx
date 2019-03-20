import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import {ManagerCakesMainToolbarViewStyles} from "./Style";
import {inject, observer} from "mobx-react";

@inject("cakeStore")
@observer
class ManagerCakesMainToolbarView extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        cakeStore: PropTypes.object.isRequired,
    };

    render() {
        const {classes, cakeStore} = this.props;
        return (
            <div className={classes.root}>
                <IconButton color="inherit" onClick={cakeStore.addNewCake}><AddIcon /></IconButton>
            </div>
        )
    }
}

export default withStyles(ManagerCakesMainToolbarViewStyles)(ManagerCakesMainToolbarView);
