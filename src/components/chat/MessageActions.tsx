import {
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface Props{
  text:string;
}

export default function MessageActions({
  text,
}:Props){

const copy=()=>{
navigator.clipboard.writeText(text);
};

return(

<div className="flex gap-3 mt-5">

<button
onClick={copy}
className="hover:text-[#8B5A2B]"
>
<Copy size={18}/>
</button>

<button>
<RotateCcw size={18}/>
</button>

<button>
<ThumbsUp size={18}/>
</button>

<button>
<ThumbsDown size={18}/>
</button>

</div>

);

}