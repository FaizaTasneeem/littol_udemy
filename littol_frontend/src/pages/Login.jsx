function Login() {
  return (
    <div className="bg-blue-50 h-screen flex items-center justify-center">
      <div className="h-2/3 w-2/3 rounded-2xl shadow-2xl flex items-center justify-center">
        <div className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] flex h-full w-full rounded-tl-2xl rounded-bl-2xl">
          <button className="rounded border">Sign In</button>
        </div>
        <div className="flex h-full w-full rounded-2xl">
          <button className="rounded border">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
