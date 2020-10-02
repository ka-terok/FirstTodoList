import React from 'react'

function DashBoard ({todo}){
    const now = new Date()
    const todoCompleted = todo.filter(todo => todo.completed)
    const todoUnfulfilled = todo.filter(todo => !todo.completed)
    const todoOverdue = todo.filter(todo => todo.deadline < now ? todo : null)
    
    
    return (
        <div className='dashboard'>
            <div className='boxDashboard'>
                <div>
                    Done tasks
                </div>
                <div style={{fontSize: '34px', paddingTop: '5px'}}>
                    {todoCompleted.length}
                </div>
           </div>
           <div style={{backgroundColor: 'rgba(128, 64, 224, 0.7)'}} className='boxDashboard'>
                <div>
                    Unfulfilled
                </div>
                <div style={{fontSize: '34px', paddingTop: '5px'}}>
                    {todoUnfulfilled.length}
                </div>
           </div>
           <div style={{backgroundColor: 'rgba(224, 64, 80, 0.7)'}} className='boxDashboard'>
                <div>
                    Overdue tasks
                </div>
                <div style={{fontSize: '34px', paddingTop: '5px'}}>
                    {todoOverdue.length}
                </div>
           </div>
        </div>
    )
}

export default DashBoard