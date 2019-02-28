import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {getCustomerStore} from "../../../store/CustomerStore";
import {observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

@observer
class AdminCustomersEditorView extends Component {
    constructor(props) {
        super(props);
        this.balanceRef = React.createRef();
    }
    doCancel(customer) {
        getCustomerStore().rollbackCustomer(customer);
        getCustomerStore().selectCustomer(null);
    }
    doUpdate(customer) {
        getCustomerStore().updateCustomer(customer);
    }
    doRefill(customer) {
        getCustomerStore().refill(customer, this.balanceRef.current.value || 0);
    }
    buildView(customer) {
        const {classes} = this.props;
        return (
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
                className={classes.root}
            >
                <Grid item>
                    <h3>Update</h3>
                    <TextField
                        id="outlined-name"
                        label="Name"
                        className={classes.textField}
                        value={customer.getName()}
                        onChange={event => customer.setName(event.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        id="outlined-name"
                        label="Email"
                        className={classes.textField}
                        value={customer.getEmail()}
                        onChange={event => customer.setEmail(event.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        id="outlined-name"
                        label="Balance"
                        className={classes.textField}
                        value={customer.getBalance()}
                        margin="normal"
                        variant="outlined"
                        disabled={true}
                    />
                    <br />
                    {
                        customer.isChanged()
                            ? (
                                <Button variant="contained" color="primary" className={classes.button}
                                        onClick={this.doUpdate.bind(this, customer)}>
                                    Save changes
                                </Button>
                            )
                            : null
                    }
                </Grid>
                <Grid item>
                    <h3>Пополнить</h3>
                    <TextField
                        id="outlined-name"
                        label="Balance"
                        className={classes.textField}
                        defaultValue={0}
                        margin="normal"
                        variant="outlined"
                        inputRef={this.balanceRef}
                    />
                    <br />
                    <Button variant="contained" className={classes.button} onClick={this.doRefill.bind(this, customer)}>
                        пополнить
                    </Button>
                </Grid>
                <Grid item>
                    <h3>Actions</h3>
                    <Button variant="contained" className={classes.button} onClick={this.doCancel.bind(this, customer)}>
                        cancel
                    </Button>
                </Grid>
            </Grid>
        )
    }
    render() {
        const selectedCustomer = getCustomerStore().selectedCustomer;
        return (
            selectedCustomer ? this.buildView(selectedCustomer) : null
        )
    }
}

AdminCustomersEditorView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminCustomersEditorView);
