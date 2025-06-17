import { IoSunny } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Title = ({ theme, setTheme, score }) => {
  const navigate = useNavigate();

  return (
    <div className={`${!theme ? 'bg-[#e0e0e0]' : 'bg-[#2D3242]'} w-[40vw] h-[6vw] rounded-2xl drop-shadow-xl flex justify-around items-center mr-[7vw]`}>
      <h3 className='text-[1.2vw] font-semibold'>score: {score}pts</h3>
      <h1 onClick={() => navigate('/starter')} className='cursor-pointer text-[2vw] font-semibold'>UnWorded</h1>

      <div className='flex text-[1.6vw] gap-[1vw]'>
        <IoSunny
          onClick={() => theme && setTheme(false)}
          className={`cursor-pointer transition-opacity duration-300 ${!theme ? 'opacity-100' : 'opacity-25'}`}
        />
        <IoMoonSharp
          onClick={() => !theme && setTheme(true)}
          className={`cursor-pointer transition-opacity duration-300 ${theme ? 'opacity-100' : 'opacity-25'}`}
        />
      </div>
    </div>
  );
};

export default Title;