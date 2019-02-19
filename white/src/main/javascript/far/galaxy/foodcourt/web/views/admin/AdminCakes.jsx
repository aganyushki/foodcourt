import React, {Component} from "react";
import {observer} from "mobx-react";
import {getCakeStore} from "../../store/CakeStore";
import CakeFullView from "../component/CakeFullView";

@observer
export default class AdminCakes extends Component {

    componentDidMount() {
        getCakeStore().getCakes();
    }

    render() {

        const cakes = getCakeStore().cakes;

        return (
            <div>

                {
                    cakes === null
                        ? <i>processing</i>
                        : cakes.map(cake => <CakeFullView key={cake.getId()} cake={cake} />)
                }

            </div>
        )
    }
}
