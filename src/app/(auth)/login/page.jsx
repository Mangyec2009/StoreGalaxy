"use client"
import React, { useRef } from 'react'
import { Poppins } from 'next/font/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
const poppins = Poppins({subsets: ["latin"], weight: "700", });
let link1 = "https://cdn-icons-png.flaticon.com/256/2702/2702602.png";
let link2 = "https://cdn-icons-png.flaticon.com/512/5968/5968764.png";
let link3 = "https://cdn-icons-png.flaticon.com/512/145/145812.png";


const SignUp = () => {
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();

  const handleKeyPress = (e, nextField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextField) {
        nextField.focus();
      }
    }
  }
  async function handleLogin(event) {
    event.preventDefault();
    let obj = {
      userName: event.target["username"].value,
      password: event.target["password"].value,
    };
    try {
      const { data } = await axios.post(
        `https://store-api.softclub.tj/Account/login`,
        obj
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem("access_token", data.data);
      }
      router.push('/');
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  }

  return <div 
            className='w-full h-screen bg-cover bg-center flex items-center justify-center'
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?cs=srgb&dl=pexels-felixmittermeier-956999.jpg&fm=jpg')"
            }}>
    <div className="w-[25%] flex flex-col h-[60%] backdrop-blur-md border-[3px] border-white bg-opacity-75 py-[20px] rounded-xl items-center">
      <h1 className={`${poppins.className} text-[30px] text-[white]`}>Log In</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-[30px] mt-[50px] w-[80%] h-[45%]  items-center ">
        <input 
          type="text" 
          id="username" 
          name='username'
          placeholder="Имя пользователя" 
          tabIndex="1" 
          className='border-[2px] shadow-md text-white px-[5px] py-[5px] bg-transparent outline-none border-[gray] rounded-[15px] w-[80%]'

          onKeyDown={(e) => handleKeyPress(e, passwordRef.current)} 
        />
        <input 
          type="password" 
          id="password" 
          name='password'
          placeholder="Пароль" 
          tabIndex="2" 
          className='border-[2px] shadow-md text-white px-[5px] py-[5px] bg-transparent outline-none border-[gray] rounded-[15px] w-[80%]'
          ref={passwordRef}
          onKeyDown={(e) => handleKeyPress(e, buttonRef.current)} 
        />
        <button 
          type="submit" 
          tabIndex="3" 
          className='bg-purple-600 text-white py-[5px] rounded-[15px] w-[80%]'
          ref={buttonRef}
        >
          Войти
        </button>
      </form>
      <h1 className='text-center text-[13px] text-[gray] mb-[15px]'>- Or login up using: -</h1>
      <div className='flex gap-[15px]'>
            <Link href={""}>
                <Image src={link2} width={500} height={0} alt='' className='w-[30px]' />
            </Link>
            <Link href={""}>
                <Image src={link3} width={500} height={0} alt='' className='w-[30px]' />
            </Link>
            <Link href={""}>
                <Image src={link1} width={500} height={0} alt='' className='w-[30px]' />
            </Link>
      </div>
    </div>
  </div>
}

export default SignUp
