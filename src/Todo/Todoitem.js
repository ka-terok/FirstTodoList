import React, {useContext, useEffect, useState} from 'react'
import Context from '../context'
import PropTypes, { func } from 'prop-types'
import deteteTodo from './delete.png'
import Timer from './Timer'
import moment from 'moment';
moment.locale('ru')


function TodoItem({todo, index, onChange}){
    const{removeTodo}=useContext(Context)
    const{openModalChange}=useContext(Context)
    const classes=[]
    
    
    if (todo.completed){
        classes.push('done')       
    }
     
    const now = new Date();
   
    if (now > todo.deadline) {
        classes.push ('timeIsOver')
    }

           
    return (
        <div className="todo">
            <div className='todo2'>
                <div >  
                    <input className="option-input" 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={()=>onChange(todo.id)}
                    />
                </div> 
                <div className={classes.join(' ')} style={{paddingRight: '5px'}}>
                    {index+1 }
                </div>
                <div  className={'todoItem'+ ' '+ classes.join(' ')} >
                    {todo.title}                     
                </div> 
                <div className={"todoItemDate" + ' '+ classes.join(' ')} > 
                    {todo.deadline ? moment(todo.deadline).format('DD MMMM YYYY h:mm:s') : 'Без срока'}
                </div> 
                <div className={todo.completed ? 'closeTimer + todoItemDate2' : 'todoItemDate2' }>
                    <Timer deadline={todo.deadline}/>
                </div>
                <div className={'todoItemDate2'}> 
                    {!todo.completed ? '' : todo.done}   
                </div>
            </div> 
                <div className="todoChange" > 
                    <div className="changeCheif" onClick={()=>openModalChange(todo.id)}>Change</div>
                </div >
                <div className="todoDelete" onClick={()=> removeTodo(todo.id)}> 
                    <img className='wibro' src={deteteTodo} alt={'Удалить'}/>                 
                </div>
        </div>
         
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
    
}

export default TodoItem