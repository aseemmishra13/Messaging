import React ,{useCallback, useContext, useEffect, useState}from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsContext';
import { useSocket } from './SocketProvider';
const ConversationContexts=React.createContext()

export const useConversation=()=>{
    return useContext(ConversationContexts)
}
export const ConversationContext = ({id,children}) => {
    const [conversation,setConversation]= useLocalStorage('conversation',[])
    const [selectedConversationIndex,setSelectedConversationIndex]=useState(0)
    const {contacts} = useContacts()
    const socket = useSocket()


    const createConversation=(recipients)=>{
        setConversation(prevConversation=>{return[...prevConversation,{recipients,messages:[]}]})
    }


    const addMessageToConversation=useCallback(({recipients,text,sender})=>{
        setConversation(prevConversation=>{
            let madeChange = false
            const newMessage={sender,text}
            const newConversations=prevConversation.map(conversation=>{
                if(arrayEquality(conversation.recipients,recipients)){
                    madeChange=true
                    return {...conversation,messages:[...conversation.messages,newMessage]}
                }
                return conversation
            })
            if(madeChange){
                return newConversations
            }else{
                return[...prevConversation,{recipients,messages:[newMessage]}]
            }
        })

    },[setConversation])
    useEffect(()=>{
        if(socket==null) return

        socket.on('receive-message',addMessageToConversation)
        return ()=>socket.off('receive-message')
    },[socket,addMessageToConversation])

    const sendMessage=(recipients,text)=>{
        socket.emit('send-message',{recipients,text})
        addMessageToConversation({recipients,text,sender:id})
    }


 const formattedConversations=conversation.map((convo,index)=>{
     const recipients=convo.recipients.map(recipient=>{
         const contact=contacts.find(contact=>{
             return contact.id=== recipient
         })
         const name=(contact&&contact.name) || recipient
         return {id:recipient,name}
     })
     const messages=convo.messages.map(message=>{
        const contact=contacts.find(contact=>{
            return contact.id=== message.sender
        })
        const name=(contact&&contact.name) || message.sender
        const fromMe=id===message.sender
        return {...message,senderName:name,fromMe}

     })
     const  selected=index===selectedConversationIndex
     return{...convo,recipients,selected,messages}
 })


 const value={conversation:formattedConversations,createConversation,selectConversationIndex:setSelectedConversationIndex,selectedConversation:formattedConversations[selectedConversationIndex],sendMessage}
  
  
  return (<ConversationContexts.Provider value={value}>
      {children}
  </ConversationContexts.Provider>);
};
 
const arrayEquality =(x,y)=>{
    if(x.length !== y.length) return false

    x.sort()
    y.sort()

    return x.every((element,index)=>{
        return element===y[index]
    })
}