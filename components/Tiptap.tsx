import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import style from '../styles/tiptap.module.scss';
import Blockquote from '@tiptap/extension-blockquote';
import Heading from '@tiptap/extension-heading';

const Tiptap = () => {
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <>
        <div className="grid gap-1 sm:gap-3 grid-cols-8 sm:grid-cols-8">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editor.isActive('bold') ? 'is-active border ' : ' font-black'
            }
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive('italic') ? 'is-active' : ' italic font-serif'
            }
          >
            I
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            {'<>'}
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            見出し
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
          >
            小見出し
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            bullet list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            ordered list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            blockquote
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            L
          </button>
        </div>
      </>
    );
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Blockquote.configure({
        HTMLAttributes: {
          class: 'pl-2 border-l-4 border-gray-300',
        },
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose xl:prose-xl focus:outline-none m-2',
      },
    },
  });

  return (
    <>
      <div>
        <MenuBar editor={editor} />

        <EditorContent
          className="border-2 rounded shadow p-1 w-full outline-none"
          editor={editor}
        />
      </div>
    </>
  );
};

export default Tiptap;
