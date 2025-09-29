import {useEffect, useState, useRef, useContext} from 'react';
import { fabric } from "fabric/dist/fabric";

import { PanelContext } from './EditPage';


export default function WorkSpace(){

    const canvasRef = useRef(null);
    const fabricRef = useRef(null);
    const {toolSelected, setToolSelected} = useContext(PanelContext);
    const {drawBrush, setDrawBrush} = useContext(PanelContext);
    const {eraserBrush, setEraserBrush} = useContext(PanelContext);
    const {eraserType,setEraserType} = useContext(PanelContext);

    useEffect(()=>{
        if(!canvasRef.current){return;};

        const canvas = new fabric.Canvas(canvasRef.current, {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "lightyellow",
        });
        fabricRef.current=canvas;


        const rect = new fabric.Rect({
            left:100,
            top:100,
            fill:"red",
            width:100,
            height:100,
        });

        canvas.add(rect);
        

        return () =>{
            canvas.dispose();
            fabricRef.current=null;
        }
    },[]);

    useEffect(()=>{
        if(!fabricRef.current){return;};
        const canvas = fabricRef.current;
        canvas.on("mouse:down", (opt)=>{
            //event click: const evt = opt.e;      
            //vitri click: const pointer = canvas.getPointer(evt);
            if(toolSelected=="eraser"&&eraserType=="xoaobject"){
                if(opt.target){
                    canvas.remove(opt.target);
                    canvas.requestRenderAll();
                }
            }
        
        });

        canvas.on("mouse:up",(opt)=>{
            
            if(toolSelected=="eraser"&&eraserType=="xoaobject" ){
                const activeObjects = canvas.getActiveObjects();
                     
                if (activeObjects.length) {
                    activeObjects.forEach((obj) => canvas.remove(obj));
                    canvas.discardActiveObject();
                    canvas.requestRenderAll();
                }
            }
            

        });

        canvas.isDrawingMode = (toolSelected=="brush" || (toolSelected=="eraser"&&eraserType=="macdinh"))?true:false;
        if (canvas.isDrawingMode && toolSelected=="brush") {
            const brush = new fabric.PencilBrush(canvas);
            Object.assign(brush, drawBrush);
            canvas.freeDrawingBrush = brush;
            }
        if (canvas.isDrawingMode && toolSelected=="eraser"){{
            const brush = new fabric.EraserBrush(canvas);
            Object.assign(brush, eraserBrush);
            canvas.freeDrawingBrush = brush;
        }}
    },[toolSelected, drawBrush, eraserBrush, eraserType])


    return (

        <div className="w-full h-full">
            <canvas ref={canvasRef}></canvas>
        </div>

    );
}