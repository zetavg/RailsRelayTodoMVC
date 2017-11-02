export default class Subscription {
  constructor(environment, { variables }) {
    this.environment = environment
    this.variables = variables || {}
  }

  subscribe = () => {
  }

  unsubscribe = () => {
    if (this.disposable) this.disposable.dispose()
  }
}
