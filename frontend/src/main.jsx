import React from "react";
import ReactDOM from "react-dom/client";
import RouterProvider, { useRouter } from "./Router";
import "/index.css";

import Home from "./Home";
import Explore from "./Explore";

const App = () => {
  const { currentPage } = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case "/":
        return <Home />;
      case "/explore":
        return <Explore />;
    }
  };

  return <main>{renderPage()}</main>;
};

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </React.StrictMode>,
);