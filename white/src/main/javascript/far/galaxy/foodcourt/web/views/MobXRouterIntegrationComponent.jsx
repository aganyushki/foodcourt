import React, {Component} from "react";
import {observer} from "mobx-react";
import {getWorkflow} from "../store/Workflow";

@observer
export default class MobXRouterIntegrationComponent extends Component {
    render() {
        const newPath = getWorkflow().getRouterPath();

        // todo, react-dom.development.js:506 Warning: Cannot update during an existing state transition
        //  (such as within `render`). Render methods should be a pure function of props and state.
        // quick fix with setTimeout
        setTimeout(() => {
            if (this.props.location.pathname !== newPath) {
                console.log(newPath);
                this.props.history && this.props.history.push(newPath);
            }
        }, 0);

        return null;
    }
};
