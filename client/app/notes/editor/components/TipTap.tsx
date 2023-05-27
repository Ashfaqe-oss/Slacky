"use client";

// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// const Tiptap = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//     ],
//     content: '<p>Hello World! 🌎️</p>',
//   })

//   return (
//     <EditorContent editor={editor} />
//   )
// }

// export default Tiptap

// import Document from '@tiptap/extension-document'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// import { EditorContent, useEditor } from '@tiptap/react'
// import React from 'react'

// const TipTap = () => {
//   const editor = useEditor({
//     extensions: [
//       Document,
//       Paragraph,
//       Text,
//     ],
//     content: `
//       <p>
//         This is a radically reduced version of tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
//       </p>
//       <p>
//         The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
//       </p>
//     `,
//   })

//   return (
//     <EditorContent editor={editor} />
//   )
// }

// export default TipTap

// import './tipTap.scss'

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorMenuBar from "./EditorMenuBar";

const TipTap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: `
      <h3 style="text-align:center">
        Devs Just Want to Have Fun by Cyndi Lauper
      </h3>
      <p style="text-align:center">
        I come home in the morning light<br>
        My mother says, <mark>“When you gonna live your life right?”</mark><br>
        Oh mother dear we’re not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p style="text-align:center">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you’re still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p style="text-align:center">
        That’s all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>
    `,
  });

  return (
    <div>
      <EditorMenuBar editor={editor} />
      <hr className="border-1 mt-2 mb-5" />
      <EditorContent editor={editor} className="mt-4" />
    </div>
  );
};
export default TipTap;
