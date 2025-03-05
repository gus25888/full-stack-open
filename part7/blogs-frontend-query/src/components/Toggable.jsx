import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const Toggable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="success" endIcon={<AddIcon />} onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant="contained" color="inherit" endIcon={<CloseIcon />} onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'
export default Toggable
