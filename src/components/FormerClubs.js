import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormerClubItem from './FormerClubItem';

const FormerClubs = ({team}) => {
    const {idPlayer} = useParams();

    const [loading, setLoading] = useState(false)
    const [formerClubs, setFormerClubs] = useState([])
    const [lastTeamDeparted, setLastTeamDeparted] = useState(null);

    const getFormerClubs = async() => {
        setLoading(true)
        try {
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupformerteams.php?id=${idPlayer}`);
            const data = await response.json();
            console.log(data)

            if (data.formerteams.length > 0) {
              const sortedData = data.formerteams.sort((a, b) => a.strJoined - b.strJoined);
              setFormerClubs(sortedData)


            }

            const lastDate = data.formerteams.reduce((maxDateItem, currentItem) => {
            // Convert strDeparted strings to numbers
            const maxDate = parseInt(maxDateItem.strDeparted, 10);
            const currentDate = parseInt(currentItem.strDeparted, 10);

            // Compare the numbers and return the item with the higher strDeparted value
            return currentDate > maxDate ? currentItem : maxDateItem;
            }, data.formerteams[0]); // Start with the first item as the initial maxDateItem

            // Alternatively, you can use find after the reduce to get the same result
            const lastDateFind = data.formerteams.find(item => item.strDeparted === lastDate.strDeparted);

           console.log(lastDateFind)
       

           setLastTeamDeparted({strDeparted: lastDateFind.strDeparted, strFormerTeam: lastDateFind.strFormerTeam});


            
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
    
        getFormerClubs();
        
    }, [idPlayer])

  return (
    <div className='grid grid-cols-1 gap-4'>
        {formerClubs.map((item, index) => {
            return <FormerClubItem key={index} {...item}/>
        })} 

        {/* Present Team */}
        {lastTeamDeparted && lastTeamDeparted.strFormerTeam !== team && 
       <FormerClubItem 
        strJoined={lastTeamDeparted && lastTeamDeparted.strDeparted}
        strDeparted={'Present'}
        strFormerTeam={team}
        strTeamBadge={localStorage.getItem('teamLogo')}
        strMoveType={'Permanent'}
        /> }
    </div>
  )
}

export default FormerClubs