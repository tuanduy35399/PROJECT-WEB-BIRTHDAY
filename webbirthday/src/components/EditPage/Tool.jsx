
import { LuBrush } from "react-icons/lu";
import { FaFileImage } from "react-icons/fa6";
import { RiRectangleLine } from "react-icons/ri";
import { CiText } from "react-icons/ci";
import { IoHandRightOutline } from "react-icons/io5";


export default function Tool({tool="brush", selected,  setSelected, penMode, setPenMode}){
    const ToolIcon = {
        "brush": LuBrush,
        "image": FaFileImage,
        "rectangle": RiRectangleLine,
        "text":CiText,
        "hand":IoHandRightOutline,
    }[tool];
    const notSelected="flex w-[3rem] h-[3rem] hover:shadow-md shadow-black bg-white items-center justify-center rounded-[10px]"
    const isSelected="flex w-[3rem] h-[3rem] shadow-md shadow-black bg-white items-center justify-center rounded-[10px]"


    return (
        <div className={(tool==selected)?isSelected:notSelected}>
            <ToolIcon className="w-[60%] h-auto" onClick={()=>{if((tool)=="brush"){setPenMode((prev)=>!prev)};setSelected(tool)}}/>
        </div>

    );
}