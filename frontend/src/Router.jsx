import React, { useState, useEffect, createContext, useContext } from "react";

const RouterContext = createContext({});

const RouterProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname;
    return path;
  });

  const navigate = (page) => {
    window.history.pushState({}, "", page);
    setCurrentPage(page);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPage(path);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;

export const useRouter = () => {
  return useContext(RouterContext);
};