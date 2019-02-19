import React, {Component} from "react";

export default class EditItemDialog extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.model) {
            nextProps.model
                .filter(item => !item.hidden)
                .forEach(modelItem => {
                    modelItem.ref = React.createRef();

                    const values = nextProps.values || {};
                    modelItem.value = values[modelItem.key] || "";
                });
        }
    }

    doAction() {
        let newObject = {};
        this.props.model
            .filter(item => !item.disabled)
            .map(modelItem => {
                if (modelItem.hidden) {
                    newObject[modelItem.key] = this.props.values && this.props.values[modelItem.key];
                } else {
                    newObject[modelItem.key] = modelItem.ref.current.value;
                }
            });
        this.props.yes && this.props.yes(newObject, this.props.values);
    }

    render() {
        const {model} = this.props;

        return (

            <div>
                {
                    this.props.open
                        ?
                            <div>
                                {
                                    model
                                        .filter(item => !item.hidden)
                                        .map(entry => (
                                            <div key={entry.key}>
                                                <span>{entry.title}</span>
                                                <input type="text" ref={entry.ref} disabled={entry.disabled} defaultValue={entry.value} />
                                            </div>
                                        ))
                                }
                                {
                                    this.props.yesTitle
                                        ? <button onClick={this.doAction.bind(this)}>{this.props.yesTitle}</button>
                                        : null
                                }
                                {
                                    this.props.noTitle
                                        ? <button onClick={this.props.no}>{this.props.noTitle}</button>
                                        : null
                                }
                            </div>
                        : null
                }
            </div>
        )
    }
}

// todo, add props definition for all react components
