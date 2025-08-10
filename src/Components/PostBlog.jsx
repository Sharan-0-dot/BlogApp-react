import { useEffect, useState } from "react";
import Api from "/src/Api/Private";

function PostBlog() {
    const[username, setUsername] = useState('');
    const[content , setContent] = useState('');
    const[loader, setLoader] = useState(false);
    const[alert, setAlert] = useState(false);

    useEffect( () => {
        const fetch = async () => {
           try {
            const response = await Api.get('/user/');
            setUsername(response.data.username);
           } catch (err) {
            console.log(`${err.message}`);
           }
        }

        fetch();
    }, [])

    const postBlog = () => {

        const fetch = async () => {
            try {
                setLoader(true);
                const response = await Api.get('/user/id');
                const userId = response.data;
                await Api.post('/blog/', {userId : userId, content : content});
                setLoader(false);
                setAlert(true);
                setContent('');
                setTimeout(() => {
                    setAlert(false);
                }, 2000);
            } catch (err) {
                setLoader(false);
                setAlert(false);
                console.log(`${err.message}`);
            }
        }

        fetch();
    }

    const handleOnChange = (e) => {
        setContent(e.target.value);
    }
    return(
        <>
        <div className="flex flex-col justify-center items-center p-8 md:p-16">
            <h1 className="my-8 md:mb-7 font-mono text-2xl italic">Preview</h1>
            <div className="bg-base-100 border border-base-300 p-3 rounded-md shadow-lg mb-2">
                    <div className="font-semibold">{username}</div>
                    <div className="text-sm mb-2">{content}</div>
                    {/* Bottom info section */}
                    <div className="flex justify-between text-xs text-gray-500 border-t border-base-300 pt-2">
                      <div>Created: {new Date().toLocaleString()}</div>
                      <div>❤️ 0 Likes</div>
                    </div>
            </div>
            <h1 className="my-10 md:mb-10 font-mono text-2xl italic">Whats on your mind today</h1>
            <textarea className="textarea textarea-md w-full" placeholder="Your Blog" onChange={handleOnChange} value={content}></textarea>
            <button className="btn btn-neutral my-10" onClick={postBlog}>Post</button>
            {loader && <div className="flex justify-center align-middle h-60"><span className="loading loading-infinity loading-xl"></span></div>}
            {alert && <div role="alert" className="alert alert-success">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Blog Posted Successfully</span>
                        </div>}
        </div>
        </>
    );
}

export default PostBlog;