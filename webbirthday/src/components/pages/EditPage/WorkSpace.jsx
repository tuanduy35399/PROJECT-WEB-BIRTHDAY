import { useEffect, useRef, useContext } from "react";
import { fabric } from "fabric";
import { PanelContext } from "./EditPage";

export default function WorkSpace({ fabricData, fabricURL }) {
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

    const loadFabricJSON = (jsonData) => {
      canvas.loadFromJSON(jsonData, () => {
        canvas.renderAll();
      });
    };

    if (fabricData) {
      try {
        // Kiểm tra xem fabricData có phải JSON hay URL
        const isJSON = fabricData.trim().startsWith("{");
        if (isJSON) {
          const json = JSON.parse(fabricData);
          loadFabricJSON(json);
        } else {
          // Nếu là URL, fetch JSON từ server
          fetch(fabricData)
            .then((res) => res.json())
            .then((jsonData) => loadFabricJSON(jsonData))
            .catch((err) => console.error("Error fetching fabric JSON:", err));
        }
      } catch (err) {
        console.error("Error parsing fabricData:", err);
      }
    } else if (fabricURL) {
      fetch(fabricURL)
        .then((res) => res.json())
        .then((jsonData) => loadFabricJSON(jsonData))
        .catch((err) => console.error("Error fetching fabric JSON:", err));
    }

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, [fabricData, fabricURL, fabricRef]);

  useEffect(() => {
    if (!fabricRef.current) return;
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
  }, [toolSelected, drawBrush, fabricRef]);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
