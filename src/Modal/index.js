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
    componentDidMount() {
        if (this.props.isTourOpen) {
            this.exampleTask(0)
        }
    }
    render() {
        const {todo} = this.state; 
        const {closeModalChange} = this.context;
        const {saveTodo} = this.context;
    return (
        <React.Fragment > 
            <div className = "modal">
                <div className = "modal-body">
                    <div style={{display: 'flow-root'}}>
                        <button className="changeModalclose" style={{float: 'right'}} onClick={()=>{closeModalChange()}}>
                            <img alt={'Закрыть'} style={{width: '10px'}} src={iconClose}/>
                            </button>
                    </div>
                    <div className="edit" style = {{justifyContent: 'center',  fontWeight: 'bold'}}> 
                        <div className="editText">Edit task  </div>  
                    </div>
                    <div className = "edit"> 
                        <div className = "editText">Task</div>
                        <input className = 'inputModal' value={todo ? todo.title : null} onChange = {e=>this.setState({
                            todo: {
                                ...todo, 
                                title: e.target.value,
                                isOpen: false,
                            } 
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
                    <button className="changeModal" onClick = {() =>{
                        saveTodo(todo)
                        closeModalChange()
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