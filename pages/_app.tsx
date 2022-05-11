import { HelloWorld } from "../src/components/HelloWorld";
import "../public/css/styles.css";
import React from "react";
import { CarList } from "../src/components/Pages/CarList";
import { StyleProvider, ThemePicker } from "vcc-ui";

function HomePage() {
    return (
        <React.StrictMode>
            <StyleProvider>
                <ThemePicker variant={"light"}>
                    <CarList />
                </ThemePicker>
            </StyleProvider>
        </React.StrictMode>
    );
}

export default HomePage;
