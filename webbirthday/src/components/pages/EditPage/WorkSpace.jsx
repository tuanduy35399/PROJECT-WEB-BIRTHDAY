import {useEffect, useState, useRef, useContext} from 'react';
import * as fabric from "fabric";
import { PanelContext } from './EditPage';


export default function WorkSpace(){
    const canvasRef = useRef(null);
    const fabricRef = useRef(null);
    const {toolSelected, setToolSelected} = useContext(PanelContext);

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
        canvas.isDrawingMode = (toolSelected=="brush")?true:false;
        if (canvas.isDrawingMode) {
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            canvas.freeDrawingBrush.color = "red";
            canvas.freeDrawingBrush.width = 10;
        }
    },[toolSelected])


    return (

        <div className="w-full h-full">
            <canvas ref={canvasRef}></canvas>
        </div>

    );
}