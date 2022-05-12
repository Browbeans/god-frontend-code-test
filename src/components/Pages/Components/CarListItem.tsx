import React, { FC } from "react";
import { CarModel } from "../../types/types";
import {
    Card,
    CardContent,
    Flex,
    Icon,
    Link,
    Spacer,
    TabNav,
    TabNavItem,
    Text,
} from "vcc-ui";

interface CarListItemProps {
    car: CarModel;
}

export const CarListItem: FC<CarListItemProps> = ({ car }) => (
    <div className="carContainer">
        <Text variant={"hillary"}>{car.bodyType.toUpperCase()}</Text>
        <Flex
            extend={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Text subStyle={"emphasis"} variant={"amundsen"}>
                {car.modelName}
            </Text>
            <Spacer />
            <Text subStyle={"inline-link"} variant={"bates"}>
                {car.modelType}
            </Text>
        </Flex>
        <div className="imageContainer">
            <img className="carImage" src={car.imageUrl} alt={car.modelName} />
        </div>
        <Spacer size={2} />
        <Flex
            extend={{
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            <Link href="#" arrow="right">
                LEARN
            </Link>
            <Spacer size={2} />
            <Link href="#" arrow="right">
                SHOP
            </Link>
        </Flex>
    </div>
);
