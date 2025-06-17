import React from 'react'
import Title from './Title'
import Lastseen from './Lastseen'
import History from './History'

const Header = (props) => {
  return (
    <nav className='flex justify-center gap-[6vw] mt-[1vw] items-center'>
        <Lastseen />
        <Title theme={props.theme} setTheme={props.setTheme} score={props.score}/>
        <History history={props.history}/>
    </nav>
  )
}

export default Header