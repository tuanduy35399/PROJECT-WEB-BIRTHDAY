import { useEffect, useRef, useContext } from "react";
import { fabric } from "fabric/dist/fabric";
import { PanelContext } from "./EditPage";

export default function WorkSpace({ fabricData }) {
  const canvasRef = useRef(null);
  const { fabricRef, toolSelected, drawBrush, eraserBrush, eraserType } =
    useContext(PanelContext);

  // Khởi tạo canvas 1 lần
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "lightyellow",
    });
    fabricRef.current = canvas;

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, []);

  // Load dữ liệu từ server khi fabricData thay đổi
  useEffect(() => {
    if (!fabricRef.current || !fabricData) return;

    try {
      const json = JSON.parse(fabricData);
      fabricRef.current.loadFromJSON(json, () => {
        fabricRef.current.renderAll();
      });
    } catch (err) {
      console.error("Error parsing fabric data:", err);
    }
  }, [fabricData]);

  // Tool logic (brush, eraser...)
  useEffect(() => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;

    // Event erase object
    const handleMouseDown = (opt) => {
      if (toolSelected === "eraser" && eraserType === "xoaobject") {
        if (opt.target) {
          canvas.remove(opt.target);
          canvas.requestRenderAll();
        }
      }
    };

    const handleMouseUp = () => {
      if (toolSelected === "eraser" && eraserType === "xoaobject") {
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length) {
          activeObjects.forEach((obj) => canvas.remove(obj));
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        }
      }
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:up", handleMouseUp);

    // Brush / Eraser
    canvas.isDrawingMode =
      toolSelected === "brush" ||
      (toolSelected === "eraser" && eraserType === "macdinh");

    if (canvas.isDrawingMode && toolSelected === "brush") {
      const brush = new fabric.PencilBrush(canvas);
      Object.assign(brush, drawBrush);
      canvas.freeDrawingBrush = brush;
    }

    if (canvas.isDrawingMode && toolSelected === "eraser" && eraserType === "macdinh") {
      const brush = new fabric.EraserBrush(canvas);
      Object.assign(brush, eraserBrush);
      canvas.freeDrawingBrush = brush;
    }

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:up", handleMouseUp);
    };
  }, [toolSelected, drawBrush, eraserBrush, eraserType]);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
