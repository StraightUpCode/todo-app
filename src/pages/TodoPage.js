import React, {useState, useEffect, useContext} from 'react'
import { Input, Form, Button, Modal, DatePicker } from 'antd'
import TodoContext from '../context/TodoContext'
import UserContext from '../context/UserContext'
import TodoItems from '../components/TodoItems'
import { useModal } from '../hooks'
import { Select } from 'antd'
const {Option} = Select
// const API_ROUTE='localhost:3000'
const API_ROUTE = 'https://pwa-postgre.herokuapp.com'

const TodoPage = (props) => {
    const [todoItems, setTodoItems] = useState([])
    const {user} = useContext(UserContext)
    console.log('use State')
    const [showModal, openModal, closeModal] = useModal()
    const [form] = Form.useForm()

    const updateTodo = (indice, nuevoTodo) => {
        console.log('Update Todo Indice', indice)
        const nuevoTodoList = [...todoItems]
        const updatedTodo = {
            ...nuevoTodoList[indice],
            ...nuevoTodo
        }
        console.log(nuevoTodo)
        console.log(updatedTodo)
        nuevoTodoList[indice] = updatedTodo
        setTodoItems(nuevoTodoList)
        console.log(updatedTodo)
        fetch(`${API_ROUTE}/api/${user}/todos/${updatedTodo.id}`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })
            .then(res => res.json())
            .then(res => {
                console.log("res", res)
            })
    }

    const removeTodo = index => {
        const nuevoTodoList = [...todoItems]
        const deleted = nuevoTodoList.splice(index, 1)[0]
        console.log('Nuevo Todo List Eliminat', nuevoTodoList)
        setTodoItems(nuevoTodoList)
        fetch(`${API_ROUTE}/api/${user}/todos/${deleted.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                console.log("res", res)
                
            })
    }

    useEffect(() => {
        fetch(`${API_ROUTE}/api/${user}/todos`)
            .then(res => res.json())
            .then((data) => {
                setTodoItems(data)
            })
    }, [])




    const addTodo = e => {
        // Gets Raw Data from the Form
        // Transform the Date into usable format
        const todo = form.getFieldsValue()
        console.log(todo)
        fetch(`${API_ROUTE}/api/${user}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(todo)

        })
            .then(res => res.json())
            .then(res => {
                console.log("res", res)
            })

        console.log(todo)
        // Adds the Todo Item to the array

        // Resets Form
        console.log(form)
        form.resetFields()
        // Closes the Form
        closeModal()
        setTodoItems([...todoItems, todo])
    }




    console.log('Todo', todoItems)
    console.log('Show Modal', showModal)


    return (
        <React.Fragment>
            <h1 className="text-center mt-2" > Things To Do</h1>
            <div className="text-center" >      <Button id="addtodo" onClick={openModal}> ADD </Button></div>

            <Modal id="modal" title='Add Form'
                visible={(() => {
                    console.log('Show Modal Add Form', showModal)
                    return showModal
                })()}
                onCancel={closeModal}
                footer={[
                    <Button onClick={closeModal} >
                        Cancel
                </Button>,
                    <Button onClick={addTodo}>Submit</Button>
                ]}
            >
                <Form form={form} >
                    <Form.Item
                        label='Todo'
                        name='todo'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Descripcion'
                        name='descripcion'
                    >

                        <Input />
                    </Form.Item>
                    <Form.Item
                label='Estado' 
                name='status' 
               >
                
                <Select initialValues="pendiente" style={{ width: 120 }} >
                 <Option value="pendiente">Pendiente</Option>
                  <Option value="realizado">Realizado</Option>

                    </Select>
                    </Form.Item> 
                    
    
                    
                    <Form.Item
                        label='Date'
                        name='endDate'
                    >
                        <DatePicker ></DatePicker>
                    </Form.Item>
                </Form>
            </Modal>

            <TodoContext.Provider value={{ todoList: todoItems, updateTodo, removeTodo }}><TodoItems todos={todoItems}></TodoItems></TodoContext.Provider>




        </React.Fragment>


    )
}





export default TodoPage