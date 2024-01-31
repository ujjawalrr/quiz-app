import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import GuestForm from '../components/GuestForm';
import bgImg from '../assets/images/bgImg.png'

const Home = () => {
  const [activeTab, setActiveTab] = useState('guest');

  const openTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-full mx-auto flex justify-center items-center h-[100vh] bg-gradient-to-b from-[#4477a6] to-[#91a4b5]">
      <div className='bg-white rounded-lg p-4 h-[357px] sm:w-[352.6px] flex flex-col justify-between'>
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 focus:outline-none ${activeTab === 'register'
              ? 'bg-[#ef7931] text-white'
              : 'bg-gray-200 text-gray-700'
              }`}
            onClick={() => openTab('register')}
          >
            Register
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${activeTab === 'login'
              ? 'bg-[#ef7931] text-white'
              : 'bg-gray-100 text-gray-700'
              }`}
            onClick={() => openTab('login')}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${activeTab === 'guest'
              ? 'bg-[#ef7931] text-white'
              : 'bg-gray-300 text-gray-700'
              }`}
            onClick={() => openTab('guest')}
          >
            Continue as Guest
          </button>
        </div>
        <div className="mt-4">
          {activeTab === 'register' && <RegisterForm />}
          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'guest' && <GuestForm />}
        </div>
      </div>
      <div>
        <img src={bgImg} alt="" />
      </div>
    </div>
  );
};

export default Home;
