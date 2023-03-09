import { Home, Lightbulb, Whatshot } from "@mui/icons-material";
import React, { useState } from "react";
import "./DomainSidebar.css";
import DomainSidebarRow from "./DomainSidebarRow";
import MemoryIcon from "@mui/icons-material/Memory";
import CableIcon from "@mui/icons-material/Cable";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ScienceIcon from "@mui/icons-material/Science";
import WebIcon from "@mui/icons-material/Web";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { Link } from "react-router-dom";
function DomainSidebar() {
  // const [selected, setSelected] = useState(false);

  return (
    <div className="domainSideBar">
      <Link to="/domain">
        <DomainSidebarRow selected={true} Icon={Home} title="Home" />
      </Link>

      <DomainSidebarRow Icon={Whatshot} title="Trending" />
      <hr />
      <Link to="/iot">
        <DomainSidebarRow Icon={MemoryIcon} title="Iot" />
      </Link>
      <Link to="/physics">
        <DomainSidebarRow Icon={FlashOnIcon} title="Physics" />
      </Link>
      <Link to="/chemistry">
        <DomainSidebarRow Icon={ScienceIcon} title="Chemistry" />
      </Link>
      <Link to="/ece">
        <DomainSidebarRow Icon={Lightbulb} title="Electronics" />
      </Link>
      <Link to="/eee">
        <DomainSidebarRow Icon={CableIcon} title="Electrical" />
      </Link>
      <Link to="/web">
        <DomainSidebarRow Icon={WebIcon} title="Web Application Development" />
      </Link>
      <Link to="/mobileApp">
        <DomainSidebarRow
          Icon={AppShortcutIcon}
          title="Mobile Application Development"
        />
      </Link>

      <hr />
      <DomainSidebarRow Icon={WatchLaterIcon} title="Watch Later" />
      <DomainSidebarRow Icon={OndemandVideoIcon} title="Your Videos" />
      <hr />
    </div>
  );
}

export default DomainSidebar;
