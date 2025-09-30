
    import './EditPage.css';
    import { useParams } from "react-router-dom";
    import LayerPanel from './LayerPanel';
    import PropertiesPanel from './PropertiesPanel';
    import { useState, useContext, createContext, useRef, useEffect } from 'react';
    import Toolbox from './Toolbox';
    import WorkSpace from './WorkSpace';
import { getTemplateById } from '../../../services/templateService';

    export const PanelContext = createContext();


export default function EditPage(){
      const { id } = useParams();
    const [template, setTemplate] = useState(null);
    const [closePanels, setClosePanels] = useState(false);
    const fabricRef = useRef(null);
    const [layerSelected, setLayerSelected] = useState("chưa chọn");
    const [toolSelected, setToolSelected] = useState("chưa chọn");
    const [toolNum, setToolNum] = useState(6);
    const [drawingMode, setDrawingMode] = useState(false);
    const [drawBrush, setDrawBrush] = useState(
        {
                color: "blue",
                width: 15,
            }
        );





        function getSizeToolBox(toolsNum){
            return `w-[${toolsNum*64}px]`
        }

         // lấy template từ server theo id
  useEffect(() => {
    if (!id) return;
    getTemplateById(id)
      .then((res) => {
        setTemplate(res.data);
      })
      .catch((err) => console.error("Error fetching template:", err));
  }, [id]);
        if (!template) {
            return <div>Loading template...</div>;
        }

        return (
            
            <div className="relative h-screen w-screen">
                <PanelContext.Provider value={{ fabricRef, drawBrush, setDrawBrush, closePanels,setClosePanels,layerSelected, setLayerSelected, toolSelected, setToolSelected, toolNum, setToolNum, drawingMode, setDrawingMode}}>
                <div id="canvasWorkSpace" className="absolute h-screen w-screen">
                    <WorkSpace fabricData={template.fabricEdit}></WorkSpace>
                </div>
            
                
                        <div id="layerPanel" className="h-full w-[15%] ">
                            <LayerPanel></LayerPanel>
                        </div>

                        <div id="toolBox" className={`fixed  left-1/2 -translate-x-1/2 bottom-4 h-[64px] ${getSizeToolBox(toolNum)}`}>
                            <Toolbox></Toolbox>
                        </div>

                        <div id="propertiesPanel" className={`absolute right-0 top-0 h-full ${!(closePanels)?"w-[15%]":"w-0"} transition-all ease-in-out duration-700`}>
                            <PropertiesPanel></PropertiesPanel> 
                        </div>
                    </PanelContext.Provider>
                    


                
            </div>
        );
    } 