import React, { useState, useEffect, useContext} from 'react'
import { AppContext } from '../context';
import { useNavigate, useParams } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa6";
import { DateTime } from 'luxon'; 
import { FormerClubs } from '../components';

const Player = () => {
  const navigate = useNavigate()
  const {idPlayer} = useParams();

  const {teamLogo, teamID} = useContext(AppContext);
  

  //Local States
  const [loading, setLoading] = useState(false)
  const [player, setPlayer] = useState({})
  const [flag, setFlag] = useState('')
  const [age, setAge] = useState(null);

  const [showFullDescription, setShowFullDescription] = useState(false)
  const [fullDescriptionLength, setFullDescriptionLength] = useState(null)

   const getPlayer = async () => {
   
    try {
      const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`);
      const data = await response.json();
      setPlayer(data.players[0]);
     
    } catch (error) {
      console.error('Error fetching player:', error);
    } 
  };

  const getNationFlag = async () => {
    if(player.strNationality === 'England'){
      player.strNationality = 'united kingdom'
    }

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${player.strNationality}`);
      const data = await response.json();
    
      const flagURL = data[0].flags.png;
      setFlag(flagURL)

    } catch (error) {
      console.error('Error fetching nation flag:', error);
    }
  };


  const calculateAge = (birthdate) => {
    const birthdateObj = DateTime.fromISO(birthdate);
    const currentDate = DateTime.now();

    setAge(currentDate.year - birthdateObj.year - (currentDate.month < birthdateObj.month || (currentDate.month === birthdateObj.month && currentDate.day < birthdateObj.day) ? 1 : 0));
}

  
  useEffect(() => {
    window.scrollTo(0,0)
    const fetchData = async () => {
      
      setLoading(true)
      await getPlayer();

      if (player.strNationality) {
        await getNationFlag();
      }

      if(player.dateBorn){
        calculateAge(player.dateBorn)
      }

      if(player.strDescriptionEN){
        setFullDescriptionLength(player.strDescriptionEN.length)
      }
    };

    fetchData();

   
     setTimeout(() => {
      setLoading(false)
    }, 1000)
  
  }, [idPlayer, player.strNationality]);


  return (
    <section className={loading && 'loading'}>
       <h1 className="text-2xl text-center mb-10 font-bold">Player Details</h1>
        <div className="sm-container">

           <button className="back-btn bg-secondary-color px-6 py-2 mb-5 rounded-md flex justify-center items-center" onClick={() => navigate(`/team/${localStorage.getItem('teamID')}`)}><FaChevronLeft className='mr-3'/>Back</button>
          <div className="box mb-6 md:mb-10">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10">
                <div className='img-el'>
                  <img className='rounded-lg min-w-full' src={player.strThumb === null ? '../../images/defaultCutout.png' : player.strThumb}/>
                </div>

                <div className='pl-2 pt-2 lg:pt-6 lg:pl-6'>
                  <h1 className="text-el mb-6 text-2xl md:text-5xl bold">{loading ? 'loading' : player.strPlayer}</h1>
                  <p className='text-el mb-6 text-md md:text-2xl flex items-center'><span className='bold'>Nation:</span> <img className='border-[1px] border-white w-[30px] min-h-[20px] md:w-[45px] md:min-h-[30px] ml-4 mr-3 rounded-xl h-auto' src={flag ? flag : ''}/>{player.strNationality} </p>
                  <p className='text-el mb-6 text-md md:text-2xl flex items-center'><span className='bold'>Team:</span> <img className='w-[30px] md:w-[40px] ml-4 mr-3 rounded-md h-auto' src={localStorage.getItem('teamLogo')}/> {player.strTeam}</p>
                  <p className='text-el mb-3 text-2xl md:text-4xl bold'>#{player.strNumber || 'N/A'}</p>
                </div>
              </div>
          </div>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10'>
          <div className="box md:mb-10">
             <div className="grid grid-cols-1 gap-10">
                <div>
                    <p className='text-el mb-3'><span>Position:</span> {player.strPosition || 'N/A'}</p>
                    <p className='text-el mb-3'><span>Height:</span> {player.strHeight || 'N/A'}</p>
                    <p className='text-el mb-3'><span>Weight:</span> {player.strWeight || 'N/A'}</p>
                </div>

                 <div>
                    <p className='text-el mb-3'><span>Age:</span> {age || 'N/A'}</p>
                    <p className='text-el mb-3'><span>Birthday:</span> {player.dateBorn || 'N/A'}</p>
                    <p className='text-el mb-3'><span>Birthplace:</span> {player.strBirthLocation || 'N/A'}</p>
                </div>

                 <div className='max-w-full overflow-scroll'>
                     <p className='text-el mb-3'><span>Facebook:</span> {player.strFacebook ? <a className='underline' href={`https://${player.strFacebook}`} target='_blank' >{player.strFacebook}</a> : 'N/A'}</p>
                      <p className='text-el mb-3'><span>Twitter:</span> {player.strTwitter ? <a className='underline' href={`https://${player.strTwitter}`} target='_blank' >{player.strTwitter}</a> :  'N/A'}</p>
                </div>
             </div>
          </div>

          <div className="box mb-6 md:mb-10">
             <p className='text-el mb-10 text-2xl'><span>Player History:</span></p>
             <FormerClubs team={player.strTeam}/>
          </div>

          </div>

           <div className="box read-more-box mb-10">
              <p className='text-el mb-10 text-2xl'><span>Description:</span></p>

               <p className='text-el'>
                  {loading ? 'Loading'
                  : !player.strDescriptionEN ? 'N/A'
                  : !showFullDescription && fullDescriptionLength > 500 ? `${player.strDescriptionEN.slice(0, 500)}...`
                  : showFullDescription && fullDescriptionLength > 500 ? player.strDescriptionEN
                  : !showFullDescription && fullDescriptionLength < 500 ? player.strDescriptionEN
                  : 'N/A'
                  }
              </p>

              {fullDescriptionLength >= 500  &&
                <button onClick={() => setShowFullDescription(!showFullDescription)}className="absolute bottom-[40px] left-[40px] py-3 px-6 rounded-lg bg-purple-color">
                  {!showFullDescription ? 'Read More' : 'Show Less'}
                </button>
              }
          </div>

        </div>
    </section>
  )
}

export default Player