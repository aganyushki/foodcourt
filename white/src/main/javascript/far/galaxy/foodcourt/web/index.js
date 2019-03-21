import React from "react";
import ReactDOM from "react-dom";
import {ApplicationRouter} from "./view/ApplicationRouter";
import 'typeface-roboto';
import './style.css';
import LogRocket from "logrocket";
import setupLogRocketReact from 'logrocket-react';

import {LOG_ROCKET_KEY} from "./Constants";
LogRocket.init(LOG_ROCKET_KEY);
setupLogRocketReact(LogRocket);

ReactDOM.render(
    <ApplicationRouter />,
    document.getElementById("root-layout")
);
