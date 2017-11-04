/* @flow */

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import TodoApp from './todo_app/index'

document.addEventListener('DOMContentLoaded', () => {
  if (!document.body) return

  ReactDOM.render(
    <TodoApp />,
    document.body.appendChild(document.createElement('div')),
  )
})
