import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import moment from 'moment';
import Modal from './Modal/index';
import Seach from './Todo/Seach'
import Guid from './Guid';

moment.locale('ru')

const filterTemple={
  title: '',
  }

function App() {
  const [todos, setTodos] = React.useState([])
  const [modalIsOpen, setOpen] = React.useState(false)
  const [activeTodoId, setActiveTodoId] = React.useState(false)
  const [filters, setFilters] = React.useState(filterTemple)
  const [loading, setLoading] = React.useState(true)
  const [isOpenGuid, setOpenGuid]=React.useState(true)

useEffect(()=>{
  if ( getCookie('cookieTodo') === undefined ) {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(response => response.json())
    .then(todos => {
      todos=todos.map(item => {
        const myDate  = randomDate(new Date(2020, 9, 8), new Date());
        item.deadline = moment(myDate);
        item.completed && (item.done = moment(new Date()).format('DD MMMM YYYY h:mm:s'))
        return item
        })
        setTodos(todos)
        document.cookie = `cookieTodo=${JSON.stringify(todos)}`
        setLoading(false)  
    }) 
  } else {
    setTodos(JSON.parse(getCookie('cookieTodo')))
    setLoading(false)
  }
}, [])

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
  window.location.reload()
}

function randomDate(start, end) {
  return new Date(start.getTime()+ Math.random() * (end.getTime() - start.getTime()));
}

function openModalChange(id) {
  setOpen(true)
  setActiveTodoId(id)
}

function closeModalChange () {
  setOpen(false)
  }

function  toggleTodo(id) {
  const newTodos=todos.map(todo =>{
    if(todo.id===id){
    todo.completed=!todo.completed
    todo.done = moment(new Date()).format('DD MMMM YYYY h:mm:s')
   }
   return todo
  })
  setTodos(newTodos) 
  document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`;
}

function removeTodo(id){
  const newTodos=todos.filter(todo=>todo.id !==id)
  setTodos(newTodos);
  document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`;
  }

function saveTodo (todo) {
  if (todo && todo.id) {
      const newTodos = todos.map(todoO => todoO.id === todo.id ? todo : todoO)
      setTodos(newTodos)
      document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`
    }       
    else {
      const newTodos=todos.concat({
          title: todo.title,
          id: Date.now(), 
          completed: false,
          deadline: todo.deadline,
          done: todo.done,
          })
      setTodos(newTodos)
      document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`};
}

function deleteСompleted () {
  const newTodos = todos.filter(todoO => !todoO.completed)
  setTodos(newTodos)
  document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`
}  

function completedAll () {
  const newTodos = todos.map(item => {
    item.completed = true
    item.done = moment(new Date()).format('DD MMMM YYYY h:mm:s')
    return item
   })
  console.log(newTodos)
  setTodos(newTodos)  
  document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`  
  }

function filter() {
  return todos.filter(todo =>  todo.title.indexOf(filters.title) !== -1)
}

function handleChange(title) {
  setFilters({
    ...filters, 
    title,
  })
}

function closeGuid(){
  setOpenGuid(false)
}



return (
    <Context.Provider value={{removeTodo, openModalChange, closeModalChange, saveTodo} }>
      <div className='wrapper'>
        <h1>The purpose of my life</h1>     
        <React.Suspense fallback={<Loader />}>
        <Seach changeTitle={handleChange} title={filters.title}/>
        </React.Suspense>
        <div className='panel'>
        <div className='addTodo' data-tut='reactur__state' onClick={()=>openModalChange()}>Add todo</div> 
          <div className='completedAll' onClick={()=> completedAll()}> Completed All</div>
          <div className='deleteСompleted' onClick={()=> deleteСompleted()}> Delete сompleted</div>
          <div className='clearCookie' onClick={()=>deleteCookie('cookieTodo')}>Clear Cookie</div>
        </div>
        <div className="nameTable">
          <div style={{width: '25%'}}>Task</div> 
          <div style={{width: '22%'}}>Deadline</div>
          <div style={{width: '26%', textAlign: 'center'}}>Before the deadline</div>
          <div style={{width: '16%', textAlign: 'center'}}>Done</div>
          <div style={{width: '15%', textAlign: 'center'}}></div>
        </div>
        {loading && <Loader />}
        {todos.length ? (<TodoList className='test' todos={filter()}  onToggle={toggleTodo} />) : (loading ? null : <p> No todos </p>)}
        {modalIsOpen && <Modal className='test' isTourOpen={isOpenGuid} todo={todos.find(todo=>todo.id == activeTodoId)}/>} 
        <Guid  closeTour={closeGuid} isTourOpen={isOpenGuid}/>
        
      </div>   
    </Context.Provider>
  );
}

export default App;