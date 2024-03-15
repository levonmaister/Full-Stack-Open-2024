


const Filter = ({newFilter, setNewFilter}) => {
  
    const handleFilterChange = (event) => {
      console.log(event.target.Value)
      setNewFilter(event.target.value)
    
    }
    return(
    <div>Filter shown with <input 
    value = {newFilter}
    onChange={handleFilterChange}
  /></div>
    )
  }

  export default Filter