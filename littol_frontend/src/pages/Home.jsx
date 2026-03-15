import { useState, useEffect } from "react";
import { useFormHandler } from "../hooks/useForm";


function Home() {
  const {handleLogout} = useFormHandler({fullname:"", email:"", password:""});
  const [name, setName] = useState("Faiza");
  const [inputValue, setInputValue] = useState("Faiza"); 

  return (
    <div className="p-14 flex flex-col items-center justify-center">
      <h2>Home</h2>
      <input className="p-2 mt-8 border rounded cursor-pointer" type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button className="p-2 mt-8 bg-blue-500 rounded cursor-pointer" onClick={() => setName(inputValue)}>Show Name</button>
      <>My name is {name}</>
      <button className="p-2 mt-8 bg-violet-500 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home