import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "/src/Api/Private";

function Navbar() {

  const[img, setimg] = useState("/default.jpg");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await Api.get('/user/');
        if(response.data.imgURL != null) {
          setimg(response.data.imgURL);
        }
      } catch(err) {
        console.log(`${err.message}`);
      }
    }

    fetch();
  }, []);

  const navigate = useNavigate();
    return(
        <>
        <div className="mt-2 px-3 md:px-8 sticky top-0 z-50">
        <div className="navbar bg-base-100 shadow-xl/20 rounded-lg">
          <div className="navbar-start rounded-lg">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li onClick={() => {navigate("/home")}}><a>Homepage</a></li>
                <li onClick={() => {navigate("/portfolio")}}><a>Portfolio</a></li>
                <li onClick={() => {navigate("/about")}}><a>About</a></li>
                <li onClick={() => {localStorage.clear(); navigate("/");}}><a>Logout</a></li>
              </ul>
            </div>
          </div>
          <div className="navbar bg-base-100 justify-center h-16 p-0">
            <img src="/journalAppLogo.png" alt="JournalApp" className="w-18 md:w-30"/>
          </div>
          <div className="navbar-end">
            <div className="avatar">
              <div className="mask mask-squircle w-9 md:w-10">
                <img src={img} />
              </div>
            </div>
          </div>
        </div>
        </div>
        </>
    );
}

export default Navbar;