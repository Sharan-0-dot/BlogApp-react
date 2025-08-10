import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Api from "/src/Api/Public";

function Login() {
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const authenticate = (e) => {
    e.preventDefault();
    if (!details.username || !details.password) {
      alert("Please fill in all fields.");
      return;
    }
    if(details.password.length < 8) {
      alert("Passwords must be atleast 8 characters long");
      return;
    }

    const verify = async () => {
      try {
        setLoader(true);
        const response = await Api.post("/public/login", details);
        const token = response.data;
        localStorage.removeItem("token");
        localStorage.setItem("token", token);
        setLoader(false);
        navigate("/Home");
      } catch (err) {
        setLoader(false);
        if (err.response && err.response.status === 401) {
          alert("Unauthorized: Invalid username or password");
        } else {
          alert(`Error: ${err.message}`);
        }
        console.log("Error:", err);
      }
    };

    verify();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen bg-grey-500 p-8">
        <img
          src="/journalAppLogo.png"
          alt="JournalApp"
          className="w-48 md:w-64 h-auto mb-8 md:mb-12"
        />
        {loader && (
          <>
            <div className="flex justify-center align-middle h-60">
              <span className="loading loading-infinity loading-xl"></span>
            </div>
            <div role="alert" className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>As The backend server is deployed on render it may take few seconds to process the first request please wait</span>
            </div>
          </>
        )}
        {!loader && (
          <div className="bg-rose-700/70 p-6 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md">
            <h1 className="text-yellow-400 text-3xl font-mono text-center italic">
              LOGIN
            </h1>
            <form className="my-4">
              <div className="mb-4">
                <label className="text-yellow-400 text-xl font-mono italic my-2">
                  UserName
                </label>
                <input
                  type="text"
                  name="username"
                  value={details.username}
                  className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-6">
                <label className="text-yellow-400 text-xl font-mono italic my-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={details.password}
                  className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleOnChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                onClick={authenticate}
              >
                Login
              </button>
              <p className="text-center text-white mt-4 text-sm">
                New user?{" "}
                <Link
                  to="/register"
                  className="text-yellow-400 hover:underline italic"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
