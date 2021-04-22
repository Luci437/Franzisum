import React, { useEffect, useState } from "react";
import "./css/admin.css";
import AdminNav from "./AdminNav";
import AdminContentBox from "./AdminContentBox";
import AdminLogin from "./AdminLogin";

const AdminIndex = () => {
  const [adminLogged, setAdminLogged] = useState(false);

  useEffect(() => {
    adminAuthCheck();
  }, []);

  const adminAuthCheck = () => {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged) {
      setAdminLogged(true);
    }
  };

  return (
    <div className="admin">
      {adminLogged ? (
        <>
          <AdminNav />
          <AdminContentBox />
        </>
      ) : (
        <AdminLogin />
      )}
    </div>
  );
};

export default AdminIndex;
