import React from 'react'
import ReactDOM from 'react-dom'

import TodoApp from './todo_app/index'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TodoApp />,
    document.body.appendChild(document.createElement('div')),
  )
})
