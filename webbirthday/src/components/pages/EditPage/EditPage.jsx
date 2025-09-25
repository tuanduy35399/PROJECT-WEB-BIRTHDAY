
import './EditPage.css';
import LayerPanel from './LayerPanel';
import PropertiesPanel from './PropertiesPanel';
import { useState, useContext, createContext } from 'react';

export const PanelContext = createContext();


export default function EditPage(){
    const [closePanels, setClosePanels] = useState(false);




    return (    
        <div className="h-screen w-screen flex flex-row justify-between">
            <PanelContext.Provider value={{closePanels,setClosePanels}}>
            <div id="layerPanel" className="h-full w-[15%]">
                <LayerPanel></LayerPanel>
            </div>

            <div id="propertiesPanel" className="h-full w-[15%]">
                <PropertiesPanel></PropertiesPanel> 
            </div>
            </PanelContext.Provider>
            
        </div>
    );
} 