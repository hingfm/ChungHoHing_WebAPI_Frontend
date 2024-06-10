//import React from 'react';
import Article from "./Articles";
const Home = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="py-4 px-10 text-green-900 font-bold">
        <p>Pet shelter</p>
      </div>
      <Article />
    </div>
  );
};

export default Home;
