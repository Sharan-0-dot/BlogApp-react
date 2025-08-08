import Navbar from "./Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div className="">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col justify-center items-center lg:flex-row">
            <img src="/dev.png" className="w-40 sm:w-60 md:w-68 lg:w-85 rounded-lg shadow-2xl" />
            <div className="md:ml-5">
              <h1 className="text-5xl font-bold text-center lg:text-left">Sharan S C</h1>
              <p className="py-6">
                I am a passionate Software Engineering student currently
                pursuing my Bachelor’s degree in Computer Science and
                Engineering. I thrive on solving real-world problems through
                code and love building innovative solutions that can create
                meaningful impact. Whether it’s debugging a tricky algorithm or
                designing a user-friendly interface, I find joy in every part of
                the development process. With a strong foundation in data
                structures, algorithms, and backend development, I am
                continuously exploring new technologies and tools to improve my
                skill set. I believe in lifelong learning and strive to create
                software that not only works well but also contributes to the
                betterment of people and communities. I truly love what I do—and
                that keeps me motivated to push boundaries and turn ideas into
                reality.
              </p>
            </div>
          </div>
        </div>
        <div className="hero bg-base-200">
          <div className="hero-content flex-col">
            <p>
              This Journal App is a full-stack web application built to offer a
              seamless, secure, and responsive blogging experience. On the
              frontend, I have used React, a powerful JavaScript library for
              building fast and interactive user interfaces. React allowed me to
              build reusable components, manage state effectively, and create a
              smooth single-page application (SPA) experience. The frontend also
              includes routing, form validation, and responsive design to ensure
              usability across different screen sizes and devices. On the
              backend, I used Spring Boot, a production-grade Java framework
              that simplifies the setup and development of RESTful web services.
              The backend handles all user-related operations, including
              registration, login, and journal post management. To secure the
              application, I implemented JWT (JSON Web Token) Authentication,
              ensuring that only authenticated users can access and modify their
              data. Each API is protected and verified using these tokens,
              making the app secure against unauthorized access. For the
              database layer, the app uses MongoDB, a NoSQL database that stores
              data in a flexible, JSON-like format. MongoDB’s document model
              works especially well for storing journal entries and user data,
              offering scalability and speed. All critical backend
              operations—such as creating, updating, or deleting posts—are
              wrapped in proper transactions to maintain consistency and
              integrity across data operations. Additionally, I’ve integrated
              Cloudinary to handle image uploads and storage. This allows users
              to safely store and retrieve journal images from a cloud-based
              platform while reducing the backend's storage responsibility.
              Images are uploaded directly to Cloudinary via secure signed URLs,
              and the links are stored in the database. Overall, this
              application combines modern technologies across both frontend and
              backend to deliver a complete and secure journaling experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
