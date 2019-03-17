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

    doAction = () => {
        const {model, values, yes} = this.props;
        let newObject = {};
        model
            .filter(item => !item.disabled)
            .map(modelItem => {
                if (modelItem.hidden) {
                    newObject[modelItem.key] = values && values[modelItem.key];
                } else {
                    newObject[modelItem.key] = modelItem.ref.current.value;
                }
            });
        yes && yes(newObject, values);
    };

    render() {
        const {model, open, yesTitle, noTitle, no} = this.props;
        return (

            <div>
                {
                    open
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
                                    yesTitle
                                        ? <button onClick={this.doAction}>{yesTitle}</button>
                                        : null
                                }
                                {
                                    noTitle
                                        ? <button onClick={no}>{noTitle}</button>
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
