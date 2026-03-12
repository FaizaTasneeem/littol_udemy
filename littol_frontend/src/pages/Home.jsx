import { useState, useEffect } from "react";
import { useFormHandler } from "../hooks/useForm";


function Home() {
  const {handleLogout} = useFormHandler({fullname:"", email:"", password:""});
  const [name, setName] = useState("Faiza");
  const [inputValue, setInputValue] = useState("Faiza"); // Separate state for input

  // Debounce effect - updates name after user stops typing for 500ms
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setName(inputValue);
  //   }, 500); // 500ms delay

  //   // Clean up timeout if inputValue changes before delay completes
  //   return () => clearTimeout(timeoutId);
  // }, [inputValue]);


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