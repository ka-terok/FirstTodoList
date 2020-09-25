import React from 'react'
import './Modal.css'
import moment from 'moment'
import Context from '../context';
import iconClose from './img_527860.png';
moment.locale('ru')

const todoTemplate = {
    id: null,
    title: '',
    completed: false,
    importants: 1
}
const example = "New task";

export default class Modal extends React.Component{
    state={
        todo: this.props.todo ? this.props.todo : todoTemplate,
    };

    async exampleTask(i) {
        this.state.todo.title === example
         ? this.setState({ 
            todo:{
                ...this.state.todo,
                deadline: moment(new Date())
                }
            }) 
            : await this.setState({
                 todo:{
                     ...this.state.todo,
                     title: example.slice(0, i)
                     }
            });
        setTimeout(() => this.exampleTask(i+1), 300)
    };
<<<<<<< HEAD
=======
    
>>>>>>> ae4a8bc767a4850ad51415f14efe53713470573a
    componentDidMount() {
        if (this.props.isTourOpen) {
            this.exampleTask(0)
        }
    }
<<<<<<< HEAD
=======

      
>>>>>>> ae4a8bc767a4850ad51415f14efe53713470573a
    render() {
        const {todo} = this.state; 
        const {closeModalChange} = this.context;
        const {saveTodo} = this.context;
    return (
        <React.Fragment > 
            <div className = "modal">
                <div className = "modal-body">
<<<<<<< HEAD
                    <div style={{display: 'flow-root'}}>
                        <button className="changeModalclose" style={{float: 'right'}} onClick={()=>{closeModalChange()}}>
                            <img alt={'Закрыть'} style={{width: '10px'}} src={iconClose}/>
                            </button>
                    </div>
=======
                    <div style={{display: 'flow-root'}}><button className="changeModalclose" style={{float: 'right'}} onClick={()=>{closeModalChange()}}><img alt={'Закрыть'} style={{width: '10px'}} src={iconClose}/></button>
                    </div>
                
>>>>>>> ae4a8bc767a4850ad51415f14efe53713470573a
                    <div className="edit" style = {{justifyContent: 'center',  fontWeight: 'bold'}}> 
                        <div className="editText">Edit task  </div>  
                    </div>
                    <div className = "edit"> 
                        <div className = "editText">Task</div>
<<<<<<< HEAD
                        <input className = 'inputModal' value={todo ? todo.title : null} onChange = {e=>this.setState({
=======
                        <input className = 'inputModal' value={todo ? todo.title : null} onChange = { e=>this.setState({
>>>>>>> ae4a8bc767a4850ad51415f14efe53713470573a
                            todo: {
                                ...todo, 
                                title: e.target.value,
                                isOpen: false,
<<<<<<< HEAD
                            } 
=======
                            }, 
>>>>>>> ae4a8bc767a4850ad51415f14efe53713470573a
                        })}  />
                    </div>
                    <div className="edit"> 
                        <div className="editText">Date</div>
                        <input className='inputModal' type="date" value={todo ? (todo.deadline && moment(todo.deadline).format('YYYY-MM-DD')) : ''} onChange={e=>{
                            this.setState({
                                todo: {
                                    ...todo, 
                                    deadline: e.target.value !== '' ? moment(e.target.value) : null
                                    }
                                })
                            }
                        }/>
                    </div>
<<<<<<< HEAD
                    <button className="changeModal" onClick = {() =>{
                        saveTodo(todo)
                        closeModalChange()
=======
                    <button className="changeModal" onClick = {() => {
                        saveTodo(todo);
                        closeModalChange();
>>>>>>> ae4a8bc767a4850ad51415f14efe53713470573a
                        } 
                        }>Save
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}
}

Modal.contextType = Context;