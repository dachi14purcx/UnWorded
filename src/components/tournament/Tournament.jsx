import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Tournament = (props) => {
  const navigate = useNavigate()

  const player = <div className='w-[5vw] h-[5vw] rounded-[100px] border-[2.5vw] border-white text-[1.3vw] font-bold flex items-center justify-center text-blue-800'>You</div>

  const avatars = [
    "https://cdn.prod.website-files.com/62bdc93e9cccfb43e155104c/654e8c59670ef4e1734cb62e_63c3c41074f93499edb73ffa_Funny%2520Dog%2520Pfp%2520for%2520Tiktok%25201.jpeg",
    "https://tr.rbxcdn.com/180DAY-d2aa8b558f4c73dc77ab184210a56788/420/420/Hat/Webp/noFilter",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgvcYENw56CyFBsPblzAEUr9nQbEvqbD79QQ&s",
    "https://preview.redd.it/bcyq3rjk2w071.png?auto=webp&s=97c9b873f1b41a7b9ff31331fd92f2e3fafed92f",
    "https://i.pinimg.com/474x/25/1c/e1/251ce139d8c07cbcc9daeca832851719.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9oq8vhrZWuASFrhOqfj4rPD0H-UKzzK2_tQ&s",
    "https://pbs.twimg.com/media/E5JomBpVIAA3WdW.jpg"
  ]

  const [scores, setScores] = useState([])
  const [gamesPlayed, setGamesPlayed] = useState(localStorage.getItem('played'))

  useEffect(() => {
    const stored = localStorage.getItem('played')
    setGamesPlayed(stored ? JSON.parse(stored) : 1)

    const randomScores = Array.from({ length: avatars.length - 1 }, () =>
      Math.floor(Math.random() * 100 + 70)
    )
    setScores([props.tourScore, ...randomScores])
  }, [props.tourScore])

  useEffect(() => {
    localStorage.setItem('played', JSON.stringify(gamesPlayed))
  }, [gamesPlayed])

  const getAvatar = (url) => (
    <img src={url} alt="" className={`w-[5vw] rounded-[100px]`} />
  )

  const user = avatars.map((url) =>
    getAvatar(url)
  )

  if (parseInt(gamesPlayed) === 2 && scores.length) {
    localStorage.setItem('score1', JSON.stringify(scores));
  } else if(parseInt(gamesPlayed) === 3 && scores.length){
    localStorage.setItem('score2', JSON.stringify(scores))
  } else if(parseInt(gamesPlayed) === 4 && scores.length){
    localStorage.setItem('score3', JSON.stringify(scores))
  }

  const scores1 = JSON.parse(localStorage.getItem('score1')) || []
  const scores2 = JSON.parse(localStorage.getItem('score2')) || []
  const scores3 = JSON.parse(localStorage.getItem('score3')) || []

  const user2 =
    scores.length > 0
      ? [
          scores1[0] >= scores1[1] ? player : user[0],
          scores1[2] >= scores1[3] ? user[1] : user[2],
          scores1[4] >= scores1[5] ? user[3] : user[4],
          scores1[6] >= scores1[7] ? user[5] : user[6],
        ]
      : [];

  const user3 = 
    scores.length > 0
      ? [
          scores2[0] >= scores2[1] ? user2[0] : user2[1],
          scores2[2] >= scores2[3] ? user2[2] : user2[3],
        ]
      : [];

  const winner = scores.length && scores3[0] >= scores3[1] ? user3[0] : user3[1]

  const playerInUser2 = user2.includes(player);
  const playerInUser3 = user3.includes(player);
  const isPlayerStillInGame = gamesPlayed === 1 || (gamesPlayed === 2 && playerInUser2) || (gamesPlayed === 3 && playerInUser3)

  const onToggle = () => {
    if(gamesPlayed < 4 && isPlayerStillInGame){
      navigate('/tourGame'),
      setGamesPlayed(prev => prev + 1)
    } else {
      localStorage.removeItem('played');
      localStorage.removeItem('score1');
      localStorage.removeItem('score2');
      localStorage.removeItem('score3');

      setGamesPlayed(1);
      setScores([]);
      setTourScore(0)
    }
  }
  return (
    <div className='w-[82%] flex flex-col flex-wrap items-center h-[40vw] justify-center mt-[1vw] gap-y-[5vw] m-auto'>
      <div className='flex flex-col gap-y-[6.5vw] flex-wrap h-[16.5vw] justify-center relative'>
        {player}
        {user[0]}
        <div className={`w-[5vw] h-[12vw] border-[0.4vw] border-l-0 ml-[1vw] mr-[3vw] transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`w-[2vw] h-[0.4vw] bg-white absolute right-[6vw] transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}>{user2[0]}</div>
      </div>

      <div className='flex flex-col gap-y-[6.5vw] flex-wrap h-[16.5vw] justify-center relative'>
        {user[1]}
        {user[2]}
        <div className={`w-[5vw] h-[12vw] border-[0.4vw] border-l-0 ml-[1vw] mr-[3vw] transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`w-[2vw] h-[0.4vw] bg-white absolute right-[6vw] transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}>{user2[1]}</div>
      </div>

      <div className='flex items-center relative'>
        <div className={`w-[5vw] h-[22vw] border-[0.4vw] border-l-0 ml-[1vw] mr-[3vw] transition-opacity duration-500 ${gamesPlayed >= 3 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`w-[2vw] h-[0.4vw] bg-white absolute right-[6vw] transition-opacity duration-500 ${gamesPlayed >= 3 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`transition-opacity duration-500 ${gamesPlayed >= 3 ? 'opacity-100' : 'opacity-0'}`}>{user3[0]}</div>
      </div>

      <div className='flex items-center gap-[0.5vw] mt-[5vw] mb-[5vw]'>
        <div className={`w-[4vw] h-[0.4vw] border-[0.2vw] transition-opacity duration-500 ${gamesPlayed >= 4 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`transition-opacity duration-500 ${gamesPlayed >= 4 ? 'opacity-100' : 'opacity-0'}`}>{winner}</div>
        <div className={`w-[4vw] h-[0.4vw] border-[0.2vw] transition-opacity duration-500 ${gamesPlayed >= 4 ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      <button onClick={onToggle}
              className={`absolute text-[1.5vw] ${gamesPlayed < 4 && isPlayerStillInGame ? 'bg-[#4FB145]' : 'bg-[#B41515]'} text-white mt-[15vw] font-bold w-[9vw] h-[4.5vw] rounded-2xl drop-shadow-2xl cursor-pointer`}>
        {gamesPlayed < 4 && isPlayerStillInGame ? 'Play' : 'Play Again'}
      </button>

      <div className='flex items-center relative'>
        <div className={`transition-opacity duration-500 ${gamesPlayed >= 3 ? 'opacity-100' : 'opacity-0'}`}>{user3[1]}</div>
        <div className={`w-[5vw] h-[22vw] border-[0.4vw] border-r-0 mr-[1vw] ml-[3vw] transition-opacity duration-500 ${gamesPlayed >= 3 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`w-[2vw] h-[0.4vw] bg-white absolute left-[6vw] transition-opacity duration-500 ${gamesPlayed >= 3 ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      <div className='flex flex-col gap-y-[6.5vw] flex-wrap-reverse h-[16.5vw] justify-center relative'>
        {user[3]}
        {user[4]}
        <div className={`w-[5vw] h-[12vw] border-[0.4vw] border-r-0 mr-[1vw] ml-[3vw] transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`w-[2vw] h-[0.4vw] bg-white absolute left-[6vw] transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}>{user2[2]}</div>
      </div>

      <div className='flex flex-col gap-y-[6.5vw] flex-wrap-reverse h-[16.5vw] justify-center relative'>
        {user[5]}
        {user[6]}
        <div className={`w-[5vw] h-[12vw] border-[0.4vw] border-r-0 mr-[1vw] ml-[3vw] transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`w-[2vw] h-[0.4vw] bg-white absolute left-[6vw] transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`transition-opacity duration-500 ${gamesPlayed >= 2 ? 'opacity-100' : 'opacity-0'}`}>{user2[3]}</div>
      </div>
    </div>
  )
}

export default Tournament