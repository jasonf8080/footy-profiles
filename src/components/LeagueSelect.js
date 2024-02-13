import React, { useEffect, useState } from 'react'

const LeagueSelect = ({loading, league, country, url, activeLeague, setActiveLeague}) => {

  const [flagLoading, setFlagLoading] = useState(false)
  const [flag, setFlag] = useState('')

  const getNationFlag = async () => {
    if(country === 'england'){
      country = 'united kingdom'
    }

    
    setFlagLoading(true)
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      const data = await response.json();
     
      const flagURL = data[0].flags.png;
      setFlag(flagURL)
     
    } catch (error) {
      console.error('Error fetching nation flag:', error);
    }

     setFlagLoading(false)
  };

  useEffect(() => {
    getNationFlag();
  }, [])
  
  return (
    <button className={`${flagLoading && 'loading'} ${activeLeague === url ? 'bg-purple-color' : 'bg-secondary-lighter-color'} 
      league-button relative flex justify-around items-center px-6 py-3 mr-3 md:mr-5 rounded-xl cursor-pointer min-w-[150px] max-w-[150px] sm:min-w-[180px] sm:max-w-[180px] lg:min-w-none lg:max-w-none`}
      disabled={loading} onClick={() => setActiveLeague(url)}>
        
      <img className='w-[25px] min-h-[15px] md:w-[30px] md:min-h-[20px] h-auto rounded-md mr-3 border-[1px] border-primary-color' src={flag ? flag : ''} alt={country} />
      <p className='text-sm md:text-md'>{league}</p>
    </button>
  )
}

export default LeagueSelect