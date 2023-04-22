import { useState, useEffect } from 'react'
import './App.scss'
import { IUser, ITodo } from './types/types'
import axios from "axios";

function App(){
  const [users, setUsers] = useState<IUser[]>([])
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchUsersData();
    fetchTodosData(10);
  }, []);

  async function fetchUsersData(limit?: number){
    try{
      let link: string = `https://jsonplaceholder.typicode.com/users`;  
      if (limit) link = `https://jsonplaceholder.typicode.com/users?_limit=${limit}`;
      
      const response = await axios.get<IUser[]>(link);
      setUsers(response.data);
    }catch{
      alert("Error");
    }
  }

  async function fetchTodosData(limit?: number){
    try{
      let link: string = `https://jsonplaceholder.typicode.com/todos`;  
      if (limit) link = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`;
      
      const response = await axios.get<ITodo[]>(link);
      setTodos(response.data);
    }catch{
      alert("Error");
    }
  }



  return (
    <div className="App">
      <h2>Users List:</h2>
      <ul>
        {users.map(user => 
          <li key={user.id}>{user.id}. {user.name} 
            <ul className='info'>
              <li>Email: {user.email}</li>
              <li>Username: {user.username}</li>
            </ul>
          </li>  
        )}
      </ul>
      <h2>Todos:</h2>
      <ul>
        {todos.map(todo => 
          <li key={todo.id}>{todo.id}. {todo.title}</li>  
        )}
      </ul>
    </div>
  )
}

export default App
