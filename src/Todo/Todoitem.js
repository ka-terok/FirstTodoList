<<<<<<< HEAD
import React, {useContext, useState} from 'react'
=======
import React, {useContext} from 'react'
>>>>>>> ae4a8bc767a4850ad51415f14efe53713470573a
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
        if ((inputValue) !== "") {
        let newValue = parseInt(inputValue, 10)
        if (!isNaN(newValue)) {
            if (newValue < 6) { 
                importants(newValue, todo.id)
                } else {
                    alert('Write 0-5')
                    setInputValue('')     
                    }
            } else if (newValue = '') {
                setInputValue('')
            } else {
                alert('Write 0-5')
                setInputValue('') 
            }} else {
                setInputValue('') 
            }
        }

    if (todo.completed){
        classes.push('done')       
    }
    
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
                    {todo.deadline ? moment(todo.deadline).format('DD MMM YYYY h:mm:s') : 'Без срока'}
                </div> 
                <div className={todo.completed ? 'closeTimer + todoItemDate2' : 'todoItemDate2' }>
                    <Timer deadline={todo.deadline}/>
                </div>
                <div className={'todoItemDate2'}> 
                    {!todo.completed ? '' : todo.done}   
                </div>
            </div> 
                <div> 
                    <input className='important' value={inputValue} onChange={e => {
                        setInputValue(e.target.value)
                        checkInput(e.target.value)
                        }}
                    />
                </div>
                <div className="todoChange" > 
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