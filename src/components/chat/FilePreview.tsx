import { FileText, ImageIcon } from "lucide-react";

interface Props {
  name: string;
  url: string;
  type: string;
}

export default function FilePreview({
  name,
  url,
  type,
}: Props) {
  const image = type.startsWith("image");

  return (
    <div className="mt-4">

      {image ? (
        <img
          src={url}
          className="rounded-xl border max-h-64 object-cover"
          alt={name}
        />
      ) : (
        <div className="flex items-center gap-3 rounded-xl border bg-stone-50 p-4">
          <FileText />
          <span>{name}</span>
        </div>
      )}

    </div>
  );
}