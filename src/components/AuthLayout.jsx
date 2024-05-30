import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authantication = "true"}) {
    const navigate = useNavigate();
    const [loading,setloading] = useState(true);
    const authStatus = useSelector((state) => state.auth?.status);

    useEffect(() => {
        if(authantication && authStatus !== authantication){
            navigate("/login");
        }else if(!authantication && authStatus !== authantication){
            navigate("/");
        }
        setloading(false)
    },[authStatus,authantication],navigate)

  return ( loading ? <p>Loding...</p>:<>{children}</> )
}
