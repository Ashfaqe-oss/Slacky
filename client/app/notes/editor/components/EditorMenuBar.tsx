import { Editor } from "@tiptap/react";
import ListItem from "@tiptap/extension-list-item";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  editor: Editor | null;
};

const EditorMenuBar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1 overflow-y-auto">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          h2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black "
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={
            editor.isActive("highlight")
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          highlight
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          right
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "is-active is-active border-2 px-1 m-1 rounded-xl border-black"
              : "border px-1 m-1 rounded-xl border-black"
          }
        >
          justify
        </button>
      </div>
    </div>
  );
};

export default EditorMenuBar;
