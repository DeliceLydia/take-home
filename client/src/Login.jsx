import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <body className="w-full box-border">
      <form
        className="flex items-center justify-center mt-32 pb-16 pt-16 flex-col w-1/2 m-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-[#2b2a1a] font-medium text-lg">Login</h2>
        <br />
        <label className="block text-[#909591]">
          Email:
          <input
            className="block border pb-2 pl-16 pr-16 rounded-md"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="block text-[#909591]">
          Password:
          <input
            className="block border pb-2 pl-16 pr-16 rounded-md"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" className="bg-[#309d8b] pt-2 pb-2 pl-28 pr-28 text-white rounded-lg" >
          Login
        </button>
        <div className="flex justify-center gap-2 mt-5">
        <p>don't have an account?</p>
        <Link to="/register">Register</Link>
      </div>
      </form>
    </body>
  );
};

export default Login;
