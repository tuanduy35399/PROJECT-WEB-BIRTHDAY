import './EditPage.css'
import {useState, useContext, createContext, useEffect} from "react";
import {BsLayoutSidebarInset as CloseLayerIcon} from "react-icons/bs";
import {FaHome as HomeIcon} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { PanelContext } from './EditPage';

export function HomeButton() {
    const navigate = useNavigate();
    return (
        <HomeIcon className="panelButton" onClick={()=>{navigate("/users")}}></HomeIcon> 
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
    const {closePanels, setClosePanels} = useContext(PanelContext);

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
                    (!closePanels) ? "w-full" : "w-[64px]"
                } h-screen bg-[#f8fafd] shadow-md shadow-black transition-all duration-700 ease-in-out`
        }>
            <div id="layer-navigate" className="w-full h-[4rem]">
                <div className="flex flex-row w-[100%] h-[50%] ml-4">
                    {
                    (!closePanels) ? <HomeButton></HomeButton> : <></>
                }

                    <CloseLayerIcon className={
                            `absolute w-[32px] h-[32px] right-6 ${
                                (!closePanels) ? "" : "transform translate-x-2 rotate-180"
                            } transition-all duration-700 ease-in-out`
                        }
                        onClick={
                            () => {
                                setClosePanels((prev) => !prev)
                            }
                    }></CloseLayerIcon>
            </div>
            {
            (!closePanels) ? <div className="mt-2 relative mx-auto w-[80%] h-[50%]">
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
        (!closePanels) ? <>
            <div className="w-[85%] h-[1%] relative mx-auto">
                <hr className="absolute border-[#e6e6e6] w-full"/>
            </div>
            <div className="mt-2 flex flex-row justify-between">
                <p className="font-bold ml-[1rem]">Layers</p>
                <p className="mr-[1rem]">({layerNum})</p>
            </div>

            <div id="id_list_container" className="w-full h-[80%]">
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
    const {layerSelected, setLayerSelected} = useContext(PanelContext);
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
                        setLayerSelected(id)
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
