"use client";
// import { Formattednote } from "@/app/types";
import React, { useCallback, useState } from "react";
import Image from "next/image";
// import SocialLinks from "@/app/(shared)/SocialLinks";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./EditorMenuBar";
import ArticleTipTap from "./ArticleTipTap";
import Button from "@/app/components/Button";
import OpenEdit from "./OpenEdit";
import {BsTrash} from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  note?: any;
  onClose: () => void;
  existing?: boolean;
};

const Content = ({ note, onClose, existing }: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(note?.title);
  const [titleError, setTitleError] = useState<string>("");
  const [tempTitle, setTempTitle] = useState<string>(title);

  const [content, setContent] = useState<string>(note?.content);
  const [contentError, setContentError] = useState<string>("");
  const [tempContent, setTempContent] = useState<string>(content);

  const date = new Date(note?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleIsEditable = (bool: boolean) => {
    setIsEditable(bool);
    editor?.setEditable(bool);
  };

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (title) setTitleError("");
    setTitle(e.target.value);
  };

  const handleOnChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) setContentError("");
    setContent((editor as Editor).getHTML());
  };

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: handleOnChangeContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm xl:prose-2xl leading-8 focus:outline-none w-full max-w-full",
      },
    },
    content: note
      ? note?.content
      : `
    <h3 style="text-align:center">
      Welcome to your new Note 
    </h3>
    --------------------------<br>
    <p style="text-align:center">
      Click on the edit icon to begin editing<br>
      Click on the submit icon to submit your changes<br>
      Click on cross icon to close this modal</p>
    <p style="text-align:center color:blue-500">
      --------------------------<br>
      Once you click on edit icon, <br>
      You can use Chat GPT ... <br>
      to generate some text for you !<br>
      based on your title <br>
      How COOL is that ?<br>
    </p>
  `,
    editable: isEditable,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation checks
    if (title === "") setTitleError("This field is required.");
    if (editor?.isEmpty) setContentError("This field is required.");
    if (title === "" || editor?.isEmpty) return;

    console.log(content);

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    const data = await response.json()

    data && toast.success("Note created successfully");

    handleIsEditable(false);
    setTempTitle("");
    setTempContent("");

    setTitle(data.title);
    setContent(data.content);
    editor?.commands.setContent(data.content);
  };


  return (
    <div className="prose w-full max-w-full mb-2">
      {/* BREADCRUMBS */}
      {/* <h5 className="text-wh-300">Title</h5> */}

      {/* CATEGORY AND EDIT */}

      <OpenEdit
        isEditable={isEditable}
        handleIsEditable={handleIsEditable}
        title={title}
        setTitle={setTitle}
        tempTitle={tempTitle}
        setTempTitle={setTempTitle}
        tempContent={tempContent}
        setTempContent={setTempContent}
        editor={editor}
        note={note}
      />


      

      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <>
          {isEditable ? (
            <div>
              <textarea
                className="border-2 rounded-md bg-wh-50 p-3 h-[52px] w-full"
                placeholder="Title"
                onChange={handleOnChangeTitle}
                value={title}
              />
              {titleError && (
                <p className="mt-1 text-primary-500">{titleError}</p>
              )}
            </div>
          ) : (
            <h3 className="font-bold text-3xl mt-3">{title}</h3>
          )}
          {/* <div className="flex gap-3">
            <h5 className="font-semibold text-xs">By {note.author}</h5>
            <h6 className="text-wh-300 text-xs">{formattedDate}</h6>
          </div> */}
        </>

        {/* ARTICLE */}
        <ArticleTipTap
          existing={existing}
          contentError={contentError}
          editor={editor}
          isEditable={isEditable}
          setContent={setContent}
          title={title}
        />

        {isEditable && (
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              // disabled={isLoading}
              onClick={onClose}
              type="button"
              secondary
            >
              Cancel
            </Button>
            {!note && <Button type="submit">Create</Button>}
          </div>
        )}
      </form>
    </div>
  );
};

export default Content;
