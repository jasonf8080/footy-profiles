import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Card = ({idTeam, strTeamBadge, strTeam, strStadium, strCountry}) => {

  return (

   <Link to={`/team/${idTeam}`}>
   

    <div className="card-el bg-secondary-color p-6 min-w-full max-w-full rounded-xl">
      <div className="flex items-start">
        <img className='max-w-[80px] mr-6' src={strTeamBadge}/>

        <div className='pt-2'>
          <p className='text-el font-bold mb-2 text-xl'>{strTeam}</p>
          <p className='text-el'>{strStadium}</p>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default Card

//Cart Alt
 {/* <div className='team-item bg-secondary-color max-w-full min-w-full rounded-lg'>
        <div className="card-el bg-secondary-lighter-color py-10 rounded-t-lg rounded-b-none">
            <img className='max-w-[100px] h-auto mx-auto rounded-t-lg' src={strTeamBadge} alt={strTeam}/>
        </div>

        <div className='py-4 px-8'>
            <p className='text-el'>Team: {strTeam}</p>
            <p className='text-el my-3'>Stadium: {strStadium}</p>
            <p className='text-el'>Nation: {strCountry}</p>
        </div>
    </div> */}