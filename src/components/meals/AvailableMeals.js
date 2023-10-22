import { useEffect, useState } from "react";
import Card from "../ui/Card";
import style from "./available.module.css"
import MealItem from "./mealitem/MealItem";

const AvailableMeals = ()=>{
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)
  useEffect(()=>{
    const fetchMeals = async()=>{
        const response =  await fetch('https://react-http-afcc1-default-rtdb.firebaseio.com/meals.json')
        if(!response.ok){
          throw new Error("something went wrong!")
        }
        const responseData = await response.json()

        const loadedMeals = []

        for(const key in responseData){
          loadedMeals.push({
            id:key,
            name:responseData[key].name,
            description:responseData[key].description,
            price:responseData[key].price
          })
        }
        setMeals(loadedMeals)
        setIsLoading(false)
      }
        fetchMeals().catch((error)=>{
          setIsLoading(false)
          setHttpError(error.message)
        })
      
  },[])
  if(isLoading){
    return(
      <section className={style.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }
  if(httpError){
    <section className={style.MealsError}>
    <p>{httpError}</p>
  </section>
  }
const mealsList = meals.map((meal)=> <MealItem 
                    key={meal.id}  
                    id={meal.id}
                    name={meal.name} 
                    description={meal.description} 
                    price={meal.price}/>)
    return(
        <div className={style.meals}>
            <Card>
            <ul>
            {mealsList}
            </ul>
            </Card>
        </div>
    )
}
export default AvailableMeals





// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];