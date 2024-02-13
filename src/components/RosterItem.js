import React from 'react';
import { Link } from 'react-router-dom';



const RosterItem = ({ idPlayer, strCutout, strPlayer }) => {
  return (
    <Link className='roster-el roster-item relative' to={`/player/${idPlayer}`}>
      <div className='flex items-center cursor-pointer'>
        <div className="roster-img-el bg-primary-color max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] relative rounded-lg mr-8">
            <img className='absolute bottom-0 left-[50%] translate-x-[-50%] w-[90%]' 
                src=''
                data-src={strCutout || `../images/defaultplayer.png` } 
            />
        </div>
        <p className=''>{strPlayer}</p>
      </div>
    </Link>
  );
}

export default RosterItem;
