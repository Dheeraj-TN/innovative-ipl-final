import React from "react";
import "./Sidebar.css";
import SidebarRow from "./SidebarRow";
// import SidebarRow from './SidebarRow';
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ChatIcon from "@mui/icons-material/Chat";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function Sidebar() {
  const user = "username";
  return (
    <div className="sidebar">
      <SidebarRow Icon={AccountCircleIcon} title={user} />

      <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
      <SidebarRow Icon={PeopleIcon} title="Friends" />
      <SidebarRow Icon={ChatIcon} title="Messenger" />

      <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
      <SidebarRow Icon={ExpandMoreIcon} title="More" />
      {/* <SidebarRow title="Pages"/>
      <SidebarRow title="Friends"/> */}
    </div>
  );
}

export default Sidebar;
