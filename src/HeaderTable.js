import React, {useContext, useState} from 'react'
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
    const [importance, setImportance]= useState('bigToLess')
    
    function changeFiltersImportance (){
        importance === 'bigToLess'? setImportance("lessToBig") : setImportance('bigToLess')
    }
    
    function openFilters (){
        openDiv === "panelFilters" ? setOpenDiv('openFilters') : setOpenDiv('panelFilters')
    }
    return (
        <div>
            <div>
                <div className='panel'>
                    <div className='completedAll buttonMobil' onClick={()=> openGuid()}> Start learn</div> 
                    <div className='clearCookie buttonMobil' onClick={() => deleteCookie('cookieTodo')}>Clear Cookie</div>
                    <div className='deleteСompleted buttonMobil' onClick={()=> deleteСompleted()}> Delete сompleted</div>
                    <div className='completedAll buttonMobil' onClick={()=> completedAll()}> Completed All</div> 
                    <div className='addTodo buttonMobil' onClick={()=>openModalChange()}>Add todo</div>
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
                    <div className='buttomFilters buttonMobil' onClick={()=>{
                        changeFiltersImportance ();
                        changeFilterState(importance)
                    }}>
                        Important ▲▼
                    </div >
                    <div className='buttomFilters buttonMobil' onClick={()=>changeFilterState("alphabetBigToLess")}>
                        Title A-z▼ 
                    </div>
                    <div className='buttomFilters buttonMobil'onClick={()=>changeFilterState("alphabetLessToBig")}>
                        Title A-z▲ 
                    </div>
                    <div className='buttomFilters buttonMobil'onClick={()=>changeFilterState("leghtBigToLess")}>
                        Lenght title ▼ 
                    </div>
                    <div className='buttomFilters buttonMobil'onClick={()=>changeFilterState("leghtLessToBig")}>
                        Lenght title ▲  
                    </div>
            </div>
            <div className="nameTable">
                <div style={{width: '35%'}}>Task</div> 
                <div style={{width: '10%'}}>Deadline</div>
                <div style={{width: '13%', textAlign: 'center'}}>Before the <br/>
                 deadline</div>
                <div style={{width: '12%', textAlign: 'center'}}>Done</div>
                <div style={{width: '13%', textAlign: 'center'}}>Imp(1-5)</div>
                <div style={{width: '12%', textAlign: 'center'}}></div>
            </div>
        </div>
        
    )
}

export default HeaderTable