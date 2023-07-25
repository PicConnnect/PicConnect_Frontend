import React from 'react'

export default function CustomChooseFileButton({fileName}) {
  return (
    <div className="flex">
        <div className="hover:bg-[#9da6acb6] border-2 border-[#6164657d] cursor-pointer w-48 h-8 active:bg-[#ebf0f37d] transition-colors duration-300 ease-in-out">
            <span >Choose File</span>
        </div>
        <div>
            <p className="w-48 h-8 items-center flex ml-1">{fileName?fileName: 'No File Selected'}</p>
        </div>
    </div>
  )
};
