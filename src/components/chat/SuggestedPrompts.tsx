import {
  Pencil,
  Palette,
  Image,
  BookOpen,
} from "lucide-react";

const prompts = [
  {
    icon: Pencil,
    text: "Teach me perspective drawing",
  },
  {
    icon: Palette,
    text: "Explain color theory",
  },
  {
    icon: Image,
    text: "Review my sketch",
  },
  {
    icon: BookOpen,
    text: "Create a 30-day drawing plan",
  },
];

interface Props {
  onSelect: (text: string) => void;
}

export default function SuggestedPrompts({
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-5 mt-10 max-w-4xl">

      {prompts.map((item) => {

        const Icon = item.icon;

        return (

          <button
            key={item.text}
            onClick={() =>
              onSelect(item.text)
            }
            className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition text-left"
          >

            <Icon
              size={28}
              className="text-[#8B5A2B]"
            />

            <h3 className="font-semibold mt-5">
              {item.text}
            </h3>

          </button>

        );

      })}

    </div>
  );
}