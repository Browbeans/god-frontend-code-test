import React, { FC, useEffect, useState } from "react";
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
import { getAllCars } from "../api/carApi";
import { CarBodyTypeEnum, CarModel } from "../types/types";
import { CarListItem } from "./Components/CarListItem";

const STARTING_PAGE = 1;
const PAGE_SIZE = 4;

export const CarList: FC = () => {
    const [allCars, setAllCars] = useState<CarModel[]>([]);
    const [isDesktopSize, setIsDesktopSize] = useState<boolean>();
    const [carBodyType, setCarBodyType] = useState<CarBodyTypeEnum>(
        CarBodyTypeEnum.ALL
    );
    const [currentPage, setCurrentPage] = useState(STARTING_PAGE);
    const [lastPage, setLastPage] = useState<number>(0);

    const getCars = async () => {
        const cars = await getAllCars();
        setLastPage(cars.length / PAGE_SIZE);
        const filteredCars = cars.filter((car) => car.bodyType === carBodyType);
        if (carBodyType === CarBodyTypeEnum.ALL) {
            setAllCars(cars);
        }
        if (carBodyType !== CarBodyTypeEnum.ALL) {
            setAllCars(filteredCars);
            return;
        }
    };

    useEffect(() => {
        getCars();
        const handleResize = () => {
            if (window && window.innerWidth > 1000) setIsDesktopSize(true);
            if (window && window.innerWidth < 1000) setIsDesktopSize(false);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [carBodyType, currentPage]);

    return (
        <div className="carSection">
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
                    padding: "1rem",
                    boxSizing: "border-box",
                    overflowX: "scroll",
                }}
            >
                {isDesktopSize
                    ? allCars
                          .slice(
                              (currentPage - 1) * PAGE_SIZE,
                              currentPage * PAGE_SIZE
                          )
                          .map((car) => <CarListItem car={car} />)
                    : allCars.map((car) => <CarListItem car={car} />)}
            </Flex>
            {allCars.length > PAGE_SIZE && isDesktopSize && (
                <div className="paginatorContainer">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === STARTING_PAGE}
                        className={"iconButton"}
                    >
                        <Icon
                            color={
                                currentPage === STARTING_PAGE
                                    ? "secondary"
                                    : "primary"
                            }
                            type="media-previous-48"
                        />
                    </button>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className={"iconButton"}
                    >
                        <Icon
                            color={
                                currentPage === lastPage
                                    ? "secondary"
                                    : "primary"
                            }
                            type={"media-next-48"}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};
