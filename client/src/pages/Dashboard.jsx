import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { authServices } from "../api";
import Loading from "../components/ui/Loading";
import DashboardContent from "../components/DashboardContent";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const res = await authServices.getProfile();
        setUser(res);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <DashboardContent />;
};

export default Dashboard;
