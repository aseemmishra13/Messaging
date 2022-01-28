import { useState } from "react";
import { ContactsContext } from "./components/contexts/ContactsContext";
import { ConversationContext } from "./components/contexts/ConversationsContext";
import Dashboard from "./components/Dashboard";
import useLocalStorage from "./components/hooks/useLocalStorage";
import Login from "./components/Login";


function App() {
  const [id,setId]=useLocalStorage('id')
  const dashboard = (
    <ContactsContext>
      <ConversationContext>
      <Dashboard id={id}/>
      </ConversationContext>
    </ContactsContext>
  )
  return (
      <>
      {id ? dashboard:
      <Login onIdSubmit={setId}/>}
      </>
  
  );
}

export default App;
