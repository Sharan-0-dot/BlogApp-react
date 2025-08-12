import { useEffect, useRef, useState } from "react";
import Api from '/src/Api/Private'
import api from '/src/Api/Public'
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [curUser, setCurUser] = useState({});

  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const[loading, setloading] = useState(false);
  const[upload, setUpload] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
        try {
            const response = await Api.get('/user/');
            setCurUser(response.data);
            setUsername(response.data.username);
        } catch(err) {
            console.log(`${err.message}`);
        }
    }

    fetch();
  }, []);

  const verify = async () => {
    try {
      await api.post('/public/login', {username : curUser.username, password : oldPassword});
      return true;
    } catch (err) {
      console.log(`${err.message}`);
      return false;
    }
  }

  const commitChanges = async () => {
    if(isEditingPassword) {
      if(newPassword.length < 8) {
        alert("Passwords must be atleast 8 characts long");
        return;
      }
      const verified = await verify();
      if(!verified) return;
    }

    const payload = {};
    if (isEditingUsername) payload.username = username;
    if (isEditingPassword) payload.password = newPassword;
  
    if (Object.keys(payload).length === 0) return;
  
    try {
      const response = await Api.put('/user/', payload);
      setCurUser(prev => ({ ...prev, ...payload }));
      setOldPassword("");
      setNewPassword("");
      setIsEditingUsername(false);
      setIsEditingPassword(false);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }  
  }

  const uploadImage = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Sharan2005");
        data.append("cloud_name", "dmnqajo2n")

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dmnqajo2n/image/upload', {
                method : "POST",
                body : data
            });
            const cloudData = await response.json();
            return cloudData.url;
        } catch(err) {
            console.log(`${err.message}`);
        }
    }

    const updateUser = async (url) => {
        try {
            await Api.put('/user/', {imgURL : url});
        } catch (err) {
            console.log(`${err.message}`);
        }
    }

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        setUpload(file);
    }

    const handleUploadClick = async () => {
        if(!upload) return;
        try {
          setloading(true);
          const imgURL = await uploadImage(upload);
          setloading(false);
          await updateUser(imgURL);
          setCurUser(prev => ({ ...prev, imgURL }));
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          setUpload(null);
        } catch(err) {
          console.log(`${err.message}`);
        } finally {
          setloading(false);
        }
    }

  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col justify-center items-center">
      {loading && <div className="flex justify-center align-middle h-60"><span className="loading loading-infinity loading-xl"></span></div>}
      {!loading && <div className="avatar my-5 md:mb-10">
        <div className="mask mask-squircle w-30">
          <img src={curUser.imgURL == null ? "/default.jpg" : curUser.imgURL} />
        </div>
      </div>}
      <h1 className="my-5 md:mb-10 font-mono text-2xl italic">{curUser.username}</h1>
  
      <input type="file" className="file-input file-input-ghost" onChange={handleOnChange} ref={fileInputRef}/>
      <button className="btn btn-neutral my-5 md:my-10" onClick={handleUploadClick}>Change/Upload</button>


      <div className="bg-base-100 border border-base-300 p-3 rounded-md shadow-lg mb-2 w-80">
        <div className="font-semibold flex justify-between items-center">
          <span>Username</span>
          <button
            className="btn btn-xs btn-outline"
            onClick={() => setIsEditingUsername(!isEditingUsername)}
          >
            {isEditingUsername ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="text-sm mt-2">
          {isEditingUsername ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
            />
          ) : (
            username
          )}
        </div>
      </div>

      
      <div className="bg-base-100 border border-base-300 p-3 rounded-md shadow-lg mb-2 w-80">
        <div className="font-semibold flex justify-between items-center">
          <span>Password</span>
          <button
            className="btn btn-xs btn-outline"
            onClick={() => setIsEditingPassword(!isEditingPassword)}
          >
            {isEditingPassword ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="text-sm mt-2">
          {isEditingPassword ? (
            <div className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="Old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          ) : (
            "********"
          )}
        </div>
      </div>
      <button className="btn btn-neutral my-5 md:my-10" onClick={commitChanges}>Commit Changes</button>
    </div>
    <marquee behavior="scroll" direction="left" className="text-red-500 font-bold">
      After updation you will be forced to login again to avoid any potential conflicts
    </marquee>
    </>
  );
}

export default EditProfile;
