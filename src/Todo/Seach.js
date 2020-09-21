import React from 'react'

function Seach({changeTitle, title}) {

    return(
        <div className='seach'>
            <input className='inputForm' value={title} onChange={e=>changeTitle(e.target.value)}/>
        </div>
        )
    }

export default Seach