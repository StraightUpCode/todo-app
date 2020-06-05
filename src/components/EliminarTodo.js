import  React, {useContext} from 'react'
import TodoContext from '../context/TodoContext'
import { Modal,Button } from 'antd'


const Eliminar = ({
    indice,
    showModal,
    closeModal
}) => {
    const {removeTodo} = useContext(TodoContext)


    const eliminarTodo = () => {
        removeTodo(indice)
    }

    return (
        <Modal
        visible={showModal}
        title="Seguro que quiere eliminar el Todo?"
        onOk={eliminarTodo}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>
            Return
          </Button>,
          <Button key="submit" type="primary"  onClick={eliminarTodo}>
            Eliminar
          </Button>,
        ]}
      >
      </Modal>
    )
}

export default Eliminar