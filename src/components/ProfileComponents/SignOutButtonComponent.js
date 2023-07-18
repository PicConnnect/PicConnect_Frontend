import React from 'react';
export default function SignOutButtonComponent({handleLogout}) {
    return (
        <div className="bg-[#D9D9D9] mb-2 flex flex-col items-center justify-center p-2">
            <button className="signOutButton" onClick={handleLogout}>Sign Out</button>
        </div>
    )
}
