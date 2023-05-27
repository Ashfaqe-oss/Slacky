"use client";
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { HiOutlinePlus } from "react-icons/hi";
import CreateNoteModal from "./CreateNoteModal";

interface HeaderProps {
  currentUser: User;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <CreateNoteModal
        // users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div
        className="
    bg-gray-200
    w-full
    h-24
    flex
    border-b-[1px]
    sm:px-4
    py-3
    px-4
    lg:px-6
    justify-between
    items-center
    shadow-sm
    "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            lg:hidden
            block
            text-sky-500
            hover:text-sky-600
            transition
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          {/* <Avatar user={currentUser} /> */}

          <div className="flex flex-col">
            <div className="text-2xl font-bold pl-4">Your Notes</div>
            <div className="text-sm font-light text-neutral-500">
              {/* {statusText} */}
            </div>
          </div>
        </div>
        <div
          className="          
          border-2
          border-sky-500
            rounded-full
            hover:scale-110
            transition
        "
        >
          <HiOutlinePlus
            size={32}
            onClick={() => setIsModalOpen(true)}
            className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
          p-1
        "
          />
        </div>
      </div>
    </>
  );
};

export default Header;
