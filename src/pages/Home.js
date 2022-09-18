import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStarShips } from '../redux/starshipsSlice'



export default function Home() {

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
      <h1>
        starships
      </h1>
   
    {
      starships.map((starship)=>(
        <div key={starship.name}>
          {starship.name}
        </div>
      ))
    }


    </div>
  )
}


