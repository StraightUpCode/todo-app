import React from 'react'
import { Input, Form, Button, Modal, DatePicker } from 'antd'
import TodoItem from './TodoItem'
import TodoContext from '../context/TodoContext'



function TodoItems({todos=[]}) {

  
  return (
    <div className="container">
      <div className="row mt-4">
      {
        todos.map((todo, indice)=><TodoItem todo={todo} indice={indice}></TodoItem>)
      }
      </div>
    </div>
  )
}

export default TodoItems;
