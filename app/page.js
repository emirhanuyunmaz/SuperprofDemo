'use client'
import { SiGitbook } from "react-icons/si";
import { CiLocationOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import SearchButton from "./_components/SearchButton";
import LocationButton from "./_components/LocationButton";
import OnlineButton from "./_components/OnlineButton";
import { BookText, MapPin } from "lucide-react";

export default function Home() {
  

  const [mekan,setMekan] = useState("")
  const [firstClick,setFirstClick] = useState(false)
  const [isFocus,setIsFocus] = useState(false)
  const list = ['Ingilizce' , 'Matematik' , 'Yüzme' , 'Almanca' , 'Piyano' , 'Türkçe' , 'Gitar' , 'Tenis']
  const [selectedAlan , setSelectedAlan] = useState(1)
  const [alan,setAlan] = useState(`Deneyin "${list[0]}"`)
  const [isClicked , setIsClicked ] = useState(false)
  const [time,setTime] = useState()

  function changeAlan(){
    console.log(isClicked);
    if(!isClicked && alan !== ""){
      if(selectedAlan>0 && selectedAlan < 8  ){
        let t = setTimeout(function () {
          setSelectedAlan(selectedAlan+1)
          setAlan(`Deneyin "${list[selectedAlan]}"`)
        }, 2000)
        setTime(t)
      }else {
        setSelectedAlan(1)
      }
    }else{
      // setAlan("")
      clearTimeout(time)
      setIsClicked(true)
    }
  }
  
  useEffect(() => {
      changeAlan()
  },[alan])


  return (
    <main className="bg-gradient-to-t from-yellow-200 flex flex-col gap-10 justify-center items-center  h-[100vh]">
      
        <form action="" className="bg-white px-4 py-2 rounded-3xl flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-3 relative">
            <label htmlFor="Alan"><BookText  className="text-red-300" /></label>
            <input onFocus={(e) => {
              setIsClicked(true)
              setAlan("")
              setIsFocus(true)
            }} id="Alan" type="text" onClick={() => {
              setIsClicked(true)
              setAlan("")
              setFirstClick(true)
              }} value={alan} onChange={(event) => setAlan(event.target.value)} className="outline-none hover:cursor-pointer" placeholder={`Deneyin "${list[0]}"`} />
            {
              firstClick && isFocus && <>
              <div className="absolute bg-white mt-[360px]  py-2 rounded-2xl w-56">
                <ul className=" w-56 rounded-2xl p-3">
                {
                  list.map((item,index) => <li><SearchButton key={index} setAlan={setAlan} name={`${item}`} /></li>)
                }
                </ul>
              </div>
              </>
            }
          </div>
            {/* Tıklama işlemine göre yönlendirme */}
            <div className="flex justify-center items-center gap-3 relative">
              <label htmlFor="Mekan" className={`flex ${firstClick ? 'visible' : 'invisible'}`}>|<MapPin className="text-red-300" size={25} /></label>
              <input type="text" onFocus={(e)=> setIsFocus(false)} id="Mekan" placeholder={"Ders Mekanı"} value={mekan} onChange={(event) => setMekan(event.target.value)} className={`outline-none ${firstClick ? 'visible' : 'invisible'}`} />
              {
              firstClick && !isFocus &&  <>
              <div className="absolute bg-white mt-[166px]  py-2 rounded-2xl w-64">
                <ul className="w-64 rounded-2xl p-3">
                  <li><LocationButton  /></li>
                  <li><OnlineButton/></li>
                </ul>
              </div>
              </>
            }
            </div>
            
          <button className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:scale-110 duration-300 ">Ara</button>
        </form>
    </main>
  );
}
