import React ,{useContext, useState}from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsContext';
const ConversationContexts=React.createContext()

export const useConversation=()=>{
    return useContext(ConversationContexts)
}
export const ConversationContext = ({children}) => {
    const [conversation,setConversation]= useLocalStorage('conversation',[])
    const [selectedConversationIndex,setSelectedConversationIndex]=useState(0)
    const {contacts} = useContacts()
    const createConversation=(recipients)=>{
        setConversation(prevConversation=>{return[...prevConversation,{recipients,messages:[]}]})
    }
 const formattedConversations=conversation.map((convo,index)=>{
     const recipients=convo.recipients.map(recipient=>{
         const contact=contacts.find(contact=>{
             return contact.id=== recipient
         })
         const name=(contact&&contact.name) || recipient
         return {id:recipient,name}
     })
     const  selected=index===selectedConversationIndex
     return{...convo,recipients,selected}
 })
 const value={conversation:formattedConversations,createConversation,selectConversationIndex:setSelectedConversationIndex,selectedConversation:formattedConversations[selectedConversationIndex]}
  return (<ConversationContexts.Provider value={value}>
      {children}
  </ConversationContexts.Provider>);
};
 
