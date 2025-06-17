import { useEffect, useState } from 'react';

const Lastseen = () => {
  const [lastSeen, setLastSeen] = useState(localStorage.getItem('time'));

  useEffect(() => {
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();
    const now = date + ' ' + time

    localStorage.setItem('time', now);
  }, []);

  return <p className='text-[1.2vw] font-medium'>Last seen: {lastSeen || 'First time here!'}</p>;
};

export default Lastseen;