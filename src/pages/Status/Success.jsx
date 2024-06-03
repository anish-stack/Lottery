import React, { useEffect } from 'react'

const Success = () => {
    useEffect(()=>{
        setTimeout(() => {
            window.location.href="/"
        }, 2000);
    })
    return (
        <div className="flex items-center justify-center h-screen bg-orange-100">
            <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-3xl font-bold text-ornage-700">Game Purchase Success</h1>
            </div>
        </div>
    )
}

export default Success
