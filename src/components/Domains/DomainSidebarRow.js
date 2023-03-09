import { Home } from "@mui/icons-material";
import React from "react";
import "./DomainSidebarRow.css";

function DomainSidebarRow({ selected, title, Icon }) {
  return (
    // <div className={`domain__sideBarRow ${selected && "selected"}`}>
    <div className="domain__sideBarRow">
      <Icon className="dsb__icon" />
      <h2 className="dsb__title">{title}</h2>
    </div>
  );
}

export default DomainSidebarRow;
