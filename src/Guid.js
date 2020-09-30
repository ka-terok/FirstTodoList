import React from 'react'
import Tour from 'reactour'
import './Modal/Modal.css'
import Context from './context'
import endTour from './endTour.png'

export default  class Guid extends React.Component {
    
    render() {
        
        const {openModalChange} = this.context;
        
        const steps = [{
            selector: '.first-step',
            content: 'This is your first time in the program. We will tell you how to use it ',
            style: {zIndex: 200}
            },
            {selector: '.addTodo',
            content: 'Click to add a new task',
            style: {zIndex: 200}
                },
            {selector: '.modal-body',
            content: 'Write the task and completion date',
            style: {zIndex: 200},
            action: node => {
                openModalChange()
                },
            },
            {selector: '.changeModal',
            content: 'Сlick save',
            style: {zIndex: 200}
                },
            {selector: '.wrapper',
            content: 'Your list of all tasks',
            style: {zIndex: 200}
                },
            {selector: '.first-step',
            style: {zIndex: 200},
            content:
                <div>Сongratulations you're ready to go!
                    <img style={{width: '70%', padding: '1rem'}} src={endTour} />
                </div>
                }
        ]
        return(   
            <div> 
            <Tour style={{zIndex: '200'}}
                isOpen={this.props.isTourOpen}
                onRequestClose = {this.props.closeTour}
                steps={steps}
                onAfterOpen={target => (document.body.style.overflowY = 'hidden')}
                />
            </div>
        )}
    }

Guid.contextType = Context;