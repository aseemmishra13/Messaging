import { useState } from "react";
import Dashboard from "./components/Dashboard";
import useLocalStorage from "./components/hooks/useLocalStorage";
import Login from "./components/Login";


function App() {
  const [id,setId]=useLocalStorage('id')
  return (
      <>
      {id ? <Dashboard id ={id}/>:
      <Login onIdSubmit={setId}/>}
      </>
  
  );
}

export default App;
