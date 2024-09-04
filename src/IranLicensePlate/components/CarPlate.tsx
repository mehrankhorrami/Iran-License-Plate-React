import React, {HTMLAttributes, useEffect, useRef, useState} from "react";
import flag from "../../assets/iran-flag.svg";
import iranText from "../../assets/iran-text.svg";
import {CarPlateDataType} from "../../utils/types.ts";
import {letterMapping, toPlateObject, toSerial} from "../../helper/helper.tsx";


interface CarProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    onChange: (value: string) => void;
}

export const CarPlate: React.FC<CarProps> = ({
                                                 value = "",
                                                 className = "",
                                                 style = {},
                                                 onChange = (value: string) => undefined
                                             }) => {
    const initObj = {
        section1: '',
        letter: '',
        section2: '',
        region: 'IR',
        cityNo: ''
    };

    const [formData, setFormData] = useState<CarPlateDataType>({...initObj});

    useEffect(() => {
        if (value) {
            const obj: CarPlateDataType = toPlateObject(value) ?? initObj;
            setFormData(obj);
        }
    }, [value]);

    const section1Ref = useRef(null);
    const letterRef = useRef(null);
    const section2Ref = useRef(null);
    const cityRef = useRef(null);

    // Handle change function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        const _data = {
            ...formData,
            [name]: value
        } as CarPlateDataType;

        onChange(toSerial(_data));

        setFormData(_data);
    };

    return (
        <div className={"car-plate-wrapper" + className} style={style}>
            <div className="plate-flag-wrapper">
                <img src={flag} alt="flag"/>
                <div className="iran-text">
                    <span>I.R.</span>
                    <span>IRAN</span>
                </div>
            </div>
            <div className="plate-main-section">
                <input
                    name="section1"
                    type="text"
                    maxLength={2}
                    minLength={2}
                    value={formData.section1}
                    onChange={handleChange}
                    ref={section1Ref}
                />
                <select
                    name="letter"
                    value={formData.letter}
                    onChange={handleChange}
                    ref={letterRef}
                >
                    {
                        Object.keys(letterMapping).map(key => (
                            <option key={key} value={key}>{letterMapping[key]}</option>
                        ))
                    }
                </select>
                <input
                    name="section2"
                    type="text"
                    maxLength={3}
                    minLength={3}
                    value={formData.section2}
                    onChange={handleChange}
                    ref={section2Ref}
                />
            </div>
            <div className="plate-separator"></div>
            <div className="plate-region-section">
                <img src={iranText} alt="Iran"/>
                <input
                    name="region"
                    type="text"
                    maxLength={2}
                    minLength={2}
                    value={formData.cityNo}
                    onChange={handleChange}
                    ref={cityRef}
                />
            </div>
        </div>
    );
};
