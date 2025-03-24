import React, {useContext} from 'react'
import {UserContext} from '../../context/userContext'
import {SIDE_MENU_DATA} from '../../utils/data'
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ activeMenu }) => {
  const {user, clearUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
    }

    navigate(route);
  }

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  }
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 sticky top-[61px] p-5 z-[20px]">
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        {user?.profileImageUrl ? (
          <img src={user?.profileImageUrl || ""} alt="User" className="w-20 h-20 bg-slate-400 rounded-full" />
        ) : (
          <></>
        )}
        <h5 className='text-gray-950 font-medium leading-6'>{user?.name || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) =>  
      (<button
      key={`menu_${index}`}
      className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? 'text-white bg-primary'  : ''} py-3 px-6 rounded-lg mb-3`}
      onClick={() => handleClick(item.path)}>
      
      <item.icon className='text-xl' />
      {item.label}
      </button>))}
    </div>
  )
};

export default SideMenu