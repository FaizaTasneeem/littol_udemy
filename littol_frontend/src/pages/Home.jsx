import { useFormHandler } from "../hooks/useForm"

function Home() {
  const {handleLogout} = useFormHandler({fullname:"", email:"", password:""});
  return (
    <div className="p-14 flex flex-col items-center justify-center">
      <h2>Home</h2>
      <button className="p-2 mt-8 bg-violet-500 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home