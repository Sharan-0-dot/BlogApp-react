import Navbar from "./Navbar"
import Footer from "./Footer"
import Blogs from "./Blogs";
import Settings from "./Settings";
import PostBlog from "./PostBlog";
import { useState } from "react";

function Home() {

  const[view, setView] = useState("Home");

  const handleViewChange = (newView) => {
    setView(newView);
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            {view === "Home" && <Blogs />}
            {view === "PostBlog" && <PostBlog />}
            {view === "settings" && <Settings />}
          </div>
          <Footer viewChange={handleViewChange}/>
      </div>
    </>
  );
}

export default Home;
