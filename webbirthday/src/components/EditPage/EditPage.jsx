import "./EditPage.module.css";
import PropertiesTab from "./PropertiesTab";
import Toolbox from "./Toolbox";
import * as fabric from 'fabric';

import {useEffect, useRef, useState} from 'react';


export default function EditPage(){
    const [penMode, setPenMode] = useState(false);
    const canvasRef = useRef(null);

    const divRef = useRef(null);
    useEffect(()=>{

        const wrapper = divRef.current;
        const canvasEl = canvasRef.current;
        
        const canvas = new fabric.Canvas(canvasEl);
        
        const resizeCanvas = ()=>{
            const {clientWidth, clientHeight} = wrapper;
            canvas.setWidth(clientWidth);
            canvas.setHeight(clientHeight);
            canvas.renderAll();
        }
        
        resizeCanvas();
        
        const helloWorld = new fabric.FabricText('Hello world!');
        canvas.add(helloWorld);
        canvas.centerObject(helloWorld);
        canvas.add(
        new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 100,
            height: 100,
        })
        );

        canvas.isDrawingMode = penMode;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        

        const observer = new ResizeObserver(()=>{
            resizeCanvas();
        })

        observer.observe(wrapper);

        return ()=>{
            observer.disconnect();
            canvas.dispose();
        };

    },[penMode]);






    return (
        <div className="relative h-screen w-full">
            <Toolbox penMode={penMode} setPenMode={setPenMode}></Toolbox>
            
            <PropertiesTab></PropertiesTab>
            <div ref={divRef} className="h-full w-[60%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            
                <canvas ref={canvasRef} className="block"></canvas>
            </div>

        </div>
    );
}