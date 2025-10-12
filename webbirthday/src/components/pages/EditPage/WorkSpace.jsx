import { useEffect, useRef, useContext } from "react";
import { fabric } from "fabric";
import { PanelContext } from "./EditPage";

export default function WorkSpace({ fabricData, viewOnly }) {
  const canvasRef = useRef(null);
  const { fabricRef, toolSelected, drawBrush } = useContext(PanelContext);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "lightyellow",
    });
    fabricRef.current = canvas;

    //  SỬA LỖI: Logic tải dữ liệu được làm lại để ổn định hơn
    if (fabricData) {
      let jsonData;
      // Nếu dữ liệu là một chuỗi, phân tích nó thành JSON
      if (typeof fabricData === "string") {
        try {
          jsonData = JSON.parse(fabricData);
        } catch (e) {
          console.error("Lỗi phân tích dữ liệu bản vẽ (JSON):", e);
          // Không làm gì thêm nếu dữ liệu lỗi
        }
      } 
      // Nếu dữ liệu đã là một đối tượng, sử dụng trực tiếp
      else if (typeof fabricData === "object") {
        jsonData = fabricData;
      }

      // Nếu có jsonData hợp lệ, tải nó vào canvas
      if (jsonData) {
        canvas.loadFromJSON(jsonData, () => {
          canvas.renderAll();
          // Nếu ở chế độ chỉ xem, vô hiệu hóa tương tác
          if(viewOnly) {
            canvas.selection = false;
            canvas.forEachObject(obj => {
              obj.selectable = false;
              obj.evented = false;
            });
          }
        });
      }
    }

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, [fabricData, fabricRef, viewOnly]);

  // useEffect cho các công cụ vẫn giữ nguyên
  useEffect(() => {
    if (!fabricRef.current || viewOnly) return; // Không kích hoạt tool nếu ở chế độ xem
    const canvas = fabricRef.current;

    function handleMouseDown(opt) {
      if (toolSelected === "eraser" && opt.target) {
        canvas.remove(opt.target);
        canvas.requestRenderAll();
      }
    }

    function handleMouseUp() {
      if (toolSelected === "eraser") {
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length) {
          activeObjects.forEach((obj) => canvas.remove(obj));
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        }
      }
    }

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:up", handleMouseUp);

    canvas.isDrawingMode = toolSelected === "brush";
    if (canvas.isDrawingMode) {
      const brush = new fabric.PencilBrush(canvas);
      Object.assign(brush, drawBrush);
      canvas.freeDrawingBrush = brush;
    }

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:up", handleMouseUp);
    };
  }, [toolSelected, drawBrush, fabricRef, viewOnly]);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
