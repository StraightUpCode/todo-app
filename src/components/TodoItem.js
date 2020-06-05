import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { useModal } from '../hooks'
import Editar from './Editar'
import EliminarTodo from './EliminarTodo'
import TodoContext from '../context/TodoContext'
import moment from 'moment'

const TodoItem = ({ todo, indice }) => {

    const [showEdit, openEdit, closeEdit] = useModal()

    const [showDelete, openDelete, closeDelete] = useModal()
    console.log(todo)

    console.log('Show Edit Modal', showEdit)

    const date = moment(todo.endDate).format('DD-MM-YYYY')

    return (
        <div className="col-md-4 mb-4">
        <div id="todo1" class="card mt-4 todo  ">
            <div id="cuerpecito" className="  blockquote card-body text-center">
                <div class="h3">{`${todo.todo}`}</div>
                <div class=" h6   my-3 ">{date}</div>
                <div class="h5">{`${todo.status}`}</div>
                <hr class="my-2"></hr>
                {
                    `${todo.descripcion}`
                }
                <hr class="my-2"></hr>
                <Button onClick={openEdit}>Editar</Button>
                {/* <button id="editar"  onClick={openEdit}class="  mt-2 btn btn-warning   my-1  mx-4 active" onClick={openEdit}>Editar</button>
            <button id="eliminar" class="mt-2 btn btn-warning   my-1  mx-4 active" onClick={openDelete}>Eliminar</button> */}
                <Editar onClick={e => e.stopPropagation() }showModal={showEdit} closeEdit={closeEdit} todo={todo} indice={indice}> </Editar>

            </div>
        </div>
         </div>
    )

}

export default TodoItem