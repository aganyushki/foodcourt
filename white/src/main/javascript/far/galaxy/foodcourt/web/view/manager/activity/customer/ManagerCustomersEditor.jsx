import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {ManagerCustomersEditorStyles} from "./Style";
import ManagerEntityEditorCtrl from "../../../component/ManagerEntityEditorCtrl";
import Text from "../../../component/Text";

@inject("customerStore")
@observer
class ManagerCustomersEditor extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        customerStore: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.balanceRef = React.createRef();
    }

    doUpdate = () => {
        this.props.customerStore.saveCustomer(this.props.customerStore.selectedCustomer);
    };
    doCancel = () => {
        this.props.customerStore.selectCustomer(null);
    };
    _doRefill = value => {
        this.props.customerStore.refill(
            this.props.customerStore.selectedCustomer,
            value
        );
    };
    doRefill = () => {
        this._doRefill(this.balanceRef.current.value || 0);
    };
    doRefill1000 = () => {
        this._doRefill(1000);
    };

    buildCtrls = (customer, classes) => {
        return customer ? (
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
            >
                <Grid item>
                    {customer.getId() ? <h3><Text>EDITOR_TITLE_UPDATE</Text></h3> : <h3><Text>EDITOR_TITLE_CREATE</Text></h3>}
                    <TextField
                        id="outlined-name"
                        label={<Text>EDITOR_CUSTOMER_NAME</Text>}
                        className={classes.textField}
                        value={customer.getName()}
                        onChange={event => customer.setName(event.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        id="outlined-name"
                        label={<Text>EDITOR_CUSTOMER_EMAIL</Text>}
                        className={classes.textField}
                        value={customer.getEmail()}
                        onChange={event => customer.setEmail(event.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        id="outlined-name"
                        label={<Text>EDITOR_CUSTOMER_BALANCE</Text>}
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
                                        onClick={this.doUpdate}>
                                    <Text>EDITOR_ACTION_SAVE</Text>
                                </Button>
                            )
                            : null
                    }
                </Grid>
                {
                    customer.getId() ? (
                        <Grid item>
                            <h3><Text>EDITOR_CUSTOMER_ACTION_REFILL</Text></h3>
                            <TextField
                                id="outlined-name"
                                label={<Text>EDITOR_CUSTOMER_BALANCE</Text>}
                                className={classes.textField}
                                defaultValue={0}
                                margin="normal"
                                variant="outlined"
                                inputRef={this.balanceRef}
                            />
                            <br />
                            <Button variant="contained" className={classes.button} onClick={this.doRefill}>
                                <Text>EDITOR_CUSTOMER_ACTION_REFILL</Text>
                            </Button>
                            <br /><br />
                            <Button variant="contained" className={classes.button} onClick={this.doRefill1000}>
                                <Text>EDITOR_CUSTOMER_ACTION_REFILL_1000</Text>
                            </Button>
                        </Grid>
                    ) : null
                }
                <Grid item>
                    <h3><Text>EDITOR_TITLE_ACTIONS</Text></h3>
                    <Button variant="contained" className={classes.button} onClick={this.doCancel}>
                        <Text>EDITOR_ACTION_CANCEL</Text>
                    </Button>
                </Grid>
            </Grid>
        ) : null
    };

    render() {
        const {customerStore, classes} = this.props;
        const customer = customerStore.selectedCustomer;
        return (
            <ManagerEntityEditorCtrl open={customer !== null}>
                <div className={classes.editorContent}>{this.buildCtrls(customer, classes)}</div>
            </ManagerEntityEditorCtrl>
        )
    }
}

export default withStyles(ManagerCustomersEditorStyles)(ManagerCustomersEditor);
