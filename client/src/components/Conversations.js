import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from './contexts/ContactsContext';
import { useConversation } from './contexts/ConversationsContext';

const Conversations = () => {
  const {conversation,selectConversationIndex}=useConversation()
  console.log(conversation);
  return (<ListGroup variant='flush'>{conversation.map((convo,index)=>(
    <ListGroup.Item key={index} action active={convo.selected} onClick={()=>selectConversationIndex(index)}>{convo.recipients.map(r=>r.name).join(',')}</ListGroup.Item>
  ))}</ListGroup>
  );
};

export default Conversations;
