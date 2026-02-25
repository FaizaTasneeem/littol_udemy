import { useFormHandler } from "../hooks/useForm";
import SignInUp from "../components/signInUp";

function Login() {
  const {signInClicked, handleSignInClick} = useFormHandler({fullname:"", email:"", password:""});

  return (
    <div className="bg-blue-50 h-screen flex items-center justify-center">
      <div className={`h-2/3 w-2/3 rounded-2xl shadow-2xl relative flex items-center ${signInClicked? 'justify-start' : 'justify-end' }`}>
        
        {/* sign in */}
        {signInClicked && <SignInUp signInClicked={signInClicked}/>}

        {/* sign up */}
        {!signInClicked && <SignInUp signInClicked={signInClicked}/>}

        {/* toggle */}
        <div className={`bg-[linear-gradient(to_right,#6860e8,#817aeb)] absolute top-0 left-0 flex flex-col items-center justify-center h-full w-1/2 duration-900 ${signInClicked ? 'translate-x-full rounded-tr-2xl rounded-br-2xl' : 'rounded-tl-2xl rounded-bl-2xl'}`}>
          
          <div className={`duration-900 absolute inset-0 flex flex-col items-center justify-center h-full w-full ${signInClicked ? 'opacity-100' : 'translate-x-[150%] opacity-0'}`}>
            <div className={`px-8 pb-4 text-white text-2xl font-bold`}>Hey There!</div>
            <p className={`px-20 pb-4 text-white text-sm text-center`}>Begin your amazing journey by creating an account with us today</p>
            <button className={`px-12 py-2 rounded-3xl border-2 border-white text-white cursor-pointer`} onClick={handleSignInClick}>Sign Up</button>
          </div>
          
          <div className={`duration-900 absolute inset-0 flex flex-col items-center justify-center h-full w-full ${signInClicked ? '-translate-x-[150%] opacity-0' : 'opacity-100'}`}>
            <div className={`px-8 pb-4 text-white text-2xl font-bold`}>Welcome Back!</div>
            <p className={`px-20 pb-4 text-white text-sm text-center`}>Stay connected by logging in with your credentials and continue your experience</p>
            <button className={`px-12 py-2 rounded-3xl border-2 border-white text-white cursor-pointer`} onClick={handleSignInClick}>Sign In</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
