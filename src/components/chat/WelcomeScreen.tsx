import {
  Palette,
  Sparkles,
  Pencil,
  Image,
  Lightbulb,
  BookOpen,
} from "lucide-react";

const suggestions = [
  "Teach me perspective drawing",
  "How do I draw realistic eyes?",
  "Generate a shading practice",
  "Explain anatomy for beginners",
];

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-10">

      {/* Logo */}

      <div className="w-24 h-24 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center shadow-xl">
        <Palette size={42} />
      </div>

      <h1 className="mt-6 text-4xl font-bold text-[#2F3136]">
        Welcome to DrawMate AI
      </h1>

      <p className="mt-3 text-gray-600 text-center max-w-2xl">
        Your intelligent drawing mentor.
        Learn art, generate practice exercises,
        understand perspective, anatomy, shading,
        coloring and improve your sketches with AI.
      </p>

      {/* Quick Actions */}

      <div className="grid grid-cols-2 gap-5 mt-12 w-full max-w-4xl">

        <Card
          icon={<Pencil />}
          title="Drawing Lessons"
          text="Step-by-step tutorials."
        />

        <Card
          icon={<Sparkles />}
          title="AI Sketch Feedback"
          text="Upload your sketch."
        />

        <Card
          icon={<Image />}
          title="Reference Images"
          text="Generate drawing references."
        />

        <Card
          icon={<BookOpen />}
          title="Learning Roadmaps"
          text="Structured practice plans."
        />

      </div>

      {/* Suggestions */}

      <div className="mt-14 flex flex-wrap justify-center gap-3">

        {suggestions.map((item) => (

          <button
            key={item}
            className="rounded-full border border-stone-300 bg-white px-5 py-3 hover:bg-[#8B5A2B] hover:text-white transition"
          >
            {item}
          </button>

        ))}

      </div>

      <div className="mt-12 flex items-center gap-2 text-sm text-gray-500">

        <Lightbulb size={18} />

        Tip: Upload a sketch for personalized feedback.

      </div>

    </div>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow hover:shadow-xl transition">

      <div className="w-12 h-12 rounded-xl bg-[#E7D1B5] flex items-center justify-center text-[#8B5A2B]">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {text}
      </p>

    </div>
  );
}