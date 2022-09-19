import React from 'react'
import { useSelector } from 'react-redux'

function PageButton() {

    const nextPage=useSelector((state)=>state.starships.page)
    
    return (
       <div style={{padding:30,textAlign:'center'}}>
        <button className='big ui inverted brown button'>More
       ({nextPage})
     
        </button>
        </div>
        
    )
}

export default PageButton
