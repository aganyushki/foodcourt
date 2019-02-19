import React from "react";
import ReactDOM from "react-dom";
import 'typeface-roboto';

import './style.css';

import {RootUIComponent} from "./views/RootUIComponent";
import {getWorkflow} from "./store/Workflow";

let workflow = getWorkflow();

ReactDOM.render(
    <RootUIComponent />,
    document.getElementById("root-layout")
);
