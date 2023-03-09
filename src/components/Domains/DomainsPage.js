import React from "react";
import "./DomainsPage.css";
import DomainSidebar from "./DomainSidebar";
import DomainVideoPage from "./DomainVideoPage";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Login from "../Login";

function DomainsPage() {
  const user = useSelector(selectUser);
  return !user ? (
    <Login />
  ) : (
    <div className="domainPage">
      <DomainSidebar />
      <DomainVideoPage />
    </div>
  );
}

export default DomainsPage;
