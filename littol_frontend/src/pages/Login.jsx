import { useFormHandler } from "../hooks/useForm";

function Login() {
  const {signInClicked, formValues, handleSignInClick, handleInputChange, handleSubmit} = useFormHandler({fullname:"", email:"", password:""});

  return (
    <div className="bg-blue-50 h-screen flex items-center justify-center">
      <div className="h-2/3 w-2/3 rounded-2xl shadow-2xl relative flex items-center justify-center">
        
        {/* sign in */}
        <div className={`flex flex-col items-center justify-center h-full w-full rounded-tr-2xl rounded-br-2xl`}>
          <div className={`flex flex-col items-center justify-center ${signInClicked ? '' : 'hidden'}`}>
            <div className="text-2xl font-bold">Sign In</div>
            <button className="flex flex-row mt-4 rounded-lg py-2 px-8 border border-gray-400 cursor-pointer">
              <img src="/icons8-google.svg" alt="google-icon" className="w-6 h-6"/>
              <span className="pl-2 text-gray-600">Sign in with Google</span>
            </button>
            <div className="mt-4 mb-4 text-gray-500">or use your account</div>
            <input type="text" onChange={handleInputChange} className="m-2 py-2 px-4 pr-14 bg-gray-200 rounded-lg focus:outline-gray-400" placeholder="Email Address"/>
            <input type="text" onChange={handleInputChange} className="m-2 py-2 px-4 pr-14 bg-gray-200 rounded-lg focus:outline-gray-400" placeholder="Password"/>
            <button onSubmit={handleSubmit} className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] px-12 py-2 mt-8 rounded-3xl text-white cursor-pointer">SIGN IN</button>
          </div>
        </div>

        {/* sign up */}
        <div className={`flex flex-col items-center justify-center h-full w-full rounded-tr-2xl rounded-br-2xl`}>
          <div className={`flex flex-col items-center justify-center ${signInClicked ? 'hidden' : ''}`}>
            <div className="text-2xl font-bold">Create Account</div>
            <button className="flex flex-row mt-4 rounded-lg py-2 px-8 border border-gray-400 cursor-pointer">
              <img src="/icons8-google.svg" alt="google-icon" className="w-6 h-6"/>
              <span className="pl-2 text-gray-600">Sign up with Google</span>
            </button>
            <div className="mt-4 text-gray-500">or use your email for registration</div>
            <input type="text" onChange={handleInputChange} className="m-2 py-2 px-4 pr-14 bg-gray-200 rounded-lg focus:outline-gray-400" placeholder="Full Name"/>
            <input type="text" onChange={handleInputChange} className="m-2 py-2 px-4 pr-14 bg-gray-200 rounded-lg focus:outline-gray-400" placeholder="Email Address"/>
            <input type="text" onChange={handleInputChange} className="m-2 py-2 px-4 pr-14 bg-gray-200 rounded-lg focus:outline-gray-400" placeholder="Password"/>
            <button onSubmit={handleSubmit} className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] px-12 py-2 mt-8 rounded-3xl text-white cursor-pointer">SIGN UP</button>
          </div>
        </div>

        {/* toggle */}
        <div className={`bg-[linear-gradient(to_right,#6860e8,#817aeb)] absolute top-0 left-0 flex flex-col items-center justify-center h-full w-1/2 duration-700 ${signInClicked ? 'translate-x-full rounded-tr-2xl rounded-br-2xl' : 'rounded-tl-2xl rounded-bl-2xl'}`}>
          <div className="px-8 pb-4 text-white text-2xl font-bold">{signInClicked ? 'Hey There!' : 'Welcome Back!'}</div>
          <p className="px-20 pb-4 text-white text-sm text-center">{signInClicked ? 'Begin your amazing journey by creating an account with us today' : 'Stay connected by logging in with your credentials and continue your experience'}</p>
          <button className={`px-12 py-2 rounded-3xl border-2 border-white text-white cursor-pointer`} onClick={handleSignInClick}>{signInClicked ? 'Sign Up' : 'Sign In'}</button>
        </div>

      </div>
    </div>
  );
}

export default Login;
