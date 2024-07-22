'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";

export default function LocationButton(){
    const [latitude,setLatitude] = useState(0)
    const [longitude,setLongitude] = useState(0)
    const [isPermission ,setIsPermission] = useState(false)
    const route = useRouter()

    function showError(error) {
        console.log("hata...");
        switch(error.code) {
          case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
          case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
          case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
          case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
        }
      }
    
    async function handleClick(e){
        e.preventDefault()
        console.log("Location::");
        await navigator.permissions.query({name : "geolocation"}).then((res) => {
            if(res.state === "granted"){
                console.log("İzin var");
                setIsPermission(true)
                navigator.geolocation.getCurrentPosition(async(position) => {
                    console.log(position.coords.latitude + " " + position.coords.longitude);
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                },showError)
            }else if (res.state === "prompt"){
                console.log("İzin yok");
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position.coords.latitude + " " + position.coords.longitude);
                },showError)
            alert('Please allow location access.')      
        }else if(res.state === "denied"){
            console.log("Denied");
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
            },(err) => {
                console.log(err);
            })
        }
       })

       const res = await axios.get(`https://api.api-ninjas.com/v1/reversegeocoding?lat=${latitude}&lon=${longitude}`,{
            headers:{
                'X-Api-Key':process.env.NEXT_PUBLIC_API_KEY
            }
        }
        )
        if(res.status === 200 ){
            console.log("İşlem başarılı")
            console.log(res.data)
            route.push(`/${res.data[0].name}`)
        }

    }
    
    return(<button onClick={(e) => {
        
        handleClick(e)
    }} className="flex justify-start gap-3 hover:bg-red-100 w-full relative items-center group rounded-2xl py-1 px-3 " ><FaLocationCrosshairs className={``} /> Yakınlarımda </button>)
}