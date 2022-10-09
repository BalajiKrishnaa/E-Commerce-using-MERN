import React, { useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import './ToastMessage.css'
const ToastMessage = ({bg,msg,title}) => {
    const [show,setShow] = useState(true)
  return (
    <ToastContainer>
        <Toast bg={bg} onClose={()=>setShow(false)} show={show} delay={3000} autohide>
<Toast.Header>
    <strong className='me-auto'>{title}</strong>
    <small>now</small>
</Toast.Header>
<Toast.Body>{msg}</Toast.Body>
        </Toast>
    </ToastContainer>
  )
}

export default ToastMessage