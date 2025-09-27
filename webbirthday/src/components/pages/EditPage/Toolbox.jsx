import { IoMdBrush as BrushIcon } from "react-icons/io";
import { FaImage as ImageIcon} from "react-icons/fa";
import { MdOutlineRectangle as RectangleIcon } from "react-icons/md";
import { IoText as TextIcon } from "react-icons/io5";
import { useContext } from "react";
import { PanelContext } from "./EditPage";


export default function Toolbox(){
    const {toolNum, setToolNum} = useContext(PanelContext);
    const toolsList = [BrushTool, RectTool, ImageTool, TextTool];
    
    
    
    return (
        <div id="toolboxContainer" className="w-full h-full  shadow-black shadow-md bg-[#cde1f7] rounded-xl grid grid-cols-4 justify-items-center items-center">
            {toolsList.slice(0,toolNum).map((Tool, index)=>{
                
                return  <Tool key={index}></Tool>
            })}
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
