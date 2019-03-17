import React from "react";
import ReactDOM from "react-dom";
import {ApplicationRouter} from "./view/ApplicationRouter";
import {StoreProvider} from "./store/StoreProvider";
import 'typeface-roboto';
import './style.css';

ReactDOM.render(
    <StoreProvider>
        <ApplicationRouter />
    </StoreProvider>,
    document.getElementById("root-layout")
);
