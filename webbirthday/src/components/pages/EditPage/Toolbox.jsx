import { IoMdBrush as BrushIcon } from "react-icons/io";
import { FaImage as ImageIcon} from "react-icons/fa";
import { MdOutlineRectangle as RectangleIcon } from "react-icons/md";
import { IoText as TextIcon } from "react-icons/io5";
import { useContext } from "react";
import { PanelContext } from "./EditPage";
import { FaEraser as EraserIcon} from "react-icons/fa";
import { FaHandSparkles as HandIcon } from "react-icons/fa";


export default function Toolbox(){
    const {toolNum, setToolNum} = useContext(PanelContext);
    const toolsList = [HandTool, BrushTool, EraserTool, RectTool, ImageTool, TextTool];
    function getColsNum(num){
        return `grid-cols-${num}`;
    }
    
    
    
    return (
        <div id="toolboxContainer" className={`relative w-full h-full  shadow-black shadow-md bg-[#cde1f7] rounded-xl grid ${getColsNum(toolNum)} justify-items-center items-center`}>
            {toolsList.slice(0,toolNum).map((Tool, index)=>{
                
                return  <Tool key={index}></Tool>
            })}
            <div onClick={()=>{setToolNum((prev)=>{if(prev+1<=10) return prev+1; else return prev;})}} className="toolNumButton translate-x-[20px] -translate-y-3 ">+</div>
            <div onClick={()=>{setToolNum((prev)=>{if(prev-1>=1) return prev-1; else return prev;})}} className="toolNumButton translate-x-[20px] translate-y-4 ">-</div>
        </div>

    );
}



//TOOLS

function BrushTool(){
    const {toolSelected, setToolSelected} = useContext(PanelContext);
    function handleBrush(){

        setToolSelected("brush")


    }

    return (
        (toolSelected!="brush")?
        <div 
            className="toolButton"
            onClick={()=>{handleBrush()}} 
        >

            <BrushIcon size={32}></BrushIcon>

        </div>
        :
        <div className="toolButtonSelected">

            <BrushIcon size={32}></BrushIcon>
        </div>
    );
}


function HandTool(){
    const {toolSelected, setToolSelected} = useContext(PanelContext);

    return (
        (toolSelected!="hand")?
        <div 
            className="toolButton"
            onClick={()=>{setToolSelected("hand")}} 
        >

            <HandIcon size={32}></HandIcon>

        </div>
        :
        <div className="toolButtonSelected">

            <HandIcon size={32}></HandIcon>
        </div>
    );
}


function ImageTool(){
    const {toolSelected, setToolSelected} = useContext(PanelContext);

    return (
        (toolSelected!="image")?
        <div 
            className="toolButton"
            onClick={()=>{setToolSelected("image")}} 
        >

            <ImageIcon size={32}></ImageIcon>

        </div>
        :
        <div className="toolButtonSelected">

            <ImageIcon size={32}></ImageIcon>
        </div>
    );
}
function EraserTool(){
    const {toolSelected, setToolSelected} = useContext(PanelContext);

    return (
        (toolSelected!="eraser")?
        <div 
            className="toolButton"
            onClick={()=>{setToolSelected("eraser")}} 
        >

            <EraserIcon size={32}></EraserIcon>

        </div>
        :
        <div className="toolButtonSelected">

            <EraserIcon size={32}></EraserIcon>
        </div>
    );
}

function RectTool(){
    const {toolSelected, setToolSelected} = useContext(PanelContext);

    return (
        (toolSelected!="rect")?
        <div 
            className="toolButton"
            onClick={()=>{setToolSelected("rect")}} 
        >

            <RectangleIcon size={32}></RectangleIcon>

        </div>
        :
        <div className="toolButtonSelected">

            <RectangleIcon size={32}></RectangleIcon>
        </div>
    );
}

function TextTool(){
    const {toolSelected, setToolSelected} = useContext(PanelContext);

    return (
        (toolSelected!="text")?
        <div 
            className="toolButton"
            onClick={()=>{setToolSelected("text")}} 
        >

            <TextIcon size={32}></TextIcon>

        </div>
        :
        <div className="toolButtonSelected">

            <TextIcon size={32}></TextIcon>
        </div>
    );
}
