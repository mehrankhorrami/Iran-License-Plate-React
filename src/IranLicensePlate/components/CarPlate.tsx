import {HTMLAttributes} from "react";
import flag from "../../assets/iran-flag.svg";
import iranText from "../../assets/iran-text.svg";

interface CarProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    onChange: (value: string) => void
}

export const CarPlate = (
    {
        value = "",
        className = "",
        style = {},
        onChange = (value: string) => undefined
    }: CarProps
) => {
    return (
        <div className={"car-plate-wrapper" + className} style={style}>
            <div className="plate-flag-wrapper">
                <img src={flag} alt="flag"/>
                <div className="iran-text">
                    <span>I.R.</span>
                    <span>IRAN</span>
                </div>
            </div>
            <div className="plate-main-section"></div>
            <div className="plate-separator"></div>
            <div className="plate-region-section">
                <img src={iranText} alt="Iran"/>
            </div>
        </div>
    );
}