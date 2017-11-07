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

  /**
   * Modified from Relay Mutations doc.
   * @see {@link https://facebook.github.io/relay/docs/mutations.html}
   */
  declare export type Variables = {[name: string]: any};
  declare export type MutationConfig = {
    mutation: GraphQLTaggedNode,
    variables: Variables,
    onCompleted?: ?(response: ?Object, errors: ?[Error]) => void,
    onError?: ?(error: Error) => void,
    optimisticResponse?: Object,
    optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
    updater?: ?(store: RecordSourceSelectorProxy, data: mixed) => void
  };
  declare export function commitMutation(
    environment: Environment,
    config: MutationConfig
  ): any

  /* Ignored types */
  declare export type GraphQLTaggedNode = any;
  declare export function graphql(...args: any): any;
  declare export type RerunParam = any;
  declare export function createFragmentContainer(...args: any): any;
}
