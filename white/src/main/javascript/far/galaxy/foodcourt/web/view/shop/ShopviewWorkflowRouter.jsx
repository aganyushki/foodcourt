import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

@inject("shopviewWorkflow")
@observer
export default class ShopviewWorkflowRouter extends Component {
    static propTypes = {
        shopviewWorkflow: PropTypes.object.isRequired
    };

    render() {
        const {shopviewWorkflow, location} = this.props;
        const newPath = shopviewWorkflow.routerPath;
        return (location.pathname !== newPath)
            ? <Redirect to={newPath} />
            : null
    }
}
