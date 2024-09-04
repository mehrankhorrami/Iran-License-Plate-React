import {CSSProperties} from "react";
import {CarPlate} from "./components/CarPlate.tsx";
import "../styles/styles.scss";
import {MotorbikePlates} from "./components/MotorbikePlates.tsx";

interface LicenseNumberProp {
    value?: string;
    vehicleType?: 'car' | 'motorbike',
    // type?: 'regular' | 'free',
    className?: string,
    style?: CSSProperties
    onChange: (value: string) => void
}

export const IranLicensePlate = (
    {
        value = "",
        vehicleType = "car",
        // type,
        className = "",
        style = {},
        onChange = (value: string) => undefined
    }: LicenseNumberProp
) => {

    if (vehicleType == "car") {
        return <div className="plate-wrapper">
            <CarPlate value={value} onChange={(value) => onChange(value)} className={className} style={style}/>
        </div>
    }

    if (vehicleType == "motorbike") {
        return <div className="plate-wrapper">
            <MotorbikePlates value={value} onChange={(value) => onChange(value)} className={className} style={style}/>
        </div>
    }

    return <>Wrong Serial?</>;
}
export default IranLicensePlate;