import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {ManagerCakesEditorStyles} from "./Style";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ManagerEntityEditorCtrl from "../../../component/ManagerEntityEditorCtrl";
import Text from "../../../component/Text";

@inject("cakeStore")
@observer
class ManagerCakesEditor extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        cakeStore: PropTypes.object.isRequired,
    };

    doUpdate = () => {
        this.props.cakeStore.saveCake(this.props.cakeStore.selectedCake);
    };
    doCancel = () => {
        this.props.cakeStore.selectCake(null);
    };

    buildCtrls = (cake, classes) => {
        return cake ? (
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
                className={classes.root}
            >
                <Grid item>
                    {cake.getId() ? <h3><Text>EDITOR_TITLE_UPDATE</Text></h3> : <h3><Text>EDITOR_TITLE_CREATE</Text></h3>}
                    <TextField
                        id="outlined-name"
                        label={<Text>EDITOR_CAKE_NAME</Text>}
                        className={classes.textField}
                        value={cake.getName()}
                        onChange={event => cake.setName(event.target.value)}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                    <br />
                    <TextField
                        id="outlined-name"
                        label={<Text>EDITOR_CAKE_EMAIL</Text>}
                        className={classes.textField}
                        value={cake.getPrice()}
                        onChange={event => cake.setPrice(event.target.value)}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                    <br />
                    {
                        cake.isChanged()
                            ? (
                                <Button variant="contained" color="primary" className={classes.button}
                                        onClick={this.doUpdate}>
                                    <Text>EDITOR_ACTION_SAVE</Text>
                                </Button>
                            )
                            : null
                    }
                </Grid>
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
        const {cakeStore, classes} = this.props;
        const cake = cakeStore.selectedCake;
        return (
            <ManagerEntityEditorCtrl open={cake !== null}>
                <div className={classes.editorContent}>{this.buildCtrls(cake, classes)}</div>
            </ManagerEntityEditorCtrl>
        )
    }
}

export default withStyles(ManagerCakesEditorStyles)(ManagerCakesEditor);
