import { useEffect, useState } from "react";
import Api from '/src/Api/Public'

function Blogs() {

    const[blogs, setBlogs] = useState([]);
    const[loading, setloading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await Api.get('/public/blogs');
                const sortedBlogs = [...response.data].sort((a, b) => {
                    return new Date(b.created) - new Date(a.created);
                });
                setBlogs(sortedBlogs);
                setloading(false);
            } catch (err) {
                if(err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                    console.log(`Error : ${err.message}`);
                }
            }
        }

        fetchBlogs();
    }, [])

    return (
        <>
        {loading && <div className="flex justify-center align-middle h-60"><span className="loading loading-infinity loading-xl"></span></div>}
        <div className="mt-2 md:mt-4 p-3 md:p-8">
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
        </div>
        <div className="h-16"></div>
        </>
    );
}

export default Blogs;