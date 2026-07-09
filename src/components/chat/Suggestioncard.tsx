interface Props{
    title:string;
    text:string;
}

export default function SuggestionCard({
    title,
    text,
}:Props){

return(

<button
className="
rounded-2xl
bg-white
shadow-lg
hover:shadow-xl
transition
p-6
text-left
border
border-stone-200
hover:border-[#8B5A2B]
group
">

<h3 className="font-semibold text-lg">

{title}

</h3>

<p className="text-gray-500 mt-2">

{text}

</p>

</button>

)

}