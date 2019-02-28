import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import {fade} from '@material-ui/core/styles/colorManipulator';
import RefreshIcon from '@material-ui/icons/Refresh';
import ClearIcon from '@material-ui/icons/Clear';
import {getCustomerStore} from "../../../store/CustomerStore";

const styles = theme => ({
    root: {
        display: 'flex'
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
});

class AdminCustomersSearchToolbarView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterValue: "",
        }
    }
    reloadData() {
        getCustomerStore().getCustomers();
    }
    doFilter(event) {
        const value = event.target.value;
        this.setState(
            {filterValue: value},
            () => getCustomerStore().setFilter(value)
        );
    }
    clearFilter() {
        const value = "";
        this.setState(
            {filterValue: value},
            () => getCustomerStore().setFilter(value)
        );
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        value={this.state.filterValue}
                        onChange={this.doFilter.bind(this)}
                    />
                </div>
                <IconButton color="inherit" onClick={this.reloadData.bind(this)}><RefreshIcon /></IconButton>
                <IconButton color="inherit" onClick={this.clearFilter.bind(this)}><ClearIcon /></IconButton>
            </div>
        )
    }
}

AdminCustomersSearchToolbarView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminCustomersSearchToolbarView);
