// EditPage.jsx
import "./EditPage.css";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditPage() {
  const navigate = useNavigate();
  const { id, mode } = useParams();

  const [toggleSaveCard, setToggleSaveCard] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [isCard, setIsCard] = useState(false);

  const [template, setTemplate] = useState(null);
  const [closePanels, setClosePanels] = useState(false);
  const [layerSelected, setLayerSelected] = useState("chưa chọn");
  const [toolSelected, setToolSelected] = useState("chưa chọn");
  const [toolNum, setToolNum] = useState(6);
  const [drawingMode, setDrawingMode] = useState(false);
  const [drawBrush, setDrawBrush] = useState({ color: "blue", width: 15 });

  const fabricRef = useRef(null);

  const getSizeToolBox = (toolsNum) => `w-[${toolsNum * 64}px]`;

  // Load template/card theo id
  useEffect(() => {
    if (id === "blank") {
      setTemplate({ fabricEdit: null, name: "Blank Template", imgURL: null });
      return;
    }

    const fetchData = async () => {
      try {
        const res =
          mode === "cards" ? await getCardById(id) : await getTemplateById(id);
        setTemplate(res.data);
      } catch (err) {
        console.error(err);
        toast.error(`Không thể lấy dữ liệu ${mode}`);
      }
    };
    fetchData();
  }, [id, mode]);

  if (!template) return <div>Loading template...</div>;

  // Lưu hoặc cập nhật template/card
  const handleSave = async () => {
    if (!cardName) return toast.info("Vui lòng nhập tên");
    if (!fabricRef.current) return toast.info("Canvas chưa khởi tạo");

    const json = fabricRef.current.toJSON();
    const fabricEdit = JSON.stringify(json);

    // Tạo thumbnail chỉ khi tạo mới
    let uploadedThumb = template.imgURL || null;
    if (id === "blank" || !template.imgURL) {
      try {
        const thumbnail = fabricRef.current.toDataURL({
          format: "png",
          quality: 0.8,
        });
        const res = await uploadBase64Image(thumbnail);
        uploadedThumb = res.url;
      } catch (err) {
        console.warn("Upload thumbnail thất bại:", err);
      }
    }

    try {
      if (isCard) {
        if (id === "blank" || !template.imgURL) {
          const res = await createCard({
            cardName,
            owner: null,
            fabricEdit,
            cardDESC: cardDesc,
            imgURL: uploadedThumb,
          });
          toast.success("Card đã lưu thành công!");
          navigate("/cards");
          console.log("Card created:", res.data);
        } else {
          const res = await updateCard(id, {
            cardName,
            owner: null,
            fabricEdit,
            cardDESC: cardDesc,
            imgURL: template.imgURL, // giữ nguyên thumbnail
          });
          toast.success("Card đã cập nhật!");
          navigate("/cards");
          console.log("Card updated:", res.data);
        }
      } else {
        if (id === "blank" || !template.imgURL) {
          const res = await createTemplate({
            name: cardName,
            owner: null,
            fabricEdit,
            cardDESC: cardDesc,
            imgURL: uploadedThumb,
          });
          toast.success("Template đã lưu thành công!");
          navigate("/templates");
          console.log("Template created:", res.data);
        } else {
          const res = await updateTemplate(id, {
            name: cardName,
            owner: null,
            fabricEdit,
            cardDESC: cardDesc,
            imgURL: template.imgURL, // giữ nguyên thumbnail
          });
          toast.success("Template đã cập nhật!");
          navigate("/templates");
          console.log("Template updated:", res.data);
        }
      }
    } catch (err) {
      console.error("Save/Update error:", err.response?.data || err.message);
      toast.error("Lưu thất bại, xem console!");
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {toggleSaveCard && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#f8fafd] z-9999 shadow-md shadow-black">
          <h1 className="text-center py-2">Lưu thông tin thiệp</h1>
          <div className="relative py-[1rem]">
            <p className="px-[10%] text-[1.5rem]">Nhập tên thiệp:</p>
            <input
              type="text"
              className="cardInputButton"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <p className="px-[10%] text-[1.5rem]">Nhập mô tả thiệp:</p>
            <input
              type="text"
              className="cardInputButton"
              value={cardDesc}
              onChange={(e) => setCardDesc(e.target.value)}
            />
            <label className="flex items-center px-[10%] text-[1.5rem] mt-2">
              <input
                type="checkbox"
                checked={isCard}
                onChange={(e) => setIsCard(e.target.checked)}
                className="mr-2 w-5 h-5"
              />
              Lưu dưới dạng Card
            </label>
            <div
              className="absolute my-2 right-[10%] w-[64px] h-[48px] bg-amber-300 font-bold flex items-center justify-center cursor-pointer shadow-sm hover:shadow-black"
              onClick={handleSave}
            >
              Lưu
            </div>
          </div>
        </div>
      )}

      <PanelContext.Provider
        value={{
          toggleSaveCard,
          setToggleSaveCard,
          fabricRef,
          drawBrush,
          setDrawBrush,
          closePanels,
          setClosePanels,
          layerSelected,
          setLayerSelected,
          toolSelected,
          setToolSelected,
          toolNum,
          setToolNum,
          drawingMode,
          setDrawingMode,
          template,
          id,
          mode,
        }}
      >
        <div id="canvasWorkSpace" className="absolute h-screen w-screen">
          <WorkSpace fabricData={template.fabricEdit} />
        </div>

        <div id="layerPanel" className="h-full w-[15%]">
          <LayerPanel />
        </div>

        <div
          id="toolBox"
          className={`fixed left-1/2 -translate-x-1/2 bottom-4 h-[64px] ${getSizeToolBox(
            toolNum
          )}`}
        >
          <Toolbox />
        </div>

        <div
          id="propertiesPanel"
          className={`absolute right-0 top-0 h-full ${
            !closePanels ? "w-[15%]" : "w-0"
          } transition-all ease-in-out duration-700`}
        >
          <PropertiesPanel />
        </div>
      </PanelContext.Provider>
    </div>
  );
}
