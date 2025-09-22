import {useState, useContext, createContext, useEffect} from "react";
import {BsLayoutSidebarInset as CloseLayerIcon} from "react-icons/bs";
import {FaHome as HomeIcon} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LayerContext = createContext();


export function HomeButton(){
    const navigate = useNavigate();
    return (
        <HomeIcon className="w-[32px] h-[32px]" onClick={()=>{navigate("/home")}}></HomeIcon> 
    );
}

export default function LayerPanel() {
    const temp_layers = [
        "Layer 1",
        "Layer 2",
        "Layer 3",
        "Layer 4",
        "Layer 5"
    ]; // layers tam thoi
    const [cardName, setCardName] = useState("Tên thiệp"); // Ten thiep tam thoi
    const [validName, setValidName] = useState(true); // Kiểm tra tên FIle có hợp lệ không
    const [layerNum, setLayerNum] = useState(0);
    const [layerSelected, setlayerSelected] = useState("");
    const [closeLayer, setCloseLayer] = useState(false);

    const handleChangeName = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9À-ỹ\s]{0,32}$/;
        if (regex.test(value)) {
            setCardName(value);
            setValidName(true);
        } else {
            if (validName) {
                validName(false);
            }
        }
    }
    useEffect(() => {
        setLayerNum(temp_layers.length)
    }, [temp_layers.length]);


    return (
        <div id="layer-container"
            className={
                `relative ${
                    (!closeLayer) ? "w-[15%]" : "w-[64px]"
                } h-screen bg-[#f8fafd] shadow-md shadow-black transition-all duration-700 ease-in-out`
        }>
            <div id="layer-navigate" className="w-full h-[4rem]">
                <div className="flex flex-row w-[100%] h-[50%] ml-4">
                    {
                    (!closeLayer) ? <HomeButton></HomeButton> : <></>
                }

                    <CloseLayerIcon className={
                            `absolute w-[32px] h-[32px] right-6 ${
                                (!closeLayer) ? "" : "transform translate-x-2"
                            } transition-all duration-700 ease-in-out`
                        }
                        onClick={
                            () => {
                                setCloseLayer((prev) => !prev)
                            }
                    }></CloseLayerIcon>
            </div>
            {
            (!closeLayer) ? <div className="mt-2 relative mx-auto w-[80%] h-[50%]">
                <input onChange={
                        (e) => {
                            handleChangeName(e)
                        }
                    }
                    type="text"
                    value
                    ={cardName}
                    className="border-0 w-full border-[#cde1f7] rounded-[4px] mx-auto text-[1.5rem] bg-transparent"></input>
        </div> : <></>
        } </div>
        {
        (!closeLayer) ? <>
            <div className="w-[85%] h-[1%] relative mx-auto">
                <hr className="absolute border-[#e6e6e6] w-full"/>
            </div>
            <div className="flex flex-row justify-between">
                <p className="font-bold ml-[1rem]">Layers</p>
                <p className="mr-[1rem]">({layerNum})</p>
            </div>

            <div id="id_list_container" className="w-full h-[80%]">
                <LayerContext.Provider value={
                    {layerSelected, setlayerSelected}
                }>
                    <div id="id_list" className="ml-[1.5rem]">
                        {
                        temp_layers.map((layer, index) => {
                            return (
                                <Layer key={index}
                                    id={
                                        `layer_${index}`
                                    }
                                    layerGivenName={layer}></Layer>
                            );
                        })
                    } </div>

                </LayerContext.Provider>

            </div>
        </> : <></>
    } </div>


    )
}


export function Layer({
    layerGivenName = "Unnamed layer",
    id
}) {
    const [layerName, setLayerName] = useState(layerGivenName);
    const {layerSelected, setlayerSelected} = useContext(LayerContext);
    const handleChangeLayerName = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9À-ỹ\s]{0,32}$/;
        if (regex.test(value)) {
            setLayerName(value);
        } else {}
    }
    return (
        <div> {
            (layerSelected != id) ? <div onClick={
                    () => {
                        setlayerSelected(id)
                    }
                }
                className="flex w-[90%] h-[1.5rem] items-center rounded-[4px] px-[0.5rem] hover:bg-[#cde1f7] transition-colors duration-600">
                <input type="text"
                    value={layerName}
                    onChange={
                        (e) => {
                            handleChangeLayerName(e)
                        }
                    }
                    className="border-0 text-[1rem] bg-transparent focus:border-0 focus:outline-0"></input>
        </div> : <div className="flex w-[90%] h-[1.5rem] items-center rounded-[4px] px-[0.5rem] bg-[#cde1f7]">
                <input type="text"
                    value={layerName}
                    onChange={
                        (e) => {
                            handleChangeLayerName(e)
                        }
                    }
                    className="border-0 text-[1rem] bg-transparent focus:border-0 focus:outline-0"></input>
        </div>
        } </div>


    );

}
