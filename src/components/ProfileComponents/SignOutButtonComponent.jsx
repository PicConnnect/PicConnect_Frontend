import React from 'react';
export default function SignOutButtonComponent({handleLogout}) {
    return (
        <div>
            <button className="bg-[#eb2b2b] mb-2 items-center justify-center p-2 border-solid rounded" onClick={handleLogout}><span className="text-white">Sign Out</span></button>
        </div>
    )
}
