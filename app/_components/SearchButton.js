import { IoSearchOutline } from "react-icons/io5";


export default function SearchButton ({name,setAlan}){

    function onClick(e){
        e.preventDefault()
        setAlan(name)
        document.getElementById("Mekan").focus();
    }

    return(<button onClick={(e) => onClick(e)} className="flex justify-start items-center gap-3 w-full hover:bg-red-100 group rounded-2xl py-1 px-3" ><IoSearchOutline className="text-gray-400 group group-hover:text-black " /> {name}</button>)
}