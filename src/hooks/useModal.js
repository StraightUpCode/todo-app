import { useState } from "react"


export default () => {
    const [showModal , setShowStatus] = useState(false)

    const openModal = e => {
        e.preventDefault()
        console.log(e.target)
        console.log('open Modal')
        setShowStatus(true)
    }
    const closeModal = e => {
        console.log('closeModal', true)
        setShowStatus(false)
    }


    return [ showModal, openModal, closeModal]
}