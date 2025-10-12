import "./EditPage.css";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import Link
import { FaArrowLeft } from "react-icons/fa"; // Import icon cho nút bấm
import LayerPanel from "./LayerPanel";
import PropertiesPanel from "./PropertiesPanel";
import { useState, createContext, useRef, useEffect } from "react";
import Toolbox from "./Toolbox";
import WorkSpace from "./WorkSpace";
import {
  createTemplate,
  getTemplateById,
  updateTemplate,
} from "../../../services/templateService";
import {
  createCard,
  getCardById,
  updateCard,
} from "../../../services/cardService";
import { toast } from "react-toastify";
import { uploadBase64Image } from "../../../services/uploadServices.js";

export const PanelContext = createContext();

export default function EditPage({ viewOnly = false }) {
  const navigate = useNavigate();
  const { id, mode: routeMode } = useParams();
  const mode = viewOnly ? 'cards' : routeMode;

  const [template, setTemplate] = useState(null);
  const [toggleSaveCard, setToggleSaveCard] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [isCard, setIsCard] = useState(false);
  const [closePanels, setClosePanels] = useState(false);
  const [layerSelected, setLayerSelected] = useState("chưa chọn");
  const [toolSelected, setToolSelected] = useState("chưa chọn");
  const [toolNum, setToolNum] = useState(6);
  const [drawingMode, setDrawingMode] = useState(false);
  const [drawBrush, setDrawBrush] = useState({ color: "blue", width: 15 });
  const fabricRef = useRef(null);

  const getSizeToolBox = (toolsNum) => `w-[${toolsNum * 64}px]`;

  useEffect(() => {
    if (id === "blank") {
      setTemplate({ fabricEdit: null, name: "Blank Template" });
      return;
    }

    const fetchData = async () => {
      try {
        const res =
          mode === "cards" ? await getCardById(id) : await getTemplateById(id);
        
        setTemplate(res.data);
        setCardName(res.data?.name || res.data?.cardName || "");
        setCardDesc(res.data?.cardDESC || "");
        setIsCard(mode === "cards");
      } catch (err) {
        console.error(err);
        toast.error(`Không thể lấy dữ liệu`);
        navigate('/cards');
      }
    };
    fetchData();
  }, [id, mode, navigate]);

  if (!template) return <div>Đang tải thiệp...</div>;

  const handleCreateNew = async () => {
    // ... logic tạo mới giữ nguyên
  };

  return (
    <div className="relative h-screen w-screen bg-gray-200">
      {/*Thêm nút quay lại ở đây */}
      {viewOnly && (
        <Link 
        to="/cards" 
        className="absolute top-4 left-4 z-50 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Back to cards"
      >
        <FaArrowLeft className="text-gray-800" />
      </Link>
      )}
    
      {/* Popup để lưu card */}
      {!viewOnly && toggleSaveCard && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#f8fafd] z-50 shadow-md shadow-black">
           {/* ...Nội dung popup... */}
        </div>
      )}

      <PanelContext.Provider
        value={{
          toggleSaveCard, setToggleSaveCard, fabricRef, drawBrush, setDrawBrush,
          closePanels, setClosePanels, layerSelected, setLayerSelected,
          toolSelected, setToolSelected, toolNum, setToolNum, drawingMode,
          setDrawingMode, template, id, mode,
        }}
      >
        <div id="canvasWorkSpace" className="absolute h-screen w-screen">
          <WorkSpace
            fabricData={template.fabricEdit}
            viewOnly={viewOnly}
          />
        </div>

        {/* Chỉ render các thanh công cụ nếu không ở chế độ viewOnly */}
        {!viewOnly && (
          <>
          
            <div id="layerPanel" className="h-full w-[15%]">
              <LayerPanel />
            </div>
            <div id="toolBox" className={`fixed left-1/2 -translate-x-1/2 bottom-4 h-[64px] ${getSizeToolBox(toolNum)}`}>
              <Toolbox />
            </div>
            <div id="propertiesPanel" className={`absolute right-0 top-0 h-full ${!closePanels ? "w-[15%]" : "w-0"} transition-all ease-in-out duration-700`}>
              <PropertiesPanel />
            </div>
          </>
        )}
      </PanelContext.Provider>
    </div>
  );
}

