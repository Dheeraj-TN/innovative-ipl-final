// import { Avatar } from '@mui/material';
import React from "react";
import "./SidebarRow.css";
function SidebarRow({ Icon, title }) {
  return (
    <div className="sidebarRow">
      {/* {src && <Avatar src={src} />*/}
      {Icon && <Icon />}
      <h4>{title}</h4>
    </div>
  );
}

export default SidebarRow;
