
import './EditPage.css';
import LayerPanel from './LayerPanel';
import PropertiesPanel from './PropertiesPanel';
import { useState, useContext, createContext } from 'react';
import Toolbox from './Toolbox';

export const PanelContext = createContext();


export default function EditPage(){
    const [closePanels, setClosePanels] = useState(false);
    const [layerSelected, setLayerSelected] = useState("chưa chọn");
    const [toolSelected, setToolSelected] = useState("chưa chọn");
    const [toolNum, setToolNum] = useState(4);
    function getSizeToolBox(toolsNum){
        return `w-[${toolsNum*64}px]`
    }




    return (    
        <div className="relative h-screen w-screen flex flex-row justify-between">
            <PanelContext.Provider value={{closePanels,setClosePanels,layerSelected, setLayerSelected, toolSelected, setToolSelected, toolNum, setToolNum}}>
            <div id="layerPanel" className="h-full w-[15%]">
                <LayerPanel></LayerPanel>
            </div>

            <div id="toolBox" className={`fixed  left-1/2 -translate-x-1/2 bottom-4 h-[64px] ${getSizeToolBox(4)} `}>
                <Toolbox></Toolbox>
            </div>

            <div id="propertiesPanel" className="h-full w-[15%]">
                <PropertiesPanel></PropertiesPanel> 
            </div>
            </PanelContext.Provider>
            
        </div>
    );
} 