import { useCallback, useEffect, useRef, useState } from "react";
import React from 'react'
 function PassGen() {
    const [length, setLength] = useState(6);
    const [numberAllowed , setNumberAllowed] = useState(false);
    const [character, setCharacter] = useState(false);
    const [passsword, setPassword] = useState(" ");

    // useRef hook
    const passwordRef = useRef(null)

    const PasswordGenerator = useCallback( () => {
        let Pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(numberAllowed) str += "123456789"
        if(character) str += "`~@#$%^&*(){}[]?"


        for (let i = 1; i <= length; i++) {
           let char = Math.floor(Math.random() * str.length + 1);
           Pass += str.charAt(char);
            
        }
        setPassword(Pass);
    },[length,numberAllowed, character,setPassword])

    const copyPasswordToClipboard = useCallback(( ) => {
      passwordRef.current?.select() 
       window.navigator.clipboard.writeText(passsword)
    } ,[passsword])

    useEffect(() => {
        PasswordGenerator()
    },[length,numberAllowed,character,setPassword])

    return(
        <>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-5 px-4 my-8  bg-gray-800  text-teal-400">
         <h1 className="text-center text-white  text-3xl font-weight-900 my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
          value={passsword}
            className="outline-none w-full py-1 px-3 text-black"
            placeholder="password"
            readOnly
            ref={passwordRef}
        
          />
          <button
           className="bg-sky-500
            text-white py-.5
             px-3 shrink-0
              hover:bg-sky-700"
              onClick={copyPasswordToClipboard}
              >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={100}
           value={length}
            className="cursor-pointer" 
         onChange={(e) => {setLength(e.target.value)}}
            />
            <label >Lenght: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
         onClick={(prev)=> {
            setNumberAllowed((prev) => !prev)
         }}
             />
             <label htmlFor="numberInput">Numbers</label>

          </div>

          
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={character}
            id="characterInput"
            onClick={(prev)=> {
                setCharacter((prev) => !prev)
             }}
                 
             />
             <label htmlFor="characterInput">Charactor</label>

          </div>
        </div>
      </div>
        </>
    )
 }
export default PassGen;





 