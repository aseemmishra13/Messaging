import React ,{useContext}from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
const ContactsContexts=React.createContext()

export const useContacts=()=>{
    return useContext(ContactsContexts)
}
export const ContactsContext = ({children}) => {
    const [contacts,setContacts]= useLocalStorage('contacts',[])
    const createContact=(id,name)=>{
        setContacts(prevContacts=>{return[...prevContacts,{id,name}]})
    }

  return (<ContactsContexts.Provider value={{contacts, createContact}}>
      {children}
  </ContactsContexts.Provider>);
};
 
