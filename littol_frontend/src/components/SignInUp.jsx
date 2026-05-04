function SignInUp({ formState, dispatch, handleLogin }) {

  return (
    <div className={`flex flex-col items-center justify-center h-full w-1/2 rounded-tr-2xl rounded-br-2xl`}>
      <div className={`flex flex-col items-center justify-center ${formState.signInClicked ? 'animate-[slideRegister_0.9s_ease-out_forwards]' : 'animate-[slideLogin_0.9s_ease-out_forwards]'}`}>
 
        <div className="text-2xl font-bold">{formState.signInClicked ? 'Login' : 'Create Account'}</div>

        <button className="flex flex-row mt-4 rounded-lg py-2 px-8 border border-gray-400 cursor-pointer">
          <img src="/icons8-google.svg" alt="google-icon" className="w-6 h-6"/>
          <span className="pl-2 text-gray-600">{formState.signInClicked ? 'Sign in with Google' : 'Sign up with Google'}</span>
        </button>

        <div className="mt-4 mb-4 text-gray-500">{formState.signInClicked ? 'or use your account' : 'or use your email for registration'}</div>

        {!formState.signInClicked && 
        (<input type="text" 
          onChange={(e) => dispatch({ type: 'INPUT_CHANGE', name: e.target.name, value: e.target.value})} 
          className="m-2 py-2 px-4 pr-14 bg-gray-200 rounded-lg focus:outline-gray-400" 
          name="fullname" 
          value={formState.formValues.fullname} 
          placeholder="Full Name"/>)}

        
        <input type="text" 
          onChange={(e) => dispatch({ type: 'INPUT_CHANGE', name: e.target.name, value: e.target.value})} 
          className="m-2 py-2 px-4 pr-14 bg-gray-200 rounded-lg focus:outline-gray-400" 
          name="email" 
          value={formState.formValues.email} 
          placeholder="Email Address"/>

        <input type="password" 
          onChange={(e) => dispatch({ type: 'INPUT_CHANGE', name: e.target.name, value: e.target.value})} 
          className="m-2 py-2 px-4 pr-14 bg-gray-200 rounded-lg focus:outline-gray-400" 
          name="password" 
          value={formState.formValues.password} 
          placeholder="Password"/>


        {formState.error && (<div className="text-sm text-red-500">{formState.error}</div>)}

        <button onClick={() => handleLogin(formState.signInClicked)} className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] px-12 py-2 mt-8 rounded-3xl text-white cursor-pointer">{formState.signInClicked ? 'SIGN IN' : 'SIGN UP'}</button>

      </div>
    </div>
  )

}

export default SignInUp