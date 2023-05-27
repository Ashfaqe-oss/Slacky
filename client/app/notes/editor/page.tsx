import React from "react";
import Header from "./components/Header";
import getCurrentUser from "@/app/actions/getCurrentUser";
import NoteBox from "./components/NoteBox";
import getNotes from "@/app/actions/getNotes";
// import { Note } from "@prisma/client";

const editorHome = async () => {
  const currentUser = await getCurrentUser();

  console.log(currentUser?.id)

  const notes = await getNotes(currentUser?.id!);

  console.log(notes)

  return (
    <div>
      <Header currentUser={currentUser!} />
      <div
        className=" 
        scrollbar-hide
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
            2xl:grid-cols-5
            gap-4
            m-8
          "
      >
       {
        notes.map((note: any, i: number) => (
          <NoteBox key={i} note={note} />
        ))
       }
      </div>
    </div>
  );
};

export default editorHome;
