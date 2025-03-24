import React from "react";
import Link from './Link'

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/explore">Go to explore page</Link>
    </div>
  );
};

export default Home;