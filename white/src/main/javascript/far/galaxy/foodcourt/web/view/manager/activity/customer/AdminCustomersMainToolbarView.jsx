import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const styles = theme => ({
    root: {
        display: 'flex'
    },
});

class AdminCustomersMainToolbarView extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <IconButton color="inherit"><PersonAddIcon /></IconButton>
            </div>
        )
    }
}

export default withStyles(styles)(AdminCustomersMainToolbarView);
