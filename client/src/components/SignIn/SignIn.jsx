import { useState } from "react";
import { useSignIn } from "../../hooks/useSignIn";


export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signin, error, isLoading} = useSignIn()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log(error)
    await signin(email,password)
  };

  return (
    <div className="w-[90%] pb-20 mb-10  flex items-center justify-center flex-col">
      <p className="text-gray-500 text-center font-normal">
        Welcome again! Enter your details to access your account.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6 w-full px-4">
        <div>
          <input
            className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary px-3 py-2"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary px-3 py-2"
            placeholder="Password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-primary text-white rounded-md py-2 px-4 hover:bg-primary-dark"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
