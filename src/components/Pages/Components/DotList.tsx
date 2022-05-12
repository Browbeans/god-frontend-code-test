import React, { FC, useEffect, useState } from "react";

interface DotListProps {
    initialDot: number;
    totalDots: number;
    onClick: (activeDot: number) => void;
}

export const DotList: FC<DotListProps> = ({
    initialDot,
    totalDots,
    onClick,
}) => {
    const [currentDot, setCurrentDot] = useState(initialDot);
    var dottedArray: Number[] = [];
    for (let i = 0; totalDots > i; i++) {
        dottedArray.push(i);
    }

    useEffect(() => {
        setCurrentDot(initialDot);
    }, [initialDot]);

    return (
        <ul className="dotList">
            {dottedArray.map((_, index) => (
                <li
                    onClick={() => {
                        onClick(index);
                        setCurrentDot(index);
                    }}
                    key={index}
                    className={index === currentDot ? "dot active" : "dot"}
                ></li>
            ))}
        </ul>
    );
};
