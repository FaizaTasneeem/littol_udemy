import { useState, useContext } from "react";
import { useFormHandler } from "../hooks/useForm";
import { UserContext } from "../context/AppContext";


function Home() {
  const {handleLogout} = useFormHandler({fullname:"", email:"", password:""});
  const {user, setUser} = useContext(UserContext);
  const [inputValue, setInputValue] = useState(""); 

  return (
    <div className="p-14 flex flex-col items-center justify-center">
      <h2>Home</h2>
      <div>Welcome {user.fullname}</div>
      <input className="p-2 mt-8 border rounded cursor-pointer" type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button className="p-2 mt-8 bg-blue-500 rounded cursor-pointer" onClick={() => setUser({...user, fullname:inputValue})}>Update Profile</button>
      <button className="p-2 mt-8 bg-violet-500 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home