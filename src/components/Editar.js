import React, {useContext} from 'react'
import {Form, Modal, Button, Input, DatePicker} from 'antd'
import TodoContext from '../context/TodoContext'
import EliminarTodo from './EliminarTodo'
import {useModal} from '../hooks'


const Editar = ({todo,indice ,closeEdit, showModal}) =>{
    const [ showDelete, openDelete, closeDelete ] = useModal()
    const context = useContext(TodoContext)
    console.log(context)
    const [form] = Form.useForm()
    const editTodo = e =>{
        context.updateTodo (indice, form.getFieldsValue())
        closeEdit()
    }   
      return(
  
        <Modal id="modal" title='Edit Task'
        visible={showModal}
        onCancel={() => {
            console.log(closeEdit)
            console.log('Just Close GOD DAMMIT')
            closeEdit()
        }}
        footer={[
            <Button onClick={() => {
                console.log('Just Close GOD DAMMIT')
                closeEdit()
            }} >
                Cancel
            </Button>,
            <Button onClick={editTodo}>
                Submit
            </Button>,
            <Button onClick={openDelete}>
                Eliminar
            </Button>,
            <EliminarTodo showModal={showDelete} closeModal={closeDelete}indice={indice} ></EliminarTodo>

        ]}
        >
            <Form form={form}
             onFinish={editTodo}
             initialValues={todo}>
            <Form.Item
            label='Todo' 
            name='todo'>
                <Input/>
                </Form.Item> 
                <Form.Item
            label='Descripcion' 
            name='descripcion'>
            
                <Input/>
                </Form.Item> 
                <Form.Item
            label='Pendiente' 
            name='pendiente' >
            
                <Input type="radio" name="estado" value="notdone"/>
                </Form.Item> 
                <Form.Item
            label='Realizada' 
            name='Realizada'>
                <Input type="radio" name="estado" value="done"/>
                </Form.Item> 
  
  
                
                <Form.Item
                    label='Date'
                    name='date'
                >
                    <DatePicker ></DatePicker>
                </Form.Item>
            </Form>
    </Modal>
    
  
  
      )
  }


export default Editar