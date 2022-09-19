import React from 'react'

function Error({message}) {
    return (
        <div className='continer'>
            <div className="ui equal width grid">
                <div  className="column"></div>
                <div style={{backgroundColor:"red",width:"100px",height:"200px",marginTop:"40px"}} className="column">

                    <span style={{color:"white",fontSize:"20px"}}>
                        <strong>Error : </strong> {message}
                    </span>
                </div>
                <div className="column"></div>

            </div>
            
        </div>
    )
}

export default Error
