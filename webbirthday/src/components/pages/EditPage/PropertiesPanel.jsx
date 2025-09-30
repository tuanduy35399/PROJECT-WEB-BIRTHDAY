import './EditPage.css'
import { useState, useContext } from 'react';
import { PanelContext } from './EditPage';
import { FaSave as SaveIcon } from "react-icons/fa";
import { FaFileExport as ExportIcon } from "react-icons/fa6";
import { ChromePicker } from 'react-color';


function ExportButton(){
    return (
        <div>
            <ExportIcon className="panelButton"></ExportIcon>
        </div>
    );
}

function SaveButton(){
    const {fabricRef} = useContext(PanelContext);

    const handleSave = async ()=> {
        if(fabricRef.current) {
            const json = fabricRef.current.toJSON();
            const fabricEdit = JSON.stringify(json);

            console.log("Fabric JSON:", fabricEdit);
        }
    }
    return(
    <div onClick={handleSave}>
        <SaveIcon  className="panelButton"></SaveIcon>
    </div>
    );
}

export default function PropertiesPanel(){
    const {closePanels,setClosePanels} = useContext(PanelContext);
    const {layerSelected, setLayerSelected} = useContext(PanelContext);
    const {toolSelected, setToolSelected} = useContext(PanelContext);
    const {drawBrush, setDrawBrush} = useContext(PanelContext);
    const {eraserType,setEraserType} = useContext(PanelContext);
    const {eraserBrush,setEraserBrush} = useContext(PanelContext);
    const [brushSize, setBrushSize] = useState(15);
    const [brushColor, setBrushColor] = useState("blue");
    const [eraserSize, setEraserSize] = useState(15);
    


    return (
    <div className="relative h-full w-full pointer">
        <div id="propertiesContainer" className={`absolute right-0 h-full ${(!closePanels)?"w-full":"w-0"} bg-[#f8fafd] shadow-black shadow-md transition-all ease-in-out duration-700`}>
            {(!closePanels)&&
                <div id="propertiesNavigates" className="absolute right-4 bottom-0 w-auto h-[4rem] flex flex-row gap-x-8">
                    <SaveButton></SaveButton>
                        <ExportButton></ExportButton>
                </div>
            }
            <div className="mx-4">
                <p>Đang chọn layer: {layerSelected}</p>
                <p>Tool đang chọn: {toolSelected}</p>
                {(toolSelected=="brush")&&
                <div className="flex flex-col gap-y-2"> 
                    {JSON.stringify(drawBrush)}
                    <p>Nhập vào size Brush:</p>
                    <input type="number" value={brushSize} onChange={(e)=>{setBrushSize(e.target.value)}}/>
                    <p>Đổi màu cọ:</p>
                    <ChromePicker className="mx-auto" color={brushColor} onChange={(updcolor)=>{setBrushColor(updcolor.hex)}}></ChromePicker>
                    <div className="flex items-center justify-center"> 
                        <div className="w-[64px] h-[48px] bg-amber-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-black" onClick={()=>{
                        setDrawBrush({color:brushColor, width:brushSize});

                        }}>Đổi cọ</div>
                    </div>
                    

                </div>}
                {(toolSelected=="eraser"&&
                    <div className="flex flex-col">
                        {JSON.stringify(eraserBrush) + ", " +eraserType}
                        <p>Chọn loại eraser:</p>
                        <select name="eraserTypeBox" onChange={(e)=>{setEraserType(e.target.value)}}>
                            <option value="macdinh">Mặc định</option>
                            <option value="xoaobject">Xóa object</option>
                        </select>
                       {(eraserType=="macdinh")&&
                       <div className="flex flex-col items-center justify-center gap-2 my-2">
                            <input className="w-full" type="number" value={eraserSize} onChange={(e)=>{setEraserSize((prev)=>{if(e.target.value>=0) return e.target.value; else return prev;})}}></input>
                            <div className="w-[64px] h-[48px] bg-amber-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-black" 
                                onClick={()=>{setEraserBrush({width:eraserSize})}}
                            >Đổi tẩy</div>

                        </div>}

                    </div>
                )}

                
            </div>
        </div>    
    </div>

    



    ); 
}