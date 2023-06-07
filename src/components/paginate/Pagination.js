import React, { useState } from 'react'

import { VscChevronLeft,VscChevronRight } from "react-icons/vsc";

const Pagination = ({postPerPage,totalPosts,paginate,currentPage}) => {
    const pages = Math.ceil(totalPosts/postPerPage)
   
  return (
    
    <div style={{display:'flex',justifyContent:'center'}}>
    {currentPage<=1?<VscChevronLeft style={{marginTop:'10px'}}/>:<VscChevronLeft onClick={()=>paginate(--currentPage)} style={{marginTop:'10px'}}/>}    
            <h5>{currentPage}/{pages}</h5>
      {currentPage>=pages?<VscChevronRight style={{marginTop:'10px'}}/>:<VscChevronRight onClick={()=>paginate(++currentPage)} style={{marginTop:'10px'}}/>} 
    </div>
  )
}

export default Pagination