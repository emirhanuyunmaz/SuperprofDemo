import { RiVideoOnLine } from "react-icons/ri";

export default function OnlineButton(){
    return(<button className="flex justify-start gap-3 hover:bg-red-100 w-full relative items-center group rounded-2xl py-1 px-3 " ><RiVideoOnLine className={``} /> <p className=" duration-300">Online</p> </button>)
}