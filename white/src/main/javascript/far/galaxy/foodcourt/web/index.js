import React from "react";
import ReactDOM from "react-dom";
import {ApplicationRouter} from "./view/ApplicationRouter";
import 'typeface-roboto';
import './style.css';

ReactDOM.render(
    <ApplicationRouter />,
    document.getElementById("root-layout")
);
