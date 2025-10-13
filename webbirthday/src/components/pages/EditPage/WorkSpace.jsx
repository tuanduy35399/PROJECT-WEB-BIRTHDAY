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

  let isMounted = true; // ✅ Thêm cờ kiểm tra mount

  async function loadCanvasData() {
    if (!fabricData) return;

    let jsonData = null;

    try {
      if (typeof fabricData === "string") {
        // ✅ Nếu là URL (bắt đầu bằng http)
        if (fabricData.startsWith("http")) {
          const res = await fetch(fabricData);
          if (!isMounted) return; // ⛔ Canvas bị dispose trong lúc fetch
          jsonData = await res.json();
        }
        // ✅ Nếu là chuỗi JSON
        else if (fabricData.trim().startsWith("{")) {
          jsonData = JSON.parse(fabricData);
        } else {
          console.warn(
            "⚠️ fabricData không phải JSON hoặc URL hợp lệ:",
            fabricData
          );
          return;
        }
      }
      // ✅ Nếu là object JSON sẵn
      else if (typeof fabricData === "object") {
        jsonData = fabricData;
      }

      if (jsonData && isMounted) {
        canvas.loadFromJSON(jsonData, () => {
          if (!isMounted) return;
          canvas.renderAll();
          if (viewOnly) {
            canvas.selection = false;
            canvas.forEachObject((obj) => {
              obj.selectable = false;
              obj.evented = false;
            });
          }
        });
      }
    } catch (e) {
      console.error("❌ Lỗi phân tích hoặc tải dữ liệu Fabric:", e);
    }
  }

  loadCanvasData();

  return () => {
    isMounted = false; // ✅ Báo hiệu cleanup
    canvas.dispose();
    fabricRef.current = null;
  };
}, [fabricData, fabricRef, viewOnly]);


  useEffect(() => {
    if (!fabricRef.current || viewOnly) return;
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
