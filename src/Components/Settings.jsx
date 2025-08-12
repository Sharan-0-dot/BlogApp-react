import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from '/src/Api/Private'

function Settings() {
    const navigate = useNavigate();
    const[alert , setAlert] = useState(false);

    const showAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 2000);
    }
    const deactivate = () => {
        const confirmed = window.confirm("Are you sure want to deActivate this account. Once deactivated your data will be lost forever")
        if(!confirmed) return;
        const clear = async () => {
            try {
                const response = await Api.delete('/user/');
                localStorage.clear();
                navigate('/');
            } catch (err) {
                console.log(`${err.message}`);
            }
        }
        clear();
    }

    return (
        <>
        <div className="flex flex-col justify-center items-center mt-10 p-4">
            <button className="btn btn-wide mb-10 font-mono text-xl italic" onClick={() => {navigate('/profile')}}>Edit profile</button>
            <button className="btn btn-wide mb-10 font-mono text-xl italic" onClick={showAlert}>Edit Blogs</button>
            <button className="btn btn-wide mb-10 font-mono text-xl italic" onClick={() => {localStorage.clear(); navigate('/')}}>Logout</button>
            <button className="btn btn-wide mb-10 font-mono text-xl italic text-red-700" onClick={deactivate}>deActivate Account</button>
            {alert && <div role="alert" className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Feature Coming Soon</span>
                      </div>}
        </div>
        </>
    );
}

export default Settings;