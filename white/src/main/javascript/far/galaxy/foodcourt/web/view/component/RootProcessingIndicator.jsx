import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {RootProcessingIndicatorStyles} from './RootProcessingIndicatorStyle';
import {withStyles} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Text from "./Text";

class RootProcessingIndicator extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.processingWrapper}>
                <LinearProgress />
                <Typography variant="h6" color="textSecondary" className={classes.text}>
                    <Text>LOADING</Text>
                </Typography>
            </div>
        )
    }
}

export default withStyles(RootProcessingIndicatorStyles)(RootProcessingIndicator);
