import { Paperclip } from "lucide-react";

interface Props {
  onFiles: (files: FileList) => void;
}

export default function FileUploader({
  onFiles,
}: Props) {
  return (
    <>
      <input
        id="file-upload"
        type="file"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files) {
            onFiles(e.target.files);
          }
        }}
      />

      <label
        htmlFor="file-upload"
        className="cursor-pointer p-2 rounded-lg hover:bg-stone-100"
      >
        <Paperclip />
      </label>
    </>
  );
}