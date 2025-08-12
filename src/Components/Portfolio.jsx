import { useEffect, useState } from "react";
import Api from '/src/Api/Private'
import Navbar from "./Navbar";

function Portfolio() {

    const[blogs, setBlogs] = useState([]);
    const[loading, setloading] = useState(true);
    const[user, setUser] = useState([]);
    const[img, setImage] = useState('');
    const[upload, setUpload] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response1 = await Api.get('/user/');
                setUser(response1.data);
                setImage(response1.data.imgURL == null ? '' : response1.data.imgURL);
                const response = await Api.get('/user/blogs');
                const sortedBlogs = [...response.data].sort((a, b) => {
                    return new Date(b.created) - new Date(a.created);
                });
                setBlogs(sortedBlogs);
                setloading(false);
            } catch (err) {
                console.log(`${err.message}`);
            }
        }

        fetch();
    }, []);

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
            setImage(cloudData.url);
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
        setloading(true);
        const imgURL = await uploadImage(upload);
        await updateUser(imgURL);
        setloading(false);
        setUpload(null);
    }

    return (
        <>
        <Navbar></Navbar>
        <div className="flex items-center justify-center p-8">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <img
                  src={img == '' ? "journalAppLogo.png" : img}
                  alt="Profile" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {user.username}
                  <div className="badge badge-secondary">{user.roles}</div>
                </h2>
              </div>
            </div>
        </div>
        {img == '' && !loading && <div className="flex flex-col items-center justify-center">
            <h1 className="my-5 font-mono text-xl italic">upload profile picture</h1>
            <input type="file" className="file-input file-input-ghost" onChange={handleOnChange}/>
            <button className="btn btn-neutral my-5" onClick={handleUploadClick}>Upload</button>
        </div>}
        <div className="flex items-center justify-center">
            <h1 className="my-5 font-mono text-2xl italic">Your Blogs</h1>
        </div>
        {loading && <div className="flex justify-center align-middle h-60"><span className="loading loading-infinity loading-xl"></span></div>}
        {!loading && <div className="mt-2 md:mt-4 p-3 md:p-8">
            {blogs.map((blog, index) => {
                return <div key={index} className="bg-base-100 border border-base-300 p-3 rounded-md shadow-lg mb-2">
                            <div className="font-semibold">{blog.authorName}</div>
                            <div className="text-sm mb-2">{blog.content}</div>
                            {/* Bottom info section */}
                            <div className="flex justify-between text-xs text-gray-500 border-t border-base-300 pt-2">
                              <div>Created: {new Date(blog.created).toLocaleDateString()}</div>
                              <div>Updated: {new Date(blog.created).toLocaleDateString()}</div>
                              <div>❤️ {blog.likes} Likes</div>
                            </div>
                        </div>
            })}
        </div>}
        </>
    );
}

export default Portfolio;