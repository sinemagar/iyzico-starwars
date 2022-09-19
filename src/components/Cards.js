import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  fetchStarShips } from '../redux/starshipsSlice';
import PageButton from './PageButton';

function Cards() {
     //get  with useSelector
  const starships = useSelector((state) => state.starships.items);
  console.log("starships:",starships);
  const dispatch = useDispatch();

  //dispatch event wt useEffect
  useEffect(() => {
    dispatch(fetchStarShips());
   
  }, [dispatch]);


  return (
    <div>
      
    {
      starships.map((starship)=>(
        <div className='ui three column centered grid' key={starship.name}>
            
          <div className='column'>
            <div className='ui segment'>
            {starship.name}
            </div>
          </div>
        </div>
      ))
    }
    <PageButton/>
    </div>
  )
}

export default Cards
