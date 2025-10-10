
import './EditPage.css';
import { useParams } from "react-router-dom";
import LayerPanel from './LayerPanel';
import PropertiesPanel from './PropertiesPanel';
import { useState, useContext, createContext, useRef, useEffect } from 'react';
import Toolbox from './Toolbox';
import WorkSpace from './WorkSpace';
import { createTemplate, getTemplateById } from '../../../services/templateService';
import { useNavigate } from 'react-router-dom';
import { createCard, getCardById } from '../../../services/cardService';
import { toast } from 'react-toastify';
export const PanelContext = createContext();


export default function EditPage(){
    const navigate = useNavigate();
    const [toggleSaveCard, setToggleSaveCard] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardDesc, setCardDesc] = useState("");
    const [isCard, setIsCard] = useState(false);

    const { id, mode } = useParams();
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
    if ( id === "blank") {
      setTemplate({ fabricEdit: null, name: "Blank Template" });
      return;
    }

    if (mode === "cards") {
      getCardById(id)
        .then((res) => setTemplate(res.data))
        .catch((err) => toast.error("Không thể lấy Cards", err));
    } else if (mode === "templates") {
      getTemplateById(id)
        .then((res) => setTemplate(res.data))
        .catch((err) => toast.error("Không thể lấy Template", err));
    }
  }, [id, mode]);

    if (!template) {
        return <div>Loading template...</div>;
    }


    //Hàm xử lý lưu card
   const handleSave = async () => {
  if (!cardName) {
    toast.info("Vui lòng nhập tên");
    return;
  }
  if (!fabricRef.current) {
    toast.info("Canva chưa khởi tạo");
    return;
  }

  const json = fabricRef.current.toJSON();
  const fabricEdit = JSON.stringify(json);

  try {
    if (isCard) {
      // ✅ Lưu thành Card
      const res = await createCard({
        cardName,
        owner: null,
        fabricEdit,
        cardDESC: cardDesc,
      });
      console.log("Card saved:", res.data);
      toast.info("Thiệp đã lưu thành công");
      navigate("/cards");
    } else {
      // ✅ Lưu thành Template
      const res = await createTemplate({
        name: cardName,
        owner: null,
        fabricEdit,
        cardDESC: cardDesc,
      });
      console.log("Template saved:", res.data);
      toast.info("Đã lưu Template!");
      navigate("/templates");
    }
  } catch (err) {
    console.error("Save error:", err.response?.data || err.message);
    toast.error("Lưu thất bại, xem console để biết chi tiết!");
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
                        <label className="flex items-center px-[10%] text-[1.5rem] mt-2">
                        <input
                            type="checkbox"
                            checked={isCard}
                            onChange={(e) => setIsCard(e.target.checked)}
                            className="mr-2 w-5 h-5"
                        />
                        Lưu dưới dạng Card
                        </label>
                        <div className="absolute my-2 right-[10%] w-[64px] h-[48px] bg-amber-300 font-bold flex items-center justify-center cursor-pointer shadow-sm hover:shadow-black" onClick={handleSave}>Lưu</div>
                    </div>
                    
                    
                </div>
                }

                <PanelContext.Provider value={{toggleSaveCard, setToggleSaveCard, fabricRef, drawBrush, setDrawBrush, closePanels,setClosePanels,layerSelected, setLayerSelected, toolSelected, setToolSelected, toolNum, setToolNum, drawingMode, setDrawingMode, id, mode}}>
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

    