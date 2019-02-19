import React, {Component} from "react";
import CustomerGroup from "../component/CustomerGroup";
import {observer} from "mobx-react";
import {getCustomerStore} from "../../store/CustomerStore";
import {getOrderStore} from "../../store/OrderStore";

@observer
export default class ShopGroups extends Component {

    doSelect(group) {
        getOrderStore().setGroup(group);
    }

    showProcessing() {
        return <i>pricessing</i>
    }

    showGroups(groups) {
        return groups.map(group =>
            <CustomerGroup key={group.getId()} group={group} onClick={this.doSelect.bind(this, group)}
        />)
    }

    render() {
        const groups = getCustomerStore().groups;
        return (
            <div>
                {
                    groups === null
                        ? this.showProcessing()
                        : this.showGroups(groups)
                }
            </div>
        )
    }
}
