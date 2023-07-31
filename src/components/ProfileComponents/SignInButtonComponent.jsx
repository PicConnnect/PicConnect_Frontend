import React from 'react';
export default function SignInButtonComponent({handleLogIn}) {
    return (
        <div>
            <button className="bg-[#0000FF] mb-2 items-center justify-center p-2 border-solid rounded" onClick={handleLogIn}><span className="text-white">Sign Out</span></button>
        </div>
    )
}
