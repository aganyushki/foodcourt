import React, {Component} from "react";
import {getOrderStore} from "../../store/OrderStore";
import {observer} from "mobx-react";
import Cake from "../component/Cake";
import {getCakeStore} from "../../store/CakeStore";

@observer
export default class ShopCakes extends Component {

    doSelect(cake) {
        getOrderStore().setCake(cake);
    }

    showProcessing() {
        return <i>pricessing</i>
    }

    showCakes(cakes) {
        return cakes.map(cake =>
            <Cake key={cake.getId()} cake={cake} onClick={this.doSelect.bind(this, cake)}
        />)
    }

    render() {
        const cakes = getCakeStore().cakes;
        return (
            <div>
                {
                    cakes === null
                        ? this.showProcessing()
                        : this.showCakes(cakes)
                }
            </div>
        )
    }
}
