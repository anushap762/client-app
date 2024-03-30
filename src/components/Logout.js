import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate=useNavigate();
    const handleLogout=(()=>{
        if(sessionStorage.getItem("token")){
            sessionStorage.clear()
            navigate("/");
        }
    })
  return (
    <div>
      <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
