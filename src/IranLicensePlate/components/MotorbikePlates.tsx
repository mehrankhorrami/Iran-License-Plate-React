import React, {CSSProperties, HTMLAttributes, useEffect, useRef, useState} from "react";
import flag from "../../assets/iran-flag.svg";
import iranText from "../../assets/iran-text.svg";
import {CarPlateDataType, MotorbikePlatesDataType} from "../../utils/types.ts";
import {letterMapping, toPlateObject, toSerial} from "../../helper/helper.tsx";


interface MotorbikeProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    style?: CSSProperties
}

export const MotorbikePlates: React.FC<MotorbikeProps> = ({
                                                 value = "",
                                                 className = "",
                                                 style = {},
                                                 onChange = (value: string) => undefined
                                             }) => {
    const initObj:MotorbikePlatesDataType = {
        section1: '',
        section2: ''
    };

    const [formData, setFormData] = useState<MotorbikePlatesDataType>({...initObj});

    useEffect(() => {
        if (value) {
            const obj: MotorbikePlatesDataType = toPlateObject(value) ?? initObj;
            setFormData(obj);
        }
    }, [value]);

    const section1Ref = useRef(null);
    const section2Ref = useRef(null);

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
        <div className={"motorbike-plate-wrapper" + className} style={style}>
            <div className="top-plate-wrapper">
                <div className="plate-flag-wrapper">
                    <img src={flag} alt="flag"/>
                    <div className="iran-text">
                        <span>I.R.</span>
                        <span>IRAN</span>
                    </div>
                </div>
                <div className="section1-wrapper">
                    <input
                        name="section1"
                        type="text"
                        maxLength={3}
                        minLength={3}
                        value={formData.section1}
                        onChange={handleChange}
                        ref={section1Ref}
                    />
                </div>
            </div>

            <div className="bottom-plate-wrapper">
                <input
                    name="section2"
                    type="text"
                    maxLength={5}
                    minLength={5}
                    value={formData.section2}
                    onChange={handleChange}
                    ref={section2Ref}
                />
            </div>
        </div>
    );
};
