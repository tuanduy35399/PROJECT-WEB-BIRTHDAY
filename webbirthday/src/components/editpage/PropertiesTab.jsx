
import { FaDownload } from "react-icons/fa6";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSave } from "react-icons/fa";

export default function PropertiesTab(){
    const LayerList = ["Layer 1", "Layer 2", "Layer 3"];//temp
    const PropertiesList = ["Cao","Rong","Border"];//temp


    return (
        
        <div className="z-10">
           <div className="fixed border-2 w-[20%] h-screen">
                <h1 className="text-lg text-center">Này là tên Thiệp</h1>
                <div className="h-[2px] w-full bg-gray-200"></div>
                <p className="text-lg px-[1rem]">Layer list:</p>
                <ul>
                {LayerList.map((layer)=>{
                    return (<li key={layer} className="px-[0.5rem]">{layer}</li>)
                })}
                </ul>
            </div> 
            <div className="fixed right-0 border-2 w-[20%] h-screen">
                <h1 className="text-lg text-center">Properties:</h1>
                <div className="h-[2px] w-full bg-gray-200"></div>
                <p className="text-lg px-[1rem]">Properties list:</p>
                <ul>
                {PropertiesList.map((property)=>{
                    return (<li key={property} className="px-[0.5rem]">{property}</li>)
                })}
                
                </ul>
                <div className="absolute bottom-10 grid w-full grid-cols-3 place-items-center p-2">
                    <BsArrowReturnLeft className="w-[40%] h-auto"></BsArrowReturnLeft>
                    <FaSave className="w-[40%] h-auto"></FaSave>
                    <FaDownload className="w-[40%] h-auto"></FaDownload>
                </div>
            </div> 
        </div>
    );
}