// PropertiesPanel.jsx
import "./EditPage.css";
import { useState, useContext } from "react";
import { PanelContext } from "./EditPage";
import { FaSave as SaveIcon } from "react-icons/fa";
import { FaFileExport as ExportIcon } from "react-icons/fa6";
import { ChromePicker } from "react-color";
import { updateTemplate } from "../../../services/templateService";
import { updateCard } from "../../../services/cardService";
import { BsCardList as CardIcon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadBase64Image } from "../../../services/uploadServices.js";

function ExportButton() {
  return (
    <div>
      <ExportIcon className="panelButton" />
    </div>
  );
}

function CardButton() {
  return (
    <div>
      <CardIcon className="panelButton" />
    </div>
  );
}

function SaveButton() {
  const navigate = useNavigate();
  const { id, mode, fabricRef, template } = useContext(PanelContext);

  const handleSave = async () => {
    if (!fabricRef.current) {
      toast.error("Canvas chưa khởi tạo");
      return;
    }

    const json = fabricRef.current.toJSON();
    const fabricEdit = JSON.stringify(json);

    let uploadedThumb = template?.imgURL || null;

    // Tạo thumbnail **chỉ khi tạo mới**
    if (id === "blank" || !template?.imgURL) {
      const thumbnail = fabricRef.current.toDataURL({
        format: "png",
        quality: 0.8,
      });
      try {
        const res = await uploadBase64Image(thumbnail);
        uploadedThumb = res.url;
      } catch (err) {
        console.warn("Upload thumbnail thất bại:", err);
      }
    }

    try {
      if (mode === "templates") {
        if (id === "blank" || !template?.imgURL) {
          // Tạo mới template
          const res = await updateTemplate(id, {
            name: template?.name || "My Template",
            owner: null,
            fabricEdit,
            imgURL: uploadedThumb,
          });
          toast.success("Template đã lưu!");
          console.log("Template created:", res.data);
        } else {
          // Update template, giữ nguyên thumbnail
          const res = await updateTemplate(id, {
            name: template?.name || "My Template",
            owner: null,
            fabricEdit,
            imgURL: template.imgURL,
          });
          toast.success("Template đã cập nhật!");
          console.log("Template updated:", res.data);
        }
        navigate("/templates");
      }

      if (mode === "cards") {
        if (id === "blank" || !template?.imgURL) {
          const res = await updateCard(id, {
            cardName: template?.cardName || "My Card",
            owner: null,
            fabricEdit,
            imgURL: uploadedThumb,
          });
          toast.success("Card đã lưu!");
          console.log("Card created:", res.data);
        } else {
          const res = await updateCard(id, {
            cardName: template?.cardName || "My Card",
            owner: null,
            fabricEdit,
            imgURL: template.imgURL,
          });
          toast.success("Card đã cập nhật!");
          console.log("Card updated:", res.data);
        }
        navigate("/cards");
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Lưu thất bại, xem console!");
    }
  };

  return (
    <div onClick={handleSave}>
      <SaveIcon className="panelButton" />
    </div>
  );
}

export default function PropertiesPanel() {
  const {
    toggleSaveCard,
    setToggleSaveCard,
    closePanels,
    layerSelected,
    toolSelected,
    drawBrush,
    setDrawBrush,
  } = useContext(PanelContext);

  const [brushSize, setBrushSize] = useState(15);
  const [brushColor, setBrushColor] = useState("blue");

  return (
    <div className="relative h-full w-full pointer">
      <div
        id="propertiesContainer"
        className={`absolute right-0 h-full ${
          !closePanels ? "w-full" : "w-0"
        } bg-[#f8fafd] shadow-black shadow-md transition-all ease-in-out duration-700`}
      >
        {!closePanels && (
          <div
            id="propertiesNavigates"
            className="absolute right-4 bottom-0 w-auto h-[4rem] flex flex-row gap-x-8"
          >
            <div onClick={() => setToggleSaveCard((prev) => !prev)}>
              <CardButton />
            </div>
            <SaveButton />
            <ExportButton />
          </div>
        )}

        <div className="mx-4">
          <p>Đang chọn layer: {layerSelected}</p>
          <p>Tool đang chọn: {toolSelected}</p>

          {toolSelected === "brush" && (
            <div className="flex flex-col gap-y-2">
              <p>Nhập size Brush:</p>
              <input
                type="number"
                value={brushSize}
                onChange={(e) => setBrushSize(e.target.value)}
              />
              <p>Đổi màu cọ:</p>
              <ChromePicker
                className="mx-auto"
                color={brushColor}
                onChange={(updcolor) => setBrushColor(updcolor.hex)}
              />
              <div className="flex items-center justify-center">
                <div
                  className="w-[64px] h-[48px] bg-amber-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-black"
                  onClick={() =>
                    setDrawBrush({ color: brushColor, width: brushSize })
                  }
                >
                  Đổi cọ
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
