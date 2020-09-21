import React from 'react'
import Tour from 'reactour'
import './Modal/Modal.css'
import Context from './context'

const steps = [{
    selector: '.first-step',
    content: 'This is your first time in the program. We will tell you how to use it ',
}, {
    selector: '.addTodo',
    content: 'Click to add a new task',    
    },
    {
    selector: '.modal-body',
    content: 'Write the task and completion date',
    },
    {selector: '.changeModal',
        content: 'Сlick save',
        }
]

export default  class Guid extends React.Component {
    constructor() {
        super ();        
        this.state = { 
            isTourOpen: true
        }   
    }

    closeTour = () => {
        this.setState({ isTourOpen: false });
        }

    render() {
        const {openModalChange}= this.context;
        return(   
            <div> 
            <Tour
                isOpen={this.state.isTourOpen}
                steps={steps}
                />
            </div>
        )}
    }

Guid.contextType =Context;