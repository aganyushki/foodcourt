import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import CakeFullView from "../../../component/CakeFullView";
import EditItemDialog from "../../../component/EditItemDialog";
import ConfirmDialog from "../../../component/ConfirmDialog";
import Cake from "../../../../entity/Cake";
import PropTypes from "prop-types";

const NEW_CAKE_MODEL = [
    {key: "name", title: "name"},
    {key: "price", title: "price"},
];

const UPDATE_CAKE_MODEL = [
    {key: "id", hidden: true},
    {key: "name", title: "name"},
    {key: "price", title: "price"},
];

class Row extends Component {
    render() {
        const {cake, doUpdate, doRemove} = this.props;

        return (
            <div style={{padding: 10}}>
                <CakeFullView cake={cake} />
                <button onClick={doUpdate}>update</button>
                <button onClick={doRemove}>remove</button>
            </div>
        )
    }
}

@inject("cakeStore")
@observer
export default class AdminCakes extends Component {
    static propTypes = {
        cakeStore: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            dialogAddNew: false,
            dialogAddNewModel: undefined,
            dialogRemove: false,
            dialogRemoveValue: undefined,
            dialogUpdate: false,
            dialogUpdateModel: undefined,
            dialogUpdateValue: undefined,
            filterValue: "",
        }
    }

    componentDidMount() {
        this.reloadData();
    }

    reloadData = () => {
        this.props.cakeStore.getCakes();
    };

    doFilter = (event) => {
        this.setState({
            filterValue: event.target.value
        });
    };

    showAddNew = () => {
        this.setState({
            dialogAddNew: true,
            dialogAddNewModel: NEW_CAKE_MODEL
        })
    };
    closeAddNew = () => {
        this.setState({dialogAddNew: false})
    };
    doAddNew = (newCakeTemplate) => {
        this.setState({dialogAddNew: false}, () => {
            this.props.cakeStore.putNewCake(newCakeTemplate);
        })
    };

    showUpdate = (customer) => {
        this.setState({
            dialogUpdate: true,
            dialogUpdateModel: UPDATE_CAKE_MODEL,
            dialogUpdateValue: customer.value
        })
    };
    closeUpdate = () => {
        this.setState({dialogUpdate: false})
    };
    doUpdate = (changes, cakeValueObject) => {
        this.setState({dialogUpdate: false}, () => {
            this.props.cakeStore.updateCake(new Cake(cakeValueObject), changes);
        })
    };

    showRemove = (dialogRemoveValue) => {
        this.setState({
            dialogRemove: true,
            dialogRemoveValue
        })
    };
    closeRemove = () => {
        this.setState({dialogRemove: false})
    };
    doRemove = (cake) => {
        this.setState({dialogRemove: false}, () => {
            this.props.cakeStore.removeCake(cake);
        })
    };

    render() {
        const {cakeStore} = this.props;
        return (
            <div>

                <button onClick={this.reloadData}>refresh</button>
                <button onClick={this.showAddNew}>add new</button>
                <input type="text" value={this.state.filterValue} onChange={this.doFilter} />

                {
                    cakeStore.cakes === null
                        ? <i>processing</i>
                        : cakeStore.cakes
                            .filter(cake => cake.getName().indexOf(this.state.filterValue) > -1)
                            .map(cake =>
                                <Row key={cake.getId()} cake={cake}
                                     doUpdate={this.showUpdate.bind(this, cake)}
                                     doRemove={this.showRemove.bind(this, cake)}
                                />
                            )
                }

                <EditItemDialog
                    open={this.state.dialogAddNew}
                    yesTitle="add"
                    noTitle="cancel"
                    model={this.state.dialogAddNewModel}
                    yes={this.doAddNew}
                    no={this.closeAddNew}
                />
                <ConfirmDialog
                    open={this.state.dialogRemove}
                    yes={this.doRemove}
                    no={this.closeRemove}
                    value={this.state.dialogRemoveValue}
                />
                <EditItemDialog
                    open={this.state.dialogUpdate}
                    yesTitle="update"
                    noTitle="back"
                    model={this.state.dialogUpdateModel}
                    yes={this.doUpdate}
                    no={this.closeUpdate}
                    values={this.state.dialogUpdateValue}
                />
            </div>
        )
    }
}
