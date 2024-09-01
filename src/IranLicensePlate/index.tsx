import {HTMLAttributes} from "react";
import {CarPlate} from "./components/CarPlate.tsx";
import "../styles/styles.scss";

interface LicenseNumberProp extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    vehicleType?: 'car' | 'motorbike',
    // type?: 'regular' | 'free',
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

    if(vehicleType == "car"){
        return <CarPlate value={value} onChange={onChange} className={className} style={style}/>
    }

    return <>Wrong Serial?</>;
}
export default IranLicensePlate;