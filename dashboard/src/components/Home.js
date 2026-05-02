import React from "react";

import AuthPage from "./AuthPage";
import { useAuth } from "./AuthContext";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="auth-loading">Checking your session…</div>;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
