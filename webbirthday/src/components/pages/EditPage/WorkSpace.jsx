import {useEffect, useState, useRef, useContext} from 'react';
import { fabric } from "fabric";


import { PanelContext } from './EditPage';


export default function WorkSpace({ fabricData }){
    const canvasRef = useRef(null);
    const {fabricRef} = useContext(PanelContext);
    const {toolSelected, setToolSelected} = useContext(PanelContext);
    const {drawBrush, setDrawBrush} = useContext(PanelContext);
    const {eraserBrush, setEraserBrush} = useContext(PanelContext);
    const {eraserType,setEraserType} = useContext(PanelContext);


    
    useEffect(() => {
            if (!canvasRef.current) return;

            const canvas = new fabric.Canvas(canvasRef.current, {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "lightyellow",
            });
            fabricRef.current = canvas;

            // load lại canvas từ fabricData nếu có
            if (fabricData) {
            try {
                const json = JSON.parse(fabricData);
                canvas.loadFromJSON(json, () => {
                canvas.renderAll();
                });
            } catch (err) {
                console.error("Error parsing fabric data:", err);
            }
            }

            return () => {
            canvas.dispose();
            fabricRef.current = null;
            };
        }, [fabricData]);

    useEffect(()=>{
        if(!fabricRef.current){return;};
        const canvas = fabricRef.current;

        function handleMouseDown(opt){
            if(toolSelected=="eraser"){
                if(opt.target){
                    canvas.remove(opt.target);
                    canvas.requestRenderAll();
                }
            }
        };
        function handleMouseUp(opt){
             if(toolSelected=="eraser"){
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

        canvas.isDrawingMode = (toolSelected=="brush")?true:false;
        if (canvas.isDrawingMode && toolSelected=="brush") {
            const brush = new fabric.PencilBrush(canvas);
            Object.assign(brush, drawBrush);
            canvas.freeDrawingBrush = brush;
            }


        return ()=>{
            canvas.off("mouse:down", handleMouseDown);
            canvas.off("mouse:up", handleMouseUp);
        }

    },[toolSelected, drawBrush, eraserBrush, eraserType])


    return (

        <div className="w-full h-full">
            <canvas ref={canvasRef}></canvas>
        </div>

    );
}