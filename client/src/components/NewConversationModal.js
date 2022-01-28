import React, { useState } from 'react';
import { Modal,Form,Button } from 'react-bootstrap';
import { useContacts } from './contexts/ContactsContext';
import { useConversation } from './contexts/ConversationsContext';
const NewConversationModal = ({closeModal}) => {
  const [selectedContactIds,setSelectedContactIds]=useState([])
  const {contacts}=useContacts()
  const {createConversation} = useConversation()
  const handleCheckboxChange=(id)=>{
    setSelectedContactIds(prevIds=>{
      if(prevIds.includes(id)){
        return prevIds.filter(prevId=>{return id !==prevId})
      }else{
        return[...prevIds,id]
      }

    }
    
    )
    console.log(id);
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    createConversation(selectedContactIds)
    closeModal()
  }
  return (<>
    <Modal.Header closeButton>Create Conversation</Modal.Header>
  <Modal.Body>
      <Form onSubmit={handleSubmit}>
          {contacts.map(contact=>(
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check type='checkbox' value={selectedContactIds.includes(contact.id)} label={contact.name} onChange={()=>handleCheckboxChange(contact.id)}/>
            </Form.Group>
          ))}
          <Button type='submit'>Create</Button>
      </Form>
  </Modal.Body>
  
  </>);
};

export default NewConversationModal;
