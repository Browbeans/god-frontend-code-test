import React, { FC } from "react";
import { Icon } from "vcc-ui";

interface PaginatorProps {
    startPage: number;
    lastPage: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
}

export const Paginator: FC<PaginatorProps> = ({
    startPage,
    setCurrentPage,
    lastPage,
    currentPage,
}) => (
    <div className="paginatorContainer">
        <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === startPage}
            className={"iconButton"}
        >
            <Icon
                color={currentPage === startPage ? "secondary" : "primary"}
                type="media-previous-48"
            />
        </button>
        <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === lastPage}
            className={"iconButton"}
        >
            <Icon
                color={currentPage === lastPage ? "secondary" : "primary"}
                type={"media-next-48"}
            />
        </button>
    </div>
);
