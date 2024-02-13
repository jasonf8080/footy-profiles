import React, { useEffect, useState } from 'react'
import { leagues } from '../utils/data'
import { CardsGrid, LeagueSelect } from '../components'

const Teams = () => {
    const [activeLeague, setActiveLeague] = useState('English%20Premier%20League');
    const [loading, setLoading] = useState(false)
    
  return (
    <section>
        <div className="sm-container">
            <h1 className="text-2xl text-center mb-10 font-bold bold">Select a League</h1>

            <h3 className="text-lg ml-2 mb-4 font-bold bold">Leagues</h3>

            {/* Desktop Select Items */}
            <div className="flex justify-start items-center overflow-x-auto pb-[20px]">
                {leagues.map((item, index) => {
                    return <LeagueSelect key={index}
                     {...item}
                     activeLeague={activeLeague}
                    setActiveLeague={setActiveLeague}
                    loading={loading}/>
                })}
            </div>

            
            <div className="cards-container mt-6 mb-10">
                <CardsGrid activeLeague={activeLeague} loading={loading} setLoading={setLoading}/>
            </div>

        </div>
    </section>
  )
}

export default Teams