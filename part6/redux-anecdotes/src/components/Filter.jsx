import { filterChange } from '../reducers/filterReducer'
import { useSelector, useDispatch } from 'react-redux'

const Filter = (props) => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
      event.preventDefault()
      dispatch(filterChange(event.target.value))
    }



    
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter