import React, {Component} from "react";
import {getSystemStore} from "../../store/SystemStore";
import {observer} from "mobx-react";
import Button from "@material-ui/core/Button";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

@observer
class LoginRootLayout extends Component {

    constructor(props) {
        super(props);

        this.loginRef = React.createRef();
        this.pwdRef = React.createRef();
    }

    doLogin() {
        getSystemStore().doLogin(
            this.loginRef.current.value,
            this.pwdRef.current.value
        )
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={24}
                >
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>

                            <div>
                                <TextField
                                    type="text"
                                    id="login"
                                    label="login"
                                    margin="normal"
                                    inputRef={this.loginRef}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="password"
                                    id="password"
                                    label="password"
                                    margin="normal"
                                    inputRef={this.pwdRef}
                                />
                            </div>

                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={this.doLogin.bind(this)}>login</Button>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

LoginRootLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginRootLayout);
