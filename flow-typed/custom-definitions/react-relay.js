// @flow

import type {
  Environment,
  RecordSourceSelectorProxy,
} from 'relay-runtime'

declare module 'react-relay' {
  /**
   * From react-relay/classic/environment/RelayCombinedEnvironmentTypes
   * @see {@link https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js}
   */
  declare export type CacheConfig = {
    force?: ?boolean,
    poll?: ?number,
    rerunParamExperimental?: ?RerunParam,
  };
  declare export type Disposable = {
    dispose(): void,
  };
  declare export type Props = {[key: string]: mixed};
  declare export type Record = {[key: string]: mixed};
  declare export type RecordMap = {[dataID: DataID]: ?Record};
  declare export type SelectorData = {[key: string]: mixed};

  /**
   * From react-relay/classic/tools/RelayInternalTypes
   * @see {@link https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/tools/RelayInternalTypes.js#L78}
   */
  declare export type DataID = string;

  declare export type Variables = {[name: string]: any};

  /**
   * Modified from Relay RefetchContainer doc.
   * @see {@link https://facebook.github.io/relay/docs/refetch-container.html}
   */
  declare export type RefetchOptions = {
    force?: boolean, // Refetch from the server ignoring anything in the cache.
  };
  declare export type RefetchContainerRelayProp = {
    /**
     * Execute the refetch query
     */
    refetch: (
      refetchVariables: Variables | (fragmentVariables: Variables) => Variables,
      renderVariables: ?Variables,
      callback: ?(error: ?Error) => void,
      options?: RefetchOptions,
    ) => Disposable,
  };

  /**
   * Modified from Relay PaginationContainer doc.
   * @see {@link https://facebook.github.io/relay/docs/pagination-container.html}
   */
  declare export type PaginationContainerRelayProp = {
    ...RefetchContainerRelayProp,

    /**
     * Check if there is at least one more page.
     */
    hasMore: () => boolean,

    /**
     * Check if there are pending requests.
     */
    isLoading: () => boolean,

    /**
     * Execute the pagination query. Relay will infer the pagination direction (either 'forward'
     * or 'backward') from the query parameters. `pageSize` is the additional number of items
     * to load.
     */
    loadMore: (
      pageSize: number,
      callback: ?(error: ?Error) => void,
      options: ?RefetchOptions
    ) => ?Disposable,

    /**
     * Refetch the items in the connection (with potentially new variables).
     */
    refetchConnection:(
      totalCount: number,
      callback: (error: ?Error) => void,
      refetchVariables: ?Variables,
    ) => ?Disposable,
  };

  /**
   * Modified from Relay Mutations doc.
   * @see {@link https://facebook.github.io/relay/docs/mutations.html}
   */
  declare export type CommitMutationConfig = {
    mutation: GraphQLTaggedNode,
    variables: Variables,
    onCompleted?: ?(response: ?Object, errors: ?[Error]) => void,
    onError?: ?(error: Error) => void,
    optimisticResponse?: Object,
    optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
    updater?: ?(store: RecordSourceSelectorProxy, data: mixed) => void,
    configs?: Array<RelayMutationConfig>,
  };
  declare export function commitMutation(
    environment: Environment,
    config: CommitMutationConfig
  ): any

  /**
   * Modified from Relay Subscriptions doc.
   * @see {@link https://facebook.github.io/relay/docs/subscriptions.html}
   */
  declare export type RequestSubscriptionConfig = {
    subscription: GraphQLTaggedNode,
    variables: Variables,
    onCompleted?: ?() => void,
    onError?: ?(error: Error) => void,
    onNext?: ?(response: ?Object) => void,
    updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
    configs?: Array<RelayMutationConfig>,
  };
  declare export function requestSubscription(
    environment: Environment,
    config: RequestSubscriptionConfig
  ): Disposable

  /* Ignored types */
  declare export type GraphQLTaggedNode = any;
  declare export function graphql(...args: any): any;
  declare export function createFragmentContainer(...args: any): any;
  declare export function createRefetchContainer(...args: any): any;
  declare export function createPaginationContainer(...args: any): any;
  declare export type RerunParam = any;
  declare export type RelayMutationConfig = any;
}
