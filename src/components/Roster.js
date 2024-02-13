import React, { useEffect, useState } from 'react'
import RosterItem from './RosterItem'

const Roster = ({idTeam}) => {
    const [loading, setLoading] = useState(false)
    const [roster, setRoster] = useState([])

    const getRoster = async() => {
        setLoading(true)
        try {
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.REACT_APP_API_KEY}/lookup_all_players.php?id=${idTeam}`);
            const data = await response.json();

            console.log(data)
            setRoster(data.player.filter((item) => item.strPosition !== 'Manager'))

          setTimeout(() => {
            setLoading(false)
          }, 1000)
        } catch (error) {
            console.log(error)
        }
        
    }


    useEffect(() => {
      getRoster();
    }, [idTeam])
    


    useEffect(() => {
          const rosterItems = document.querySelectorAll('.roster-item');

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
  
          const imgContainer = entry.target.children[0].children[0]
          const img = entry.target.children[0].children[0].children[0];
          
          const dataSrc = img.getAttribute('data-src')
          img.src = dataSrc

          imgContainer.className = 'roster-item-hover bg-primary-color w-[60px] h-[60px] relative rounded-lg mr-8'

        }
      });
    };

    const observerOptions = {
      root: null, // use the viewport as the root
      rootMargin: '0px', // no margin
      threshold: 1, // trigger when 50% of the element is visible
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each roster item
    rosterItems.forEach(item => {
      intersectionObserver.observe(item);
    });

    // Cleanup: disconnect the observer when the component unmounts
    return () => {
      intersectionObserver.disconnect();
    };


    }, [roster])
    




  return (
    <section className={loading && 'loading'}>
      <p className='text-el mb-10 text-2xl bold'><span>Team Roster:</span></p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {roster.map((item, index) => {
              return <RosterItem key={index} {...item}/>
          })}
      </div>
    </section>
  )
}

export default Roster