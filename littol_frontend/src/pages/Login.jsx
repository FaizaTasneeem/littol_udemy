import { useState, useEffect } from "react";

function Login() {
  const [ signInClicked, setSignInClicked ] = useState(false);

  function handleSignInClick() {
    setSignInClicked(prev => !prev) ;
  }
  
  useEffect(() => {
    console.log(signInClicked);
  }, [signInClicked]);


  return (
    <div className="bg-blue-50 h-screen flex items-center justify-center">
      <div className="h-2/3 w-2/3 rounded-2xl shadow-2xl relative flex items-center justify-center">
        
        <div className={`relative flex flex-col items-center justify-center h-full w-full rounded-tr-2xl rounded-br-2xl`}>
          <div className={`${signInClicked ? '' : 'hidden'}`}>Sign In Form</div>
        </div>

        <div className={`relative flex flex-col items-center justify-center h-full w-full rounded-tr-2xl rounded-br-2xl`}>
          <div className={`${signInClicked ? 'hidden' : ''}`}>Sign Up Form</div>
        </div>

        <div className={`bg-[linear-gradient(to_right,#6860e8,#817aeb)] absolute top-0 left-0 flex flex-col items-center justify-center h-full w-1/2 duration-700 ${signInClicked ? 'translate-x-full rounded-tr-2xl rounded-br-2xl' : 'rounded-tl-2xl rounded-bl-2xl'}`}>
          <button className={`absolute top-80 left-30 h-10 w-30 rounded border cursor-pointer`} onClick={handleSignInClick}>{signInClicked ? 'Sign Up' : 'Sign In'}</button>
        </div>

      </div>
    </div>
  );
}

export default Login;
