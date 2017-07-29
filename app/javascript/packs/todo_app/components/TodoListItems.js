import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from '../containers/TodoItem'

export default class TodoListItems extends Component {
  static propTypes = {
    relay: PropTypes.shape({
      hasMore: PropTypes.func.isRequired,
      isLoading: PropTypes.func.isRequired,
      loadMore: PropTypes.func.isRequired,
      refetchConnection: PropTypes.func.isRequired,
    }).isRequired,
    todoList: PropTypes.shape({
      todoItems: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              id: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
    }).isRequired,
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      refreshing: false,
    }
  }

  loadMore = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) return
    this.props.relay.loadMore(10)
  }

  refresh = () => {
    if (this.props.relay.isLoading()) return
    this.setState({ refreshing: true })
    this.props.relay.refetchConnection(10, () => {
      this.setState({ refreshing: false })
    })
  }

  render() {
    const { todoList } = this.props
    const { todoItems } = todoList

    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todoItems.edges.map(edge => <TodoItem key={edge.node.id} todoItem={edge.node} />)}
        </ul>
      </section>
    )
  }
}
