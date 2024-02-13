import React from 'react'

const FormerClubItem = ({strFormerTeam, strTeamBadge, strJoined, strDeparted, strMoveType}) => {
  return (
    <div className='flex items-start text-el max-w-full'>
        <img src={strTeamBadge} className='w-[40px] h-auto mr-8'/>
        
        <div>
            <h2 className="text-lg">{strFormerTeam} {strMoveType !== 'Permanent' && `(${strMoveType})`}</h2>
            <p>{strJoined && strJoined.includes('-') ? strJoined.split('-')[0] : strJoined || 'N/A'}
             - {strDeparted && strDeparted.includes('-') ? strDeparted.split('-')[1] : strDeparted || 'N/A'}
             </p>
        </div>
    </div>
  )
}

export default FormerClubItem