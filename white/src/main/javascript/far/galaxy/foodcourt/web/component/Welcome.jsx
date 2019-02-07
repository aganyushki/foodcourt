import React from "react";
import Button from "@material-ui/core/Button";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import CustomerLayout from "./CustomerLayout";

export const Welcome = () => {
    return (
        <div>
            <PrimarySearchAppBar/>

            <CustomerLayout />

            <Button variant="contained" color="primary">
                Hello World
            </Button>
        </div>
    );
};
