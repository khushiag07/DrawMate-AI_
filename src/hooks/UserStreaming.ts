export async function streamText(

text:string,

callback:(value:string)=>void

){

let current="";

const words=text.split(" ");

for(const word of words){

current+=word+" ";

callback(current);

await new Promise(resolve=>

setTimeout(resolve,35)

);

}

}