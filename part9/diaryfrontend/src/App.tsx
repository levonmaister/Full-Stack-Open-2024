import {  useState, useEffect, SetStateAction } from 'react'
import axios from 'axios';
import { DiaryEntry,NewDiary} from './types'

import { getAllDiaries,createDiary } from './diaryService';

const ErrorNotification = ({error}: {error: string}) => {
  if(error){
    return(<div>
      {error}
    </div>)
  }
}

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newWeather,setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newComment, setNewComment] = useState('')
  const [error,setError] = useState('')

useEffect(() => {
    getAllDiaries().then((data: SetStateAction<DiaryEntry[]>) => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()


    const MynewDiary: NewDiary = {
      visibility: newVisibility,
      date: newDate,
      weather: newWeather,
      comment: newComment
    }
    
    
 try{
    const response = await createDiary(MynewDiary)
    console.log(response)
    setDiaries(diaries.concat(response))
    setNewComment('')
    setNewWeather('')
    setNewVisibility('')
    setNewDate('')

  }
  catch(error){if (axios.isAxiosError(error)) {
    if(error.response){if(error.response.data){ 
      console.log(error.response.data)
      setError(error.response.data)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }


    // Do something with this error...
  } }
      
  
   
  }; 


  return (
    <div>

    <div>

      <ErrorNotification error={error}/>

      <form id='myForm' onSubmit={diaryCreation}>

    
      <input value={newDate} type="date"  name="date" required  onChange={(event) => setNewDate(event.target.value)} />

<div>visibility: 
     great <input type="radio"  name="visibility" required onChange={()=>setNewVisibility('great')} />
     good <input type="radio"  name="visibility" required onChange={()=>setNewVisibility('good')} />
     ok <input type="radio"  name="visibility" required onChange={()=>setNewVisibility('ok')} />
     poor <input type="radio"  name="visibility" required onChange={()=>setNewVisibility('poor')} />   
</div>    
    <div>weather:
rainy <input type="radio"  name="weather" required onChange={()=>setNewWeather('rainy')} />
    sunny <input type="radio"  name="weather" required onChange={()=>setNewWeather('sunny')} />
    cloudy <input type="radio"  name="weather" required onChange={()=>setNewWeather('cloudy')} />
    stormy <input type="radio"  name="weather" required onChange={()=>setNewWeather('stormy')} />   
    windy <input type="radio"   name="weather" required onChange={()=>setNewWeather('windy')} />
       
    </div>
        comment: <input value={newComment} type='text' required onChange={(event)=>setNewComment(event.target.value)} />
        <button type='submit'>add</button>
      </form>
    </div>


        {diaries.map(diary =>
        <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>Weather: {diary.weather}</p>
            <p>Visbility: {diary.visibility}</p>
            </div>
        )}
    </div>
  )
}

export default App
