import React, {useContext, useState} from 'react'
import Context from '../context'
import PropTypes, { func } from 'prop-types'
import deteteTodo from './delete.png'
import Timer from './Timer'
import moment from 'moment';
import { max } from 'moment'
moment.locale('ru')


function TodoItem({todo, index, onChange}){
    const{removeTodo}=useContext(Context)
    const{openModalChange}=useContext(Context)
    const classes=[]
    const {importants} = useContext(Context)
    const now = new Date();
    const [inputValue, setInputValue] = useState(todo.importants)
    
    
    function checkInput(inputValue){
        importants(inputValue, todo.id)
        }

    function classImportance(){
        if(inputValue==="Urgent") {
            return 'changeCheifUrgent'
        } else {
            return 'changeCheif'
        }
    }

    function classImportanceMObal(){
        if(inputValue==="Urgent") {
            return 'buttonImportanceMobil'
        } else {
            return 'buttonMobil'
        }
    }

    function closeString(){
    if (todo.completed || (now > todo.deadline)) {
        return 'closeTimer todoItemDate2'        
    } else {
        return 'todoItemDate2'
        }
    } 

    function timeIsOver(){
        if (now > todo.deadline) {
            return 'todoIsOver'        
        } else if (todo.completed) {
            return 'done'
        } else {
            return 'todo mobilTodo'
        }
    }
    
    return (
        <div className={timeIsOver()}>
            <div className='todo2'>
                <div >  
                    <div className="stringMobil" >
                        <div className="buttonMobil" onClick={()=>onChange(todo.id)}>
                            Done
                        </div>
                        <div className="buttonMobil" onClick={() => openModalChange(todo.id)}>
                            Change
                        </div>
                        <div className="buttonMobil" onClick={()=> removeTodo(todo.id)}>
                            Delete
                        </div>
                    </div>
                    <input className="option-input" 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={()=>onChange(todo.id)}
                    />
                </div> 
                <div className={classes.join(' ')} style={{paddingRight: '5px'}}>
                    <div className="liMobal" >{index+1 }</div>
                </div>
                <div  style={{wordBreak: 'breakWord'}} className={'todoItem'+ ' '+ classes.join(' ')} >
                    <div className="textMobal">Task:</div> 
                    <div style={{wordBreak: 'breakWord'}}>{todo.title} </div>             
                </div> 
                <div className={"todoItemDate" + ' '+ classes.join(' ')} >
                    <div className="textMobal">Deadline:</div> 
                    {todo.deadline ? moment(todo.deadline).format('DD MMM YYYY h:mm:s') : 'Без срока'}
                </div> 
                <div className={closeString()}>
                    <div className={todo.completed ? 'closeTimer + textMobal' : 'textMobal'}>Before the deadline:</div>
                    <Timer deadline={todo.deadline}/>
                </div>
                <div className={'todoItemDate2'}> 
                    <div className={!todo.completed ? 'textMobal': 'textMobal'} >Done:</div>
                    {!todo.completed ? '' : todo.done}   
                </div>
            </div> 
                <div className="importanceModal">
                    <div className="textMobal">Importance:</div> 
                    <select  style={{width: '100%'}}  className={classImportanceMObal()} list="character" value={inputValue} onChange={e => {
                            setInputValue(e.target.value)
                            checkInput(e.target.value)
                            }}>
                                <option>Urgent</option>
                                <option>Normal</option>
                    </select> 
                </div>                
                <div className='todoChangeModal'>
                    <select  style={{width: '100%'}}  className={classImportance()} list="character" value={inputValue} onChange={e => {
                        setInputValue(e.target.value)
                        checkInput(e.target.value)
                        }}>
                            <option>Urgent</option>
                            <option>Normal</option>
                     </select>              
                </div>
                <div className="todoChangeModal" > 
                    <div className="changeCheif" onClick={() => openModalChange(todo.id)}>Change</div>
                </div >
                <div className="todoDelete" onClick={()=> removeTodo(todo.id)}> 
                    <img className='wibro' src={deteteTodo} alt={'Delete'}/>                 
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