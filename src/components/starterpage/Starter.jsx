import { useNavigate } from "react-router-dom"

const Starter = ({theme}) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='flex flex-col gap-[5vw] mt-[2vw] items-center'>
          <h1 className='text-[6vw] font-bold'>Start Playing</h1>
          <div className='flex gap-[14vw]'>
              <div onClick={() => navigate('/tournament')} className='cursor-pointer bg-[#4FB145] text-[2.5vw] text-white font-semibold p-[3vw] rounded-3xl drop-shadow-2xl'>Play Tournament</div>
              <div onClick={() => navigate('/game')} className='cursor-pointer bg-[#B41515] text-[2.5vw] text-white font-semibold p-[3vw] rounded-3xl drop-shadow-2xl'>Quick Match</div>
          </div>
          <h2 className='text-[2vw] opacity-85'>"Where words become your weapon."</h2>
      </div>

      <div className={`${!theme ? 'bg-[#e0e0e0]' : 'bg-[#2D3242]'} flex items-center justify-center w-screen absolute bottom-0 tracking-widest h-[3.5vw] text-[1.2vw]`}>© 2025 UnWorded</div>
    </div>
  )
}

export default Starter