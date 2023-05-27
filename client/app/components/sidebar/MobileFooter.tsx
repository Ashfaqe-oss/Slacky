"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import SettingsModel from "./SettingsModel";
import { User } from "@prisma/client";
import { useState } from "react";
import Avatar from "../Avatar";
// import { useState } from "react";

interface MobileFooterProps {
    currentUser: User;
  }
  
  const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (isOpen) {
    return null;
  }

  return (
    <>
      <SettingsModel
        currentUser={currentUser}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <div
        className="
      fixed 
      justify-between 
      w-full 
      bottom-0 
      z-40 
      flex 
      items-center 
      bg-white
      border-t-[1px] 
      lg:hidden
    "
      >
        {routes.map((route) => (
          <MobileItem
            key={route.href}
            label={route.label}
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick}
          />
        ))}
        <div
            onClick={() => setIsSettingsOpen(true)}
            className="cursor-pointer mx-2 pt-2 pr-2 hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
      </div>
    </>
  );
};

export default MobileFooter;
