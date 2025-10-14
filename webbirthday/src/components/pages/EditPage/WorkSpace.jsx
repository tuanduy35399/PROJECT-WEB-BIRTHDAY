import { useEffect, useRef, useContext } from "react";
import { fabric } from "fabric";
import { PanelContext } from "./EditPage";

export default function WorkSpace({ fabricData, viewOnly }) {
  const canvasRef = useRef(null);
  const { fabricRef, toolSelected, drawBrush, rectDetails,imageDetails, textDetails } = useContext(PanelContext);


useEffect(() => {
  if (!canvasRef.current) return;

  const canvas = new fabric.Canvas(canvasRef.current, {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "white",
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
  let rect, isDrawing, origX, origY;

  function handleMouseDown(opt) {
  const pointer = canvas.getPointer(opt.e);

  // 🧹 Eraser
  if (toolSelected === "eraser" && opt.target) {
    canvas.remove(opt.target);
    canvas.requestRenderAll();
  }

  // 🖼 Image
  if (toolSelected === "image" && imageDetails.url.trim() !== "") {
    fabric.Image.fromURL(
      imageDetails.url,
      (img) => {
        img.set({
          left: pointer.x,
          top: pointer.y,
          scaleX: imageDetails.scale,
          scaleY: imageDetails.scale,
          selectable: true,
          evented: true,
        });
        canvas.add(img);
        canvas.requestRenderAll();
      },
      { crossOrigin: "anonymous" }
    );
  }

  // 🟩 Rectangle
  if (toolSelected === "rect") {
    isDrawing = true;
    origX = pointer.x;
    origY = pointer.y;
    rect = new fabric.Rect({
      left: origX,
      top: origY,
      fill: rectDetails.fill,
      stroke: rectDetails.stroke,
      strokeWidth: rectDetails.strokeWidth,
      selectable: false,
      evented: false,
    });
    canvas.add(rect);
  }

  // 🅰️ Text
  if (toolSelected === "text") {
    const textbox = new fabric.Textbox(textDetails.text, {
      left: pointer.x,
      top: pointer.y,
      fill: textDetails.fill,
      fontSize: textDetails.fontSize,
      fontWeight: textDetails.fontWeight,
      fontStyle: textDetails.fontStyle,
      underline: textDetails.underline,
      editable: true,
    });
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.requestRenderAll();
  }
}


  function handleMouseMove(opt) {
    if (!isDrawing || toolSelected !== "rect") return;
    const pointer = canvas.getPointer(opt.e);

    const width = pointer.x - origX;
    const height = pointer.y - origY;

    if (width > 0) {
      rect.set({ width: width });
    } else {
      rect.set({ left: pointer.x, width: Math.abs(width) });
    }

    if (height > 0) {
      rect.set({ height: height });
    } else {
      rect.set({ top: pointer.y, height: Math.abs(height) });
    }

    canvas.requestRenderAll();
  }

  function handleMouseUp(opt) {
    if (toolSelected === "eraser") {
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length) {
        activeObjects.forEach((obj) => canvas.remove(obj));
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      }
    }

    if (toolSelected === "rect" && isDrawing) {
      isDrawing = false;
      rect.set({ selectable: true, evented: true });
      rect = null;
    }
  }

  canvas.on("mouse:down", handleMouseDown);
  canvas.on("mouse:move", handleMouseMove);
  canvas.on("mouse:up", handleMouseUp);

  // ✏️ Brush mode
  canvas.isDrawingMode = toolSelected === "brush";
  if (canvas.isDrawingMode) {
    const brush = new fabric.PencilBrush(canvas);
    Object.assign(brush, drawBrush);
    canvas.freeDrawingBrush = brush;
  }

  return () => {
    canvas.off("mouse:down", handleMouseDown);
    canvas.off("mouse:move", handleMouseMove);
    canvas.off("mouse:up", handleMouseUp);
  };
}, [toolSelected, drawBrush, rectDetails, imageDetails, textDetails, fabricRef, viewOnly]);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
