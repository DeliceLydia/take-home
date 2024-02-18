import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <body className="w-full box-border">
        <form
          className="flex items-center justify-center mt-32 pb-16 pt-16 flex-col w-1/2 m-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[#2b2a1a] font-medium mb-5 text-lg">Register</h2>
          <label className="block border-black text-[#909591]">
            Username:
            <input
              className="block border pt-2 pb-2 pl-16 pr-16 rounded-md"
              type="text"
              name="username"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label className="block text-[#909591]">
            Email:
            <input
              className="block border pt-2 pb-2 pl-16 pr-16 rounded-md"
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
              className="block border pt-2 pb-2 pl-16 pr-16 rounded-md"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit" className="bg-[#309d8b] pt-2 pb-2 pl-28 pr-28 text-white rounded-lg" >
            Submit
          </button>
          <div className="flex justify-center gap-2 mt-5">
          <p className="text-[#000]">Arleady have an account?</p>
          <Link to="/login">Login</Link>
        </div>
        </form>
    </body>
  );
};

export default Signup;
