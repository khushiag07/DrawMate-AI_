import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  text: string;
}

export default function SuggestionCard({
  title,
  text,
}: Props) {
  return (
    <button
      className="
      group
      w-full
      rounded-3xl
      bg-white
      border
      border-[#E8DCCF]
      p-6
      text-left
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      hover:border-[#C89A6A]
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <h3
            className="
            text-[18px]
            font-semibold
            text-[#2F241A]
            "
          >
            {title}
          </h3>

          <p
            className="
            mt-3
            text-[15px]
            leading-7
            text-[#7A6B5B]
            "
          >
            {text}
          </p>
        </div>

        <div
          className="
          w-10
          h-10
          rounded-xl
          bg-[#F5EFE7]
          flex
          items-center
          justify-center
          group-hover:bg-[#A16A3B]
          group-hover:text-white
          transition
          "
        >
          <ArrowUpRight size={18} />
        </div>
      </div>
    </button>
  );
}