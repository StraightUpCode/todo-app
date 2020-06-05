import React, {useContext} from 'react'
import {Form, Modal, Button, Input, DatePicker} from 'antd'
import TodoContext from '../context/TodoContext'
import EliminarTodo from './EliminarTodo'
import {useModal} from '../hooks'
import { Select } from 'antd'
const {Option} = Select

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
            
            <Select initialValues={todo} style={{ width: 120 }} >
                 <Option value="pendiente">Pendiente</Option>
                  <Option value="realizado">Realizado</Option>

                    </Select>
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