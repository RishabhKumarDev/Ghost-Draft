import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className=" w-full">
      {label && <label className=" inline-block mb-1 pl-1"> {label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="shkmdmnzrub7dhqsdv5nmym3t0457j05ad550f2j02qcp0ul"
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              skin: "oxide-dark",
              content_css: "dark",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "media",
                "table",
                "code",
                "wordcount",
                "fullscreen",
                "preview",
              ],
              toolbar:
                "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image media | code preview fullscreen",
              content_style: `
    body {
      background-color: #18181b;         /* bg-zinc-900 */
      color: #f4f4f5;                    /* text-white */
      font-family: 'Inter', sans-serif;
      line-height: 1.7;
    }
    a { color: #fbbf24; }                /* amber-400 */
    h1, h2, h3, h4, h5, h6 {
      color: #facc15;                   /* brighter amber */
    }
    blockquote {
      border-left: 4px solid #facc15;
      padding-left: 1rem;
      color: #a1a1aa;                    /* zinc-400 */
      margin: 1rem 0;
    }
    table, th, td {
      border: 1px solid #3f3f46;         /* zinc-700 */
    }
  `,
              branding: false,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
