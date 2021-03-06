import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import Button from "@material-ui/core/Button";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {LoginFormStyles} from "./Style";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Text from "../component/Text";

@inject("systemStore")
@observer
class LoginForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        systemStore: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.loginRef = React.createRef();
        this.pwdRef = React.createRef();
        this.state = {
            processing: false
        };
    }
    doLogin = () => {
        this.setState({processing: true}, () => {
            this.props.systemStore.doLogin(
                this.loginRef.current.value,
                this.pwdRef.current.value
            )
                .then(user => {
                    if (!user) {
                        this.loginRef.current.value = "";
                        this.pwdRef.current.value = "";
                        this.setState({processing: false})
                    }
                })
        });
    };
    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper}>
                <Typography variant="h4"><Text>LOGIN_FORM_TITLE</Text></Typography>
                <div className={classes.ctrlWrapper}>
                    <div>
                        <TextField
                            type="text"
                            id="login"
                            label={<Text>LOGIN_FORM_FIELD_LOGIN</Text>}
                            margin="normal"
                            fullWidth
                            inputRef={this.loginRef}
                            disabled={this.state.processing}
                        />
                    </div>
                    <div>
                        <TextField
                            type="password"
                            id="password"
                            label={<Text>LOGIN_FORM_FIELD_PWD</Text>}
                            margin="normal"
                            fullWidth
                            inputRef={this.pwdRef}
                            disabled={this.state.processing}
                        />
                    </div>
                </div>
                <div className={classes.actionCtrlWrapper}>
                    <Button variant="outlined" color="primary" size="medium"
                            className={classes.actionButton}
                            disabled={this.state.processing}
                            onClick={this.doLogin}
                    >
                        {<Text>LOGIN_FORM_ACTION_LOGIN</Text>}
                        {
                            this.state.processing
                                ? <CircularProgress size={24} className={classes.buttonProgress} />
                                : null
                        }
                    </Button>
                </div>
            </Paper>
        )
    }
}

export default withStyles(LoginFormStyles)(LoginForm);
