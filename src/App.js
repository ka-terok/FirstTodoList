import React, {useEffect} from 'react'
import {
  Route,
  Switch,
  Redirect
} from "react-router";
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import moment from 'moment';
import Modal from './Modal/index';
import Seach from './Todo/Seach'
import Guid from './Guid';
import HeaderTable from './HeaderTable';
import Login from './Modal/login'
import Register from './Modal/Register';

moment.locale('ru')

const filterTemple={
  title: '',
  important: '',
  length: ''
  }

function App(props) {
  const [todos, setTodos] = React.useState([])
  const [modalIsOpen, setOpen] = React.useState(false)
  const [activeTodoId, setActiveTodoId] = React.useState(false)
  const [filters, setFilters] = React.useState(filterTemple)
  const [loading, setLoading] = React.useState(true)
  const [isOpenGuid, setOpenGuid]=React.useState(false)
  const [openRegister, setOpenRegister]=React.useState(false)
  const [openLogin, setOpenLogin]=React.useState(false)


useEffect(()=>{
  setOpenLogin(true)
  if (getCookie('cookieTodo') === undefined || getCookie('cookieTodo').length === 2) {
    if (getCookie('visits') === 'old user') {
      loadTodos ()
      document.cookie = `cookieTodo=${JSON.stringify(todos)}`
      setLoading(false)
      } else {
      loadTodos ()
      document.cookie = `cookieTodo=${JSON.stringify(todos)}`
      setLoading(false)
      setOpenGuid(true)
      document.cookie = "visits=old user"
    }} else {
      setTodos(JSON.parse(getCookie('cookieTodo')))
      setLoading(false)
      setOpenGuid(false)
  }}, [] )

function loadTodos () {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(todos => {
        todos=todos.map(item => {
          const myDate  = randomDate(new Date(2020, 9, 8), new Date());
          item.deadline = moment(myDate);
          item.completed && (item.done = moment(new Date()).format('DD MMM YYYY h:mm:s'))
          item.importants = "Normal" 
          return item
          })
          setTodos(todos)
        })
      }

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

function openRegistrForm (){
  setOpenRegister(true)
}

function closeRegistrForm (){
  setOpenRegister(false)
}

function closeLoginForm (){
  setOpenLogin(false)
}

function openLoginForm (){
  setOpenLogin(true)
}

function openModalChange(id) {
  setOpen(true)
  setActiveTodoId(id)
}

function closeModalChange () {
  setOpen(false)
  }

function toggleTodo(id) {
  const newTodos=todos.map(todo =>{
    if(todo.id===id){
    todo.completed=!todo.completed
    todo.done = moment(new Date()).format('DD MMM YYYY h:mm:s')
   }
   return todo
  })
  setTodos(newTodos) 
  document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`;
}

function removeTodo(id){
  const doIt = window.confirm (`Are you sure ?`)
    if (doIt) {
      const newTodos=todos.filter(todo=>todo.id !==id)
      setTodos(newTodos);
      document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`;
    } else {
      alert(`Ok we won't do it `)
    }
  }

function saveTodo (todo) { 
  const doIt = window.confirm (`Are you sure you want to add a task?`);
  if (doIt) {
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
          importants: todo.importants,
          })
      setTodos(newTodos)
      document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`} 
    } else {alert(`Ok we won't do it `) }
}

function deleteСompleted () {
  const doIt = window.confirm (`Are you sure ?`)
    if (doIt) {
    const newTodos = todos.filter(todoO => !todoO.completed)
    setTodos(newTodos)
    document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`
    } else {
      alert(`Ok we won't do it `)
    }
}  

function completedAll () {
  const newTodos = todos.map(item => {
    item.completed = true
    item.done = moment(new Date()).format('DD MMM YYYY h:mm:s')
    return item
   })
  setTodos(newTodos)  
  document.cookie = `cookieTodo=${JSON.stringify(newTodos)}`  
  }

function filter() {
  return  todos
  .filter(todo => todo.title.indexOf(filters.title) !== -1)
  .sort(filterImportant())
}

function changeFilterState(value) {
  switch (value) {
    case "lessToBig": 
    setFilters({
      ...filters,
      important: "lessToBig",
    });
    break;
    case "bigToLess": 
    setFilters({
      ...filters,
      important: "bigToLess",
    });
    break;
    case "alphabetBigToLess": 
    setFilters({
      ...filters,
      important: "",
      length: "alphabetBigToLess",
    });
    break;
    case "alphabetLessToBig": 
    setFilters({
      ...filters,
      important: "",
      length: "alphabetLessToBig",
    });
    break;
    case "leghtBigToLess": 
    setFilters({
      ...filters,
      important: "",
      length: "leghtBigToLess",
    });
    break;
    case "leghtLessToBig": 
    setFilters({
      ...filters,
      important: "",
      length: "leghtLessToBig",
    });
    break;
  }
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

function openGuid(){
  setOpenGuid(true)
}

function checkРassword() {
  while (login != 'sekret') {
    var login = prompt('Enter the password', '')
  }
}

function importants(newValue, id) {
  setTodos(todos.map(item =>{
    if (item.id === id) {
    item.importants = newValue
    return item
    } else {
      return item
    }
  })) 
  document.cookie = `cookieTodo=${JSON.stringify(todos)}`
}

function filterImportant(){
  if (filters.important==="lessToBig") {
    return (prev, next) => {
      if ( prev.importants === 'Normal' ) return -1;
      if ( next.importants === 'Urgent' ) return 1;
    }
  } else if(filters.important === "bigToLess") {
    return (prev, next) => {
    if ( prev.importants === 'Urgent' ) return -1;
    if ( next.importants === 'Normal' ) return 1;
    }
  } else if(filters.length === "alphabetBigToLess") {
    return (prev, next) => {
      if ( prev.title < next.title ) return -1;
      if ( prev.title > next.title ) return 1;
    }
  } else if (filters.length === "alphabetLessToBig") {
    return (prev, next) => {
      if ( prev.title > next.title ) return -1;
      if ( prev.title < next.title ) return 1;
    }
  } else if(filters.length === "leghtBigToLess") {
      return (prev, next) => next.title.length - prev.title.length;
    } else if(filters.length === "leghtLessToBig") {
      return (prev, next) => prev.title.length - next.title.length;
    }  
  }

return (
    <Context.Provider value={{removeTodo, openModalChange, closeLoginForm, closeRegistrForm, openLoginForm,  openRegistrForm, openGuid, closeModalChange, saveTodo, completedAll, deleteСompleted, deleteCookie, changeFilterState, importants, filter}}>
      <div className='wrapper'>
        <Route history={props.history} path='/'>
          {openLogin && <Login/>}
        </Route>
        <Route history={props.history} path='/register'>
          {openRegister && <Register />}
        </Route>
        <Switch>
          <Route history={props.history} path='/app' >
          <h1>Todo list </h1> 
          <React.Suspense fallback={<Loader />}>
          <Seach changeTitle={handleChange} title={filters.title}/>
          </React.Suspense>
          < HeaderTable  />
          {loading && <Loader />}
        
          {todos.length ? (<TodoList className='test' todos={filter()}  onToggle={toggleTodo} />) : (loading ? null : <p> No todos </p>)}
          
          {modalIsOpen && <Modal  isTourOpen={isOpenGuid} todo={todos.find(todo=>todo.id == activeTodoId)}/>} 
          <Guid  closeTour={closeGuid} isTourOpen={isOpenGuid}/>
          </Route>
          <Redirect from='/' to='/home'/>
        </Switch>
      </div> 
    </Context.Provider>
  );
}

export default App;