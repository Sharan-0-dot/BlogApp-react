import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Api from "/src/Api/Public";

function Register() {
  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirmPass: "",
  });

  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState('');
  const [alertMessage, setMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const checkCredentials = (e) => {
    e.preventDefault();
    if (!details.username || !details.password || !details.confirmPass) {
      setAlert("error");
      setMessage("Check The Credentials Properly");
      setTimeout(() => {
        setAlert('');
        setMessage('');
      }, 1200);
      return;
    }
    if (details.password !== details.confirmPass) {
      setAlert("error");
      setMessage("Passwords do not match");
      setTimeout(() => {
        setAlert('');
        setMessage('');
      }, 1200);
      return;
    }
    if(details.password.length < 8) {
      alert("Passwords must be atleast 8 characters long");
    }
    const register = async () => {
      try {
        setLoader(true);
        const response = await Api.post("/public/register", {
          username: details.username,
          password: details.password,
        });
        setLoader(false);
        setMessage("Registration Successfull");
        setAlert("success");
        setTimeout(() => {
          setAlert('');
          setMessage('');
        }, 1000)
        navigate("/");
      } catch (err) {
        setLoader(false);
        if (err.response && err.response.status === 400) {
          const backendMessage = err.response.data || "Bad request";
          setMessage(backendMessage);
          setAlert("error");
      
          setTimeout(() => {
            setAlert('');
            setMessage('');
          }, 2000);
        } else {
          console.log(`Unexpected error: ${err.message}`);
        }
    };
  }

    register();
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
          <div className="flex justify-center align-middle h-60">
            <span className="loading loading-infinity loading-xl"></span>
          </div>
        )}
        {alert == 'success' && (
          <div role="alert" className={`alert alert-success`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{alertMessage}</span>
          </div>
        )
        }
        {alert == 'error' && (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{alertMessage}</span>
          </div>
        )
        }
        {!loader && alert == '' && (
          <div className="bg-rose-700/70 p-6 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md">
            <h1 className="text-yellow-400 text-3xl font-mono text-center italic">
              REGISTER
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-6">
                <label className="text-yellow-400 text-xl font-mono italic my-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPass"
                  value={details.confirmPass}
                  className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                onClick={checkCredentials}
              >
                Register
              </button>
              <p className="text-center text-white mt-4 text-sm">
                Already Registerd?{" "}
                <Link to="/" className="text-yellow-400 hover:underline italic">
                  Login
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
