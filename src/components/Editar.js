import React, {useContext} from 'react'
import {Form, Modal, Button, Input, DatePicker} from 'antd'
import TodoContext from '../context/TodoContext'
import EliminarTodo from './EliminarTodo'
import {useModal} from '../hooks'
import { Select } from 'antd'
import moment from 'moment'


const {Option} = Select

const Editar = ({todo,indice ,closeEdit, showModal}) =>{
    const [ showDelete, openDelete, closeDelete ] = useModal()
    const context = useContext(TodoContext)
    console.log(context)
    console.log(todo)
    const cerrareliminar = () =>{
        closeDelete()
        closeEdit()
    }
    
    todo.endDate = moment(todo.endDate)
  
    const [form] = Form.useForm()
    const editTodo = e =>{

        /*const  formValues = form.getFieldsValue()
        console.log(formValues)
       const date = formValues.endDate ? formValues.endDate.format('DD-MM-YYYY') : undefined 
        console.log(date)
        formValues.endDate = date*/
       // console.log(formValues)
        
        console.log(form.getFieldsValue())
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
            <EliminarTodo showModal={showDelete} closeModal={cerrareliminar}indice={indice} ></EliminarTodo>

        ]}
        >
            <Form form={form}
                onFinish={editTodo}
                initialValues={(()=>{
                    console.log('Valores del Form  ',todo)
                    return todo
                })()}>
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
            name='status' >
            
            <Select style={{ width: 120 }} >
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
    
  
  
      )
  }


export default Editar