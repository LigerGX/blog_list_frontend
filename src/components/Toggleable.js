import { useState, forwardRef, useImperativeHandle } from "react"

const Toggleable = forwardRef(({ children, name }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  if (!visible) {
    return (
      <div className="toggleable">
        <button onClick={toggleVisibility}>{name.show}</button>
      </div>
    )
  }

  return (
    <div className="toggleable">
      {children}
      <button onClick={toggleVisibility} >{name.hide}</button>
    </div>
  )
})

export default Toggleable