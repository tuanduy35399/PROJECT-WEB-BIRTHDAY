
import * as fabric from 'fabric';
import {useEffect, useRef} from 'react';



export default function WorkSpace(){
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

        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        

        const observer = new ResizeObserver(()=>{
            resizeCanvas();
        })

        observer.observe(wrapper);

        return ()=>{
            observer.disconnect();
            canvas.dispose();
        };

    },[]);
    
    return (
        <div ref={divRef} className="h-full w-[60%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            
            <canvas ref={canvasRef} className="block"></canvas>
        </div>

    );
}