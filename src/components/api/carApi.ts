import { CarModel } from "../types/types";

export const getAllCars = (): Promise<CarModel[]> =>
    fetch("/api/cars.json")
        .then((response) => response.json())
        .catch();
