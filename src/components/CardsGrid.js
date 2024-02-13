import React, { useEffect, useState } from 'react'
import Card from './Card'

const CardsGrid = ({activeLeague, loading, setLoading}) => {
    
        const tempArray = Array.from({ length: 20 }, function(_, index) {
         return index; 
        });

    const [teams, setTeams] = useState(tempArray)
    const [error, setError] = useState('')

     
    const getCards = async() => {
        setLoading(true)
        try {
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${activeLeague}`)
            const data = await response.json();
            
            if(data.teams){
                setTeams(data.teams)
            }
          
           
            setLoading(false)
         
            
        } catch (error) {
            if(error){
                setError('Something has went wrong!')
            }
        }

    }

    useEffect(() => {
        getCards();
    }, [activeLeague])

    if(error){
        return <p className='text-center'>{error}</p>
    }
    

    return (
    <div className={`${loading && 'loading'} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8`}>
        {teams.map((item, index) => {
            return <Card key={index} {...item}/>
            
        })}
    </div>)
    
}

export default CardsGrid