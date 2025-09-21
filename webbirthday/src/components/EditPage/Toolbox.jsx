import Tool from "./Tool";
import { useState } from "react";
export default function Toolbox({penMode, setPenMode}){
    const [colNum, setColNum] = useState(5);
    const [selected, setSelected] = useState("");
    const cols = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
        9: "grid-cols-9",
        10: "grid-cols-10",
    }[colNum];

    const toolNames =["hand","brush","image","rectangle","text"];
    function getSize(){ // lay size phu hop cho col
        return `w-[${colNum*5}rem]`;
    }

    return (
        <div className="bottom-[1rem] fixed w-screen h-[4.5rem] z-10">
            <div className={`relative mx-auto shadow-sm shadow-black grid ${cols} h-full ${getSize()} rounded-[15px] bg-[#81C4F0] items-center justify-items-center`}>
                    {
                        toolNames.slice(0,colNum).map((toolName)=>(
                            <Tool key={toolName} tool={toolName} selected={selected} setSelected={setSelected} penMode={penMode} setPenMode={setPenMode}></Tool>
                        ))

                    }
                    <div className="hover:shadow-xl absolute flex -right-5 -top-3 w-[2rem] h-[2rem] bg-[#81C4F0] text-[2rem] text-white font-bold items-center justify-center shadow-black shadow-sm"
                        onClick={()=>{if(colNum<=9){setColNum(colNum+1)}}}
                        >+</div>
                    <div className="hover:shadow-xl absolute flex -right-5 top-6 w-[2rem] h-[2rem] bg-[#81C4F0] text-[2rem] text-white font-bold items-center justify-center shadow-black shadow-sm"
                        onClick={()=>{if(colNum>=2){setColNum(colNum-1)}}}
                        >-</div>


            </div>
            

        </div>
    )
}