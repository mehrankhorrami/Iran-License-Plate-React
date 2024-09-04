import IranLicensePlate from "./IranLicensePlate";

function App() {
    return (
        <>
            <IranLicensePlate onChange={(value) => console.log(value)} value="IR17-141b31"/>
            <br/>
            <IranLicensePlate vehicleType="motorbike" onChange={(value) => console.log(value)} value="141-31224"/>
        </>
    );
}

export default App;
