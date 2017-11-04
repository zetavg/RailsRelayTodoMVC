import { Network } from 'relay-runtime'
import { API_ENDPOINT } from './constants'

function fetchQuery(
  operation,
  variables,
  // cacheConfig,
  // uploadables,
) {
  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      operationName: operation.name,
      variables,
    }),
  }).then(response => response.json())
}

function subscriptionHandler(
  operation,
  variables,
  cacheConfig,
  observer,
) {
  const subscriptionID = Math.round(Date.now() + (Math.random() * 100000)).toString(16)

  const subscription = window.ActionCableApp.cable.subscriptions.create({
    channel: 'GraphQLChannel',
    subscriptionID,
  }, {
    connected: () => {
      // Once connected, send the GraphQL subscription query over the channel
      const params = {
        query: operation.text,
        operationName: operation.name,
        variables,
      }

      subscription.perform('execute', params)
    },
    received: (payload) => {
      // When we get a response, send the update to `observer`
      const { result } = payload

      if (result && result.errors) {
        observer.onError(result.errors)
      } else if (result.data) {
        observer.onNext({ data: result.data })
      }

      if (!payload.more) {
        // Subscription is finished
        observer.onCompleted()
      }
    },
  })

  // Return an object for Relay to unsubscribe with
  return {
    dispose: () => {
      subscription.unsubscribe()
    },
  }
}

const network = Network.create(fetchQuery, subscriptionHandler)

export default network
