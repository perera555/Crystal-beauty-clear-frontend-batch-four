import { useState } from "react";

export default function TestingPage() {
  const [number, setNumber] = useState(0);


  function increment() {
    setNumber(number + 1);
    console.log(number);
  }

 function decrement() {
   setNumber(number - 1);
   console.log(number);
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <span className="text-3xl font-bold">{number}</span>
      <div className="w-full flex justify-center items-center"> 

        <button onClick={increment} className="bg-blue-500 text-white p-2 rounded w-[60px] cursor-pointer">+</button>
        <button onClick={decrement} className="bg-blue-500 text-white p-2 rounded w-[60px] cursor-pointer">-</button>


      </div>
        
    </div>

  );
}