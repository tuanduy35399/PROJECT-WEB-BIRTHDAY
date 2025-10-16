import "./EditPage.css";
import { useState, useContext } from "react";
import { PanelContext } from "./EditPage";
import { FaSave as SaveIcon } from "react-icons/fa";
import { FaFileExport as ExportIcon } from "react-icons/fa6";
import { ChromePicker } from "react-color";
import {
  createTemplate,
  updateTemplate,
} from "../../../services/templateService";
import { createCard, updateCard } from "../../../services/cardService";
import { BsCardList as CardIcon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadBase64Image } from "../../../services/uploadServices.js";

function ExportButton() {
  const { fabricRef } = useContext(PanelContext);

  const handleExport = async (e) => {
    // Ngăn hành vi mặc định (nếu là button/a)
    e?.preventDefault?.();

    if (!fabricRef.current) {
      toast.error("Canvas chưa khởi tạo");
      return;
    }

    try {
      const canvas = fabricRef.current;
      const base64 = canvas.toDataURL({ format: "png" });

      // Upload lên server
      const { url } = await uploadBase64Image(base64);

      // Mở tab mới hiển thị ảnh
      const newTab = window.open("", "_blank"); // mở tab rỗng
      if (newTab) {
        newTab.document.write(`
          <html>
            <head><title>Preview</title></head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#eee;">
              <img src="${url}" style="max-width:100%; max-height:100%;" />
            </body>
          </html>
        `);
        newTab.document.close();
      } else {
        toast.warn("Trình duyệt chặn popup, hãy bật cho phép mở tab mới.");
      }

      toast.success("Export thành công! Ảnh mở tab mới.");
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Export thất bại, xem console!");
    }
  };

  return (
    <div onClick={handleExport}>
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

    const fabricJSON = JSON.stringify(fabricRef.current.toJSON());

    try {
      if (mode === "templates") {
        // Update template
        const res = await updateTemplate(id, {
          name: template?.name || "My Template",
          owner: null,
          fabricEdit: fabricJSON,
          imgURL: template.imgURL,
        });
        toast.success("Template đã cập nhật!");
        navigate("/templates");
      }

      if (mode === "cards") {
        // Update card
        const res = await updateCard(id, {
          cardName: template?.cardName || "My Card",
          owner: null,
          fabricEdit: fabricJSON,
          imgURL: template.imgURL,
        });
        toast.success("Card đã cập nhật!");
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
    setDrawBrush,textDetails, setTextDetails,
    rectDetails,
    setRectDetails,
    fabricRef,imageDetails, setImageDetails
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
          {toolSelected === "rect" && (
            <div className="flex flex-col gap-y-2">
              <p>Màu nền (fill):</p>
              <ChromePicker
                className="mx-auto"
                color={rectDetails.fill}
                onChange={(color) =>
                  setRectDetails((prev) => ({ ...prev, fill: color.hex }))
                }
              />

              <p>Màu viền (stroke):</p>
              <ChromePicker
                className="mx-auto"
                color={rectDetails.stroke}
                onChange={(color) =>
                  setRectDetails((prev) => ({ ...prev, stroke: color.hex }))
                }
              />

              <p>Độ dày viền:</p>
              <input
                type="number"
                min="1"
                max="20"
                value={rectDetails.strokeWidth}
                onChange={(e) =>
                  setRectDetails((prev) => ({
                    ...prev,
                    strokeWidth: parseInt(e.target.value) || 1,
                  }))
                }
              />

              <div className="flex items-center justify-center">
                <div
                  className="w-[64px] h-[48px] bg-blue-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-black"
                  onClick={() => {
                    const canvas = fabricRef.current;
                    if (canvas) {
                      const activeObject = canvas.getActiveObject();
                      if (activeObject && activeObject.type === "rect") {
                        activeObject.set({
                          fill: rectDetails.fill,
                          stroke: rectDetails.stroke,
                          strokeWidth: rectDetails.strokeWidth,
                        });
                        canvas.requestRenderAll();
                      }
                    }

                    // ✅ Cập nhật giá trị mặc định cho các hình chữ nhật tạo mới sau này
                    setRectDetails((prev) => ({
                      ...prev,
                      fill: rectDetails.fill,
                      stroke: rectDetails.stroke,
                      strokeWidth: rectDetails.strokeWidth,
                    }));

                    toast.success(
                      "Đã áp dụng và lưu làm mặc định cho hình chữ nhật mới!"
                    );
                  }}
                >
                  Áp dụng
                </div>
              </div>
            </div>
          )}
          {toolSelected === "text" && (
            <div className="flex flex-col gap-y-2">
              <p>Nội dung văn bản:</p>
              <input
                type="text"
                className="border border-gray-300 rounded px-2 py-1"
                value={textDetails.text}
                onChange={(e) =>
                  setTextDetails((prev) => ({ ...prev, text: e.target.value }))
                }
              />

              <p>Màu chữ:</p>
              <ChromePicker
                className="mx-auto"
                color={textDetails.fill}
                onChange={(color) =>
                  setTextDetails((prev) => ({ ...prev, fill: color.hex }))
                }
              />

              <p>Cỡ chữ:</p>
              <input
                type="number"
                min="8"
                max="128"
                className="border border-gray-300 rounded px-2 py-1"
                value={textDetails.fontSize}
                onChange={(e) =>
                  setTextDetails((prev) => ({
                    ...prev,
                    fontSize: parseInt(e.target.value) || 12,
                  }))
                }
              />

              <div className="flex justify-around mt-2">
                <button
                  className={`px-3 py-1 rounded ${
                    textDetails.fontWeight === "bold"
                      ? "bg-gray-300"
                      : "bg-gray-100"
                  }`}
                  onClick={() =>
                    setTextDetails((prev) => ({
                      ...prev,
                      fontWeight:
                        prev.fontWeight === "bold" ? "normal" : "bold",
                    }))
                  }
                >
                  <b>B</b>
                </button>
                <button
                  className={`px-3 py-1 rounded ${
                    textDetails.fontStyle === "italic"
                      ? "bg-gray-300"
                      : "bg-gray-100"
                  }`}
                  onClick={() =>
                    setTextDetails((prev) => ({
                      ...prev,
                      fontStyle:
                        prev.fontStyle === "italic" ? "normal" : "italic",
                    }))
                  }
                >
                  <i>I</i>
                </button>
                <button
                  className={`px-3 py-1 rounded ${
                    textDetails.underline ? "bg-gray-300" : "bg-gray-100"
                  }`}
                  onClick={() =>
                    setTextDetails((prev) => ({
                      ...prev,
                      underline: !prev.underline,
                    }))
                  }
                >
                  <u>U</u>
                </button>
              </div>

              <div className="flex items-center justify-center mt-4">
                <div
                  className="w-[64px] h-[48px] bg-indigo-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-black"
                  onClick={() => {
                    const canvas = fabricRef.current;
                    if (canvas) {
                      const active = canvas.getActiveObject();
                      if (active && active.type === "textbox") {
                        active.set({
                          text: textDetails.text,
                          fill: textDetails.fill,
                          fontSize: textDetails.fontSize,
                          fontWeight: textDetails.fontWeight,
                          fontStyle: textDetails.fontStyle,
                          underline: textDetails.underline,
                        });
                        canvas.requestRenderAll();
                      }
                    }
                    toast.success(
                      "Đã áp dụng và lưu làm mặc định cho Text mới!"
                    );
                  }}
                >
                  Áp dụng
                </div>
              </div>
            </div>
          )}

          {toolSelected === "image" && (
            <div className="flex flex-col gap-y-2">
              <p>URL ảnh:</p>
              <input
                type="text"
                className="border border-gray-300 rounded px-2 py-1"
                placeholder="https://example.com/image.png"
                value={imageDetails.url}
                onChange={(e) =>
                  setImageDetails((prev) => ({ ...prev, url: e.target.value }))
                }
              />

              <p>Hoặc tải hình từ máy:</p>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  try {
                    // Chuyển file sang Base64
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                      const base64 = reader.result;

                      // Upload lên server
                      const { url } = await uploadBase64Image(base64);

                      // Cập nhật imageDetails
                      setImageDetails((prev) => ({ ...prev, url }));
                      toast.success("Upload hình thành công!");
                    };
                    reader.readAsDataURL(file);
                  } catch (err) {
                    console.error(err);
                    toast.error("Upload thất bại!");
                  }
                }}
              />

              <p>Tỉ lệ scale (0.1 → 2):</p>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="5"
                value={imageDetails.scale}
                onChange={(e) =>
                  setImageDetails((prev) => ({
                    ...prev,
                    scale: parseFloat(e.target.value) || 1,
                  }))
                }
              />

              <div className="flex items-center justify-center">
                <div
                  className="w-[64px] h-[48px] bg-green-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-black"
                  onClick={() => {
                    const canvas = fabricRef.current;
                    if (!canvas) return;

                    if (!imageDetails.url) {
                      toast.error("Chưa có hình để thêm!");
                      return;
                    }

                    // Thêm hình lên canvas
                    fabric.Image.fromURL(imageDetails.url, (img) => {
                      img.scale(imageDetails.scale || 1);
                      canvas.add(img);
                      canvas.setActiveObject(img);
                      canvas.requestRenderAll();
                    });

                    toast.success("Đã thêm hình vào canvas!");
                  }}
                >
                  Áp dụng
                </div>
              </div>
            </div>
          )}

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
