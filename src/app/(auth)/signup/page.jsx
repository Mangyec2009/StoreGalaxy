"use client"
import React, { useRef } from 'react'

const SignUp = () => {
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);

  // Функция для обработки нажатия Enter
  const handleKeyPress = (e, nextField) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Предотвращаем отправку формы при нажатии Enter
      if (nextField) {
        nextField.focus(); // Переход к следующему полю
      }
    }
  }

  return <div className='w-full bg-red-500 h-screen flex items-center justify-center'>
    <div className="w-[45%] flex flex-col items-center">
      <h1>Sign Up</h1>
      <form className="flex flex-col w-[80%] items-center bg-purple-700">
        <input 
          type="text" 
          id="username" 
          placeholder="Имя пользователя" 
          tabIndex="1" 
          className='border-[1px] outline-none border-[white] rounded-[15px] w-[80%]'

          onKeyDown={(e) => handleKeyPress(e, passwordRef.current)} 
        />
        <input 
          type="password" 
          id="password" 
          placeholder="Пароль" 
          tabIndex="2" 
          className='border-[1px] outline-none border-[white] rounded-[15px] w-[80%]'
          ref={passwordRef}
          onKeyDown={(e) => handleKeyPress(e, buttonRef.current)} 
        />
        <button 
          type="submit" 
          tabIndex="3" 
          className='bg-white text-black py-[5px] rounded-[15px] w-[80%]'
          ref={buttonRef}
        >
          Войти
        </button>
      </form>
    </div>
  </div>
}

export default SignUp
