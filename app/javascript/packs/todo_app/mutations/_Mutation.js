/* @flow */

import { commitMutation } from 'react-relay'
import type { GraphQLTaggedNode, MutationConfig, Variables } from 'react-relay'
import type { RelayEnvironment } from 'relay-runtime'
import validate from 'validate.js'
import type { Constraints } from 'validate.js'

/**
 * Type defination of a typical input object.
 */
export type Input = {
  [string]: any
}

/**
 * A base abstract Mutation class to support input validation.
 */
export default class Mutation<T: Input> {
  /**
   * Default input
   */
  static defaultInput = {}

  /**
   * Constraints that is used for validate.js
   */
  static constraints = ({}: Constraints)

  /**
   * The GraphQL mutation query
   */
  static mutation = (undefined: any)

  /**
   * The input variable name in the GraphQL mutation query
   */
  static inputName = 'input'

  /**
   * Mutation configurations
   * @see {@link https://facebook.github.io/relay/docs/mutations.html|Relay Mutations}
   */
  getMutationConfig(): AdditionalMutationConfig {
    return ({}: AdditionalMutationConfig)
  }

  _input: T
  _environment: RelayEnvironment

  _validated: boolean
  _errors: ValidationErrors
  _asyncValidationPromise: Promise<ValidationErrors | void>

  /**
   * Constructor of a new Mutation
   *
   * @param {RelayEnvironment} environment - The Relay Environment.
   * @param {Input} input - An object that contains the input of mutation.
   */
  constructor(environment: RelayEnvironment, input?: T) {
    const { defaultInput } = this.constructor

    this._environment = environment
    this._input = {
      ...defaultInput,
      ...input,
    }
    this._validated = false
  }

  /**
   * Getter of the Relay Environment.
   *
   * $FlowFixMe
   */
  get environment(): RelayEnvironment {
    return this._environment
  }

  /**
   * Getter of the input object.
   *
   * $FlowFixMe
   */
  get input(): T {
    return this._input
  }

  /**
   * Getter of validation errors.
   *
   * $FlowFixMe
   */
  get errors(): ValidationErrors {
    this._validate()
    return this._errors
  }

  /**
   * Getter of valid status.
   *
   * $FlowFixMe
   */
  get isValid(): boolean {
    this._validate()
    return !this._errors
  }

  /**
   * Update input and get a new Mutation object
   * (since Mutation objects should be immutable).
   *
   * @param {Input} inputChanges - The changes to be updated to input.
   */
  updateInput = (inputChanges: T) => {
    const { environment, input } = this
    const newInput: T = {
      ...input,
      ...inputChanges,
    }
    const newMutation = new this.constructor(environment, newInput)

    return newMutation
  }

  /**
   * Getter of async validation errors.
   */
  getIsValidAsync = async (): boolean => {
    const errors = await this._validateAsync()
    // $FlowFixMe
    return !errors
  }

  /**
   * Getter of async valid status.
   */
  getErrorsAsync = async (): ValidationErrors => {
    const errors = await this._validateAsync()
    return errors
  }

  _validate = () => {
    if (this._validated) return
    this._errors = validate(this.input, this.constructor.constraints)
    this._validated = true
  }

  _validateAsync = () => {
    // Reuse the existing promise
    if (this._asyncValidationPromise) return this._asyncValidationPromise

    // Or create the promise of async validation
    // $FlowFixMe
    this._asyncValidationPromise = new Promise((resolve) => {
      validate.async(this.input, this.constructor.constraints).then(() => {
        resolve()
      }, (errors: ValidationErrors) => {
        resolve(errors)
      })
    })

    return this._asyncValidationPromise
  }

  /**
   * Commit the mutation.
   */
  commit = (): void => {
    if (!this.isValid) {
      const { errors } = this
      const fullMessage =
        Object.keys(errors).map(k => errors[k].join(', ')).join(', ')
      throw new MutationValidationError(fullMessage)
    }

    const { mutation, inputName } = this.constructor
    if (!mutation) throw new Error(`The mutation of ${this.constructor.name} is undefined`)
    const { environment, input } = this
    const mutationConfig = this.getMutationConfig()

    commitMutation(
      environment,
      {
        mutation,
        ...mutationConfig,
        variables: {
          [inputName]: input,
          ...mutationConfig.variables,
        },
      },
    )
  }
}

/**
 * Type defination of a validation errors object.
 */
export type ValidationErrors = { [key: string]: Array<string> }

/**
 * Mutation configurations without required props.
 */
/* eslint-disable no-undef */
export type AdditionalMutationConfig = $Diff<MutationConfig, {
  mutation: GraphQLTaggedNode,
  variables: Variables,
}> & { variables?: Variables }

class MutationValidationError extends Error {}
