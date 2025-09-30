import './EditPage.css'
import { useState, useContext } from 'react';
import { PanelContext } from './EditPage';
import { FaSave as SaveIcon } from "react-icons/fa";
import { FaFileExport as ExportIcon } from "react-icons/fa6";
import { ChromePicker } from 'react-color';
import { createTemplate } from "../../../services/templateService";
import { BsCardList as CardIcon} from "react-icons/bs";

function ExportButton(){
    return (
        <div>
            <ExportIcon className="panelButton"></ExportIcon>
        </div>
    );
}

function CardButton(){


    return (
        <div>
            <CardIcon className="panelButton"></CardIcon>
        </div>
    );
}



function SaveButton(){
    const { fabricRef } = useContext(PanelContext);

  const handleSave = async () => {
    if (!fabricRef.current) {
        alert("Canvas chưa khởi tạo");
        return;
    }

    const json = fabricRef.current.toJSON();
    const fabricEdit = JSON.stringify(json);

    const imgData = fabricRef.current.toDataURL({
        format: "png",
        multiplier: 0.5,
    });

    try {
        const res = await createTemplate({
        templateID: Date.now().toString(),
        name: "My Template",
        owner: null,
        imgURL: [imgData],
        fabricEdit,
        });
        console.log("Saved:", res.data);
        alert("Template saved!");
    } catch (err) {
        if (err.response) {
        console.error("Server error:", err.response.data);
        } else {
        console.error("Client error:", err.message);
        }
    }
    };


  return (
    <div onClick={handleSave}>
      <SaveIcon className="panelButton" />
    </div>
  );
}

export default function PropertiesPanel(){
    const {toggleSaveCard, setToggleSaveCard} = useContext(PanelContext);
    const {closePanels,setClosePanels} = useContext(PanelContext);
    const {layerSelected, setLayerSelected} = useContext(PanelContext);
    const {toolSelected, setToolSelected} = useContext(PanelContext);
    const {drawBrush, setDrawBrush} = useContext(PanelContext);
    const [brushSize, setBrushSize] = useState(15);
    const [brushColor, setBrushColor] = useState("blue");
    const [eraserSize, setEraserSize] = useState(15);
    


    return (
    <div className="relative h-full w-full pointer">
        <div id="propertiesContainer" className={`absolute right-0 h-full ${(!closePanels)?"w-full":"w-0"} bg-[#f8fafd] shadow-black shadow-md transition-all ease-in-out duration-700`}>
            {(!closePanels)&&
                <div id="propertiesNavigates" className="absolute right-4 bottom-0 w-auto h-[4rem] flex flex-row gap-x-8">
                    <div onClick={()=>{setToggleSaveCard((prev)=>!prev)}}>
                        <CardButton></CardButton>
                    </div>
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


                
            </div>
        </div>    
    </div>

    



    ); 
}