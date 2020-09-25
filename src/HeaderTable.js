import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import Context from './context'
import iconFilter from './filterIcon.png'


function HeaderTable (){
    const {openModalChange}=useContext(Context)
    const {completedAll}=useContext(Context)
    const {deleteСompleted}=useContext(Context)
    const {deleteCookie}=useContext(Context)
    const {changeFilterState}=useContext(Context)
    const [openDiv, setOpenDiv]= useState("panelFilters")
    const {openGuid}=useContext(Context)
    
    
    function openFilters (){
        openDiv === "panelFilters" ? setOpenDiv('openFilters') :setOpenDiv('panelFilters')
    }
    return (
        <div>
            <div>
                <div className='panel'>
                    <div className='completedAll' onClick={()=> openGuid()}> Start learn</div> 
                    <div className='clearCookie' onClick={() => deleteCookie('cookieTodo')}>Clear Cookie</div>
                    <div className='deleteСompleted' onClick={()=> deleteСompleted()}> Delete сompleted</div>
                    <div className='completedAll' onClick={()=> completedAll()}> Completed All</div> 
                    <div className='addTodo' onClick={()=>openModalChange()}>Add todo</div>
                </div>
            </div>   
            <div className='panel'>
               <div className='filter' onClick={()=>openFilters()}> 
                    <div className='textFilter'>
                        Filter
                    </div>
                    <div>
                        <img style={{width: '25px', }} src={iconFilter}/>
                    </div>
               </div>
            </div> 
            <div className={openDiv}>
                    <div className='buttomFilters' onClick={()=>changeFilterState("lessToBig")}>
                        Important ▲
                    </div >
                    <div className='buttomFilters' onClick={()=>changeFilterState("bigToLess")} >
                        Important ▼
                    </div>
                    <div className='buttomFilters' onClick={()=>changeFilterState("alphabetBigToLess")}>
                        Title A-z▼ 
                    </div>
                    <div className='buttomFilters'onClick={()=>changeFilterState("alphabetLessToBig")}>
                        Title A-z▲ 
                    </div>
                    <div className='buttomFilters'onClick={()=>changeFilterState("leghtBigToLess")}>
                        Lenght title ▼ 
                    </div>
                    <div className='buttomFilters'onClick={()=>changeFilterState("leghtLessToBig")}>
                        Lenght title ▲  
                    </div>
            </div>

            <div className="nameTable">
                <div style={{width: '40%'}}>Task</div> 
                <div style={{width: '10%'}}>Deadline</div>
                <div style={{width: '17%', textAlign: 'center'}}>Before the <br/>
                 deadline</div>
                <div style={{width: '12%', textAlign: 'center'}}>Done</div>
                <div style={{width: '9%', textAlign: 'center'}}>Imp(1-5)</div>
                <div style={{width: '12%', textAlign: 'center'}}></div>
            </div>
        </div>
        
    )
}

export default HeaderTable