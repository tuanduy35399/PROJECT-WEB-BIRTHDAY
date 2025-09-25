import './EditPage.css'
import { useState, useContext } from 'react';
import { PanelContext } from './EditPage';
import { FaSave as SaveIcon } from "react-icons/fa";
import { FaFileExport as ExportIcon } from "react-icons/fa6";


function ExportButton(){
    return (
        <div>
            <ExportIcon className="panelButton"></ExportIcon>
        </div>
    );
}

function SaveButton(){
    return(
    <div>
        <SaveIcon className="panelButton"></SaveIcon>
    </div>
    );
}

export default function PropertiesPanel(){
    const {closePanels,setClosePanels} = useContext(PanelContext);


    return (
        <div id="propertiesContainer" className="relative h-full w-full bg-[#f8fafd] shadow-black shadow-md">
            <div id="propertiesNavigates" className="absolute right-4 bottom-0 w-auto h-[4rem] flex flex-row gap-x-8">
                   <SaveButton></SaveButton>
                    <ExportButton></ExportButton>
            </div>
        </div>



    ); 
}