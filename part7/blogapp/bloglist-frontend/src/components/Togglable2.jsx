import { useState, forwardRef, useImperativeHandle } from 'react'


const Togglable2 = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? '' : 'none' }
  const showWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={showWhenVisible} id='viewbutton'>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={hideWhenVisible} id='hidebutton' className='togglableContent'>
        <button onClick={toggleVisibility}>hide</button>
        {props.children}
      </div>
    </div>
  )

})

Togglable2.displayName = 'Togglable2'


export default Togglable2