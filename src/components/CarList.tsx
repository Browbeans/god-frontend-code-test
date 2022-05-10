import React, { FC, useEffect, useState } from "react";
import { Card, Flex, Link, Spacer, TabNav, TabNavItem, Text } from "vcc-ui";
import { getAllCars } from "./api/carApi";
import { CarBodyTypeEnum, CarModel } from "./types/types";

const STARTING_PAGE = 1;
const PAGE_SIZE = 4;

export const CarList: FC = () => {
    const [allCars, setAllCars] = useState<CarModel[]>([]);
    const [carBodyType, setCarBodyType] = useState<CarBodyTypeEnum>(
        CarBodyTypeEnum.ALL
    );
    const [currentPage, setCurrentPage] = useState(STARTING_PAGE);

    const getCars = async () => {
        console.log(carBodyType);

        const cars = await getAllCars();
        const filteredCars = cars.filter((car) => car.bodyType === carBodyType);
        if (carBodyType === CarBodyTypeEnum.ALL) setAllCars(cars);
        if (carBodyType !== CarBodyTypeEnum.ALL) {
            setAllCars(filteredCars);
            return;
        }
        if (cars.length > PAGE_SIZE) {
            setAllCars(
                cars.slice(
                    (currentPage - 1) * PAGE_SIZE,
                    currentPage * PAGE_SIZE
                )
            );
        }
    };

    useEffect(() => {
        getCars();
    }, [carBodyType, currentPage]);

    return (
        <>
            <TabNav>
                <TabNavItem onClick={() => setCarBodyType(CarBodyTypeEnum.ALL)}>
                    All
                </TabNavItem>
                <TabNavItem onClick={() => setCarBodyType(CarBodyTypeEnum.SUV)}>
                    SUV
                </TabNavItem>
                <TabNavItem
                    onClick={() => setCarBodyType(CarBodyTypeEnum.SEDAN)}
                >
                    Sedan
                </TabNavItem>
                <TabNavItem
                    onClick={() => setCarBodyType(CarBodyTypeEnum.ESTATE)}
                >
                    Estate
                </TabNavItem>
            </TabNav>
            <Flex
                extend={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    background: "white",
                    padding: "1rem",
                    boxSizing: "border-box",
                }}
            >
                {allCars?.map((car) => (
                    <div className="carContainer" key={car.id}>
                        <Card>
                            <Text variant={"bates"}>{car.bodyType}</Text>
                            <Flex
                                extend={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text subStyle={"emphasis"} variant={"hillary"}>
                                    {car.modelName}
                                </Text>
                                <Spacer />
                                <Text
                                    subStyle={"inline-link"}
                                    variant={"bates"}
                                >
                                    {car.modelType}
                                </Text>
                            </Flex>
                            <Spacer size={2} />
                            <img src={car.imageUrl} alt={car.modelName} />
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
                        </Card>
                    </div>
                ))}
            </Flex>
        </>
    );
};
