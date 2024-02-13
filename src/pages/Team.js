import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../context';
import { useNavigate, useParams } from 'react-router-dom'
import { Roster } from '../components';
import { FaChevronLeft } from "react-icons/fa6";
import { logos } from '../utils/data';

const Team = () => {
  const navigate = useNavigate();
  const {idTeam} = useParams()
  
   const {teamLogo, setTeamLogo, teamID, setTeamID} = useContext(AppContext);

  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [team, setTeam] = useState({})
  const [flag, setFlag] = useState('')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [fullDescriptionLength, setFullDescriptionLength] = useState(null)

  const getTeam = async() => {
    setLoading(true)
    try {
      const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.REACT_APP_API_KEY}/lookupteam.php?id=${idTeam}`);
      const data = await response.json();

      setTeam(data.teams[0])

      localStorage.setItem('teamLogo', data.teams[0].strTeamBadge)
      localStorage.setItem('teamID', data.teams[0].idTeam)

      const img = new Image();
      img.src = '/images/teamBackground.png';

      img.onload = () => {
        setImage(img.src)
        setLoading(false)
      }
      
 

    } catch (error) {
      console.log(error)
    }
    
  }


  const getNationFlag = async () => {
    if(team.strCountry === 'England'){
      team.strCountry = 'united kingdom'
    }

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${team.strCountry}`);
      const data = await response.json();
    
      const flagURL = data[0].flags.png;
      setFlag(flagURL)
    } catch (error) {
      console.error('Error fetching nation flag:', error);
    }
  };



 

  //init
    useEffect(() => {
      window.scrollTo(0,0)
      const fetchData = async () => {
        setLoading(true)
        await getTeam();

        if(team.strCountry) {
          await getNationFlag();
        }

        if(team.strDescriptionEN){
          setFullDescriptionLength(team.strDescriptionEN.length)
        }
      };

      fetchData();

      setTimeout(() => {
        setLoading(false)
      }, 1000)
  }, [idTeam, team.strCountry]);



  return (
    <section className={loading && 'loading'}>
        <div className="sm-container">
            <h1 className="text-2xl text-center mb-10 font-bold bold">Club Information</h1>

           <button className="back-btn bg-secondary-color px-6 py-2 mb-5 rounded-md flex justify-center items-center" onClick={() => navigate('/')}><FaChevronLeft className='mr-3'/>Back</button>
            <div className="box mb-6 md:mb-10">
                <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-10'>

                  <div className="img-el relative flex justify-center items-center w-[100%] h-auto">
                    <img className='w-full h-full min-w-full min-h-full max-w-full max-h-full rounded-xl brightness-[35%]' src={image} alt='/teamBG'/>
                    <img className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-52%] max-w-[60%] h-auto' src={team.strTeamBadge}/>
                  </div>

                  <div className='pt-4 lg:pt-8 pl-0 md:pl-10 '>
                    <h1 className="text-el text-3xl md:text-6xl mb-3 md:mb-8 text-center lg:text-left bold">{loading ? 'Loading' : team.strTeam}</h1>
                    <p className='text-el text-md md:text-2xl text-center lg:text-left flex justify-center lg:justify-start items-center'>
                      <img className='max-w-[25px] md:max-w-[40px] h-auto mr-[10px] md:mr-3' src={team.strLeague && logos.find((item) => item.league === team.strLeague).logo}/>
                      {loading ? 'Loading' : team.strLeague}
                      
                    </p>
                   
                  </div>
                </div>
            </div>

            <div className="box mb-6 md:mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div>
                      {/* <p className='text-el flex items-center mb-3'><span className='bold'>Nation:</span> <img src={flag ? flag : ''} className='border-[1px] border-white ml-4 mr-3 w-[30px] min-h-[20px] h-auto rounded-lg'/> {team.strCountry}</p> */}
                      <p className='text-el flex items-center mb-3'><span className='bold'>Nation:</span> <img src={flag ? flag : ''} className='border-[1px] border-white ml-4 mr-3 w-[30px] min-h-[20px] h-auto rounded-lg'/> {team.strCountry}</p>
                      <p className='text-el mb-3'><span className='bold'>Location:</span> {team.strStadiumLocation}</p>
                      <p className='text-el mb-3'><span className='bold'>Formed:</span> {team.intFormedYear}</p>
                  </div>

                  <div>
                      <p className='text-el mb-3'><span className='bold'>Stadium:</span> {team.strStadium}</p>
                     <p className='text-el mb-3'><span className='bold'>Capacity:</span>{Number(team.intStadiumCapacity).toLocaleString()}</p>


                  </div>

                  <div className='max-w-full overflow-scroll'>
                       <p className='mb-3 text-el'><span className='bold'>Website:</span> {team.strWebsite ? <a className='underline limit-link' href={`https://${team.strWebsite}`} target='_blank' >{team.strWebsite}</a> : 'N/A'}</p>
                       <p className='mb-3 text-el'><span className='bold'>Facebook:</span> {team.strFacebook ? <a className='underline limit-link' href={`https://${team.strFacebook}`} target='_blank' >{team.strFacebook}</a> : 'N/A'}</p>
                       <p className='mb-3 text-el'><span className='bold'>Twitter</span>: {team.strTwitter ? <a className='underline limit-link' href={`https://${team.strTwitter}`} target='_blank' >{team.strTwitter}</a> : 'N/A'}</p>
                  </div>
              </div>
            </div>


            <div className="box read-more-box mb-6 md:mb-10">
              <p className='text-el mb-10 text-2xl'><span className='bold'>Description:</span></p>

              <p className='text-el'>
                  {loading ? 'Loading'
                  : !showFullDescription && fullDescriptionLength > 500 ? `${team.strDescriptionEN.slice(0, 500)}...`
                  : showFullDescription && fullDescriptionLength > 500 ? team.strDescriptionEN
                  : 'N/A'}
              </p>

              {fullDescriptionLength >= 500  &&
                <button onClick={() => setShowFullDescription(!showFullDescription)}className="absolute bottom-[40px] left-[40px] py-3 px-6 rounded-lg bg-purple-color">
                  {!showFullDescription ? 'Read More' : 'Show Less'}
                </button>
              }

            </div>

            <div className="box mb-10">
              <Roster idTeam={idTeam}/>
            </div>
         </div>
    </section> 
  )
}

export default Team