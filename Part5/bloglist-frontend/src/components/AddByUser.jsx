import { useState } from 'react'


const AddByUser = (props) => {




  if(props.user.id==props.blog.user){

    return (

      <div>
        {props.children}
      </div>
    )
  }

  else{
    return(<div></div>)
  }

}

export default AddByUser