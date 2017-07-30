export default class Mutation {
  constructor(environment, { input }) {
    this.environment = environment
    this.input = input || {}
  }

  updateInput = (input) => {
    this.input = {
      ...this.input,
      ...input,
    }

    return this
  }

  commit = () => {
  }
}
