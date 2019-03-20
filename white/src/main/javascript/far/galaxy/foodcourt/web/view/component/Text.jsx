import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";

@inject("systemStore")
@observer
export default class Text extends Component {
    static propTypes = {
        children: PropTypes.any,
        systemStore: PropTypes.object.isRequired
    };

    render() {
        return (
            this.props.systemStore.text[this.props.children]
        )
    }
}
