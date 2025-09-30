
import './EditPage.css';
import { useParams } from "react-router-dom";
import LayerPanel from './LayerPanel';
import PropertiesPanel from './PropertiesPanel';
import { useState, useContext, createContext, useRef, useEffect } from 'react';
import Toolbox from './Toolbox';
import WorkSpace from './WorkSpace';
import { getTemplateById } from '../../../services/templateService';
import { createCard} from '../../../services/cardService'

export const PanelContext = createContext();


export default function EditPage(){
    const [toggleSaveCard, setToggleSaveCard] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardDesc, setCardDesc] = useState("");
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


    //Hàm xử lý lưu card
    const handleSave = async () => {
        if(!cardName){
            alert("Vui vòng nhập tên thiệp");
            return;
        }
        if (!fabricRef.current) {
            alert("Canvas chưa khởi tạo");
            return;
        }
    
        const json = fabricRef.current.toJSON();
        const fabricEdit = JSON.stringify(json);
    
        const imgData = fabricRef.current.toDataURL({
            format: "png",
            multiplier: 0.5,
        });
    
        try {
            const res = await createCard({
            cardName: cardName || "New Card",
            owner: null,
            imgURL: [imgData],
            fabricEdit,
            cardDESC: cardDesc,
            });
            console.log("Saved:", res.data);
            alert("Card saved!");
        } catch (err) {
            if (err.response) {
            console.error("Server error:", err.response.data);
            } else {
            console.error("Client error:", err.message);
            }
        }
    };
    return (

            <div className="relative h-screen w-screen">   
                {toggleSaveCard&&
              
       
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#f8fafd] z-9999 shadow-md shadow-black">
                    <h1 className="text-center py-2">Lưu thông tin thiệp</h1>
                    <div className="relative py-[1rem]">
                        <p className="px-[10%] text-[1.5rem]">Nhập tên thiệp:</p>
                        <input type="text" className="cardInputButton" value={cardName} onChange={(e)=>{setCardName(e.target.value)}}></input>
                        <p className="px-[10%] text-[1.5rem]">Nhập mô tả thiệp:</p>
                        <input type="text" className="cardInputButton" value={cardDesc} onChange={(e)=>{setCardDesc(e.target.value)}}></input>
                        <div className="absolute my-2 right-[10%] w-[64px] h-[48px] bg-amber-300 font-bold flex items-center justify-center cursor-pointer shadow-sm hover:shadow-black" onClick={handleSave}>Lưu</div>
                    </div>
                    
                    
                </div>
                }

                <PanelContext.Provider value={{toggleSaveCard, setToggleSaveCard, fabricRef, drawBrush, setDrawBrush, closePanels,setClosePanels,layerSelected, setLayerSelected, toolSelected, setToolSelected, toolNum, setToolNum, drawingMode, setDrawingMode}}>
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

    