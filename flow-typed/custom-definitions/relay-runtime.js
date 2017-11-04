// @flow

import type {
  DataID,
  Variables,
  Record,
  Disposable,
} from 'react-relay'

declare module 'relay-runtime' {
  declare export type DataID = DataID;
  declare export type Variables = Variables;
  declare export type Disposable = Disposable;

  /**
   * From relay-runtime/store/RelayStoreTypes
   * @see {@link https://github.com/facebook/relay/blob/v1.4.0/packages/relay-runtime/store/RelayStoreTypes.js}
   */
  declare export interface RecordSource {
    get(dataID: DataID): ?Record,
    getRecordIDs(): Array<DataID>,
    getStatus(dataID: DataID): RecordState,
    has(dataID: DataID): boolean,
    load(
      dataID: DataID,
      callback: (error: ?Error, record: ?Record) => void,
    ): void,
    size(): number,
  }
  declare export interface MutableRecordSource extends RecordSource {
    clear(): void,
    delete(dataID: DataID): void,
    remove(dataID: DataID): void,
    set(dataID: DataID, record: Record): void,
  }
  declare export interface Store {
    getSource(): RecordSource,
    check(selector: Selector): boolean,
    lookup(selector: Selector): Snapshot,
    notify(): void,
    publish(source: RecordSource): void,
    retain(selector: Selector): Disposable,
    subscribe(
      snapshot: Snapshot,
      callback: (snapshot: Snapshot) => void,
    ): Disposable,
  }
  declare export interface RecordProxy {
    copyFieldsFrom(source: RecordProxy): void,
    getDataID(): DataID,
    getLinkedRecord(name: string, args?: ?Variables): ?RecordProxy,
    getLinkedRecords(name: string, args?: ?Variables): ?Array<?RecordProxy>,
    getOrCreateLinkedRecord(
      name: string,
      typeName: string,
      args?: ?Variables,
    ): RecordProxy,
    getType(): string,
    getValue(name: string, args?: ?Variables): mixed,
    setLinkedRecord(
      record: RecordProxy,
      name: string,
      args?: ?Variables,
    ): RecordProxy,
    setLinkedRecords(
      records: Array<?RecordProxy>,
      name: string,
      args?: ?Variables,
    ): RecordProxy,
    setValue(value: mixed, name: string, args?: ?Variables): RecordProxy,
  }
  declare export interface RecordSourceProxy {
    create(dataID: DataID, typeName: string): RecordProxy,
    delete(dataID: DataID): void,
    get(dataID: DataID): ?RecordProxy,
    getRoot(): RecordProxy,
  }
  declare export interface RecordSourceSelectorProxy {
    create(dataID: DataID, typeName: string): RecordProxy,
    delete(dataID: DataID): void,
    get(dataID: DataID): ?RecordProxy,
    getRoot(): RecordProxy,
    getRootField(fieldName: string): ?RecordProxy,
    getPluralRootField(fieldName: string): ?Array<?RecordProxy>,
  }
  declare export type HandleFieldPayload = {|
    args: Variables,
    dataID: DataID,
    fieldKey: string,
    handle: string,
    handleKey: string,
  |};

  /**
   * From relay-runtime/handlers/connection/RelayConnectionHandler
   * @see {@link https://github.com/facebook/relay/blob/v1.4.0/packages/relay-runtime/handlers/connection/RelayConnectionHandler.js}
   */
  declare export class ConnectionHandler {
    static buildConnectionEdge(
      store: RecordSourceProxy,
      connection: RecordProxy,
      edge: ?RecordProxy,
    ): ?RecordProxy;
    static createEdge(
      store: RecordSourceProxy,
      record: RecordProxy,
      node: RecordProxy,
      edgeType: string,
    ): RecordProxy;
    static deleteNode(record: RecordProxy, nodeID: DataID): void;
    static getConnection(
      record: RecordProxy,
      key: string,
      filters?: ?Variables,
    ): ?RecordProxy;
    static insertEdgeAfter(
      record: RecordProxy,
      newEdge: RecordProxy,
      cursor?: ?string,
    ): void;
    static insertEdgeBefore(
      record: RecordProxy,
      newEdge: RecordProxy,
      cursor?: ?string,
    ): void;
    static update(store: RecordSourceProxy, payload: HandleFieldPayload): void;
  }

  /* Aliases with 'Relay' prefix */
  declare export type RelayEnvironment = Environment;
  declare export type RelayRecordSourceSelectorProxy = RecordSourceSelectorProxy;
  declare export type RelayRecordProxy = RecordProxy;

  /* Ignored types */
  declare export type Environment = any;
  declare export type RecordState = any;
  declare export type Selector = any;
  declare export type Snapshot = any;



  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/tools/RelayTypes.js#L258
  // declare export type Variables = { [name: string]: $FlowFixMe };

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/relay-runtime/store/RelayStoreTypes.js#L330
  // declare export type StoreUpdater = (store: RecordSourceProxy) => void;

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/relay-runtime/store/RelayStoreTypes.js#L337
  // declare export type SelectorStoreUpdater = (
  //   store: RecordSourceSelectorProxy,
  //   data: $FlowFixMe,
  // ) => void;

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/relay-runtime/store/RelayStoreTypes.js#L50
  // declare export type OperationSelector = COperationSelector<TNode, TOperation>;

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js#L136
  // declare type COperationSelector<TNode, TOperation> = {
  //   fragment: CSelector<TNode>,
  //   node: TOperation,
  //   root: CSelector<TNode>,
  //   variables: Variables,
  // };

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js#L136
  // declare type CSelector<TNode> = {
  //   dataID: DataID,
  //   node: TNode,
  //   variables: Variables,
  // };

  // declare type ConcreteSelectableNode = any;

  // declare type TNode = any;

  // declare type TOperation = any

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/relay-runtime/store/RelayStoreTypes.js#L348
  // declare export type OptimisticUpdate =
  //   | {|
  //       storeUpdater: StoreUpdater,
  //     |}
  //   | {|
  //       selectorStoreUpdater: ?SelectorStoreUpdater,
  //       operation: OperationSelector,
  //       response: ?Object,
  //     |};

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js#L82
  // declare export type SelectorData = {[key: string]: mixed};

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js#L54
  // declare export type Record = {[key: string]: mixed};

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js#L59
  // declare export type RecordMap = {[dataID: DataID]: ?Record};

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js#L74
  // declare export type CSnapshot<TNode> = CSelector<TNode> & {
  //   data: ?SelectorData,
  //   seenRecords: RecordMap,
  // };

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js#L42
  // declare export type Disposable = {
  //   dispose(): void,
  // };

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/tools/RelayTypes.js#L259
  // declare export type RerunParam = {
  //   param: string,
  //   import: string,
  //   max_runs: number,
  // };

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js#L31
  // declare export type CacheConfig = {
  //   force?: ?boolean,
  //   poll?: ?number,
  //   rerunParamExperimental?: ?RerunParam,
  // };

  // declare type RelayObservable = any;
  // declare type CUnstableEnvironmentCore = any;

  // declare type TEnvironment = any;
  // declare type TFragment = any;
  // declare type TGraphQLTaggedNode = any;
  // declare type TPayload = any;
  // declare type Selector = any;
  // declare type PayloadData = any;
  // declare type Store = any;
  // declare type UploadableMap = any;
  // declare type RelayResponsePayload = any;
  // declare type MissingFieldHandler = any;

  // declare export type GraphQLTag = any;

  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/react-relay/classic/environment/RelayCombinedEnvironmentTypes.js#L147
  // declare interface CEnvironment<
  //   TEnvironment,
  //   TFragment,
  //   TGraphQLTaggedNode,
  //   TNode,
  //   TOperation,
  //   TPayload,
  // > {
  //   /**
  //    * Read the results of a selector from in-memory records in the store.
  //    */
  //   lookup(selector: CSelector<TNode>): CSnapshot<TNode>,

  //   /**
  //    * Subscribe to changes to the results of a selector. The callback is called
  //    * when data has been committed to the store that would cause the results of
  //    * the snapshot's selector to change.
  //    */
  //   subscribe(
  //     snapshot: CSnapshot<TNode>,
  //     callback: (snapshot: CSnapshot<TNode>) => void,
  //   ): Disposable,

  //   /**
  //    * Ensure that all the records necessary to fulfill the given selector are
  //    * retained in-memory. The records will not be eligible for garbage collection
  //    * until the returned reference is disposed.
  //    *
  //    * Note: This is a no-op in the classic core.
  //    */
  //   retain(selector: CSelector<TNode>): Disposable,

  //   /**
  //    * Send a query to the server with Observer semantics: one or more
  //    * responses may be returned (via `next`) over time followed by either
  //    * the request completing (`completed`) or an error (`error`).
  //    *
  //    * Networks/servers that support subscriptions may choose to hold the
  //    * subscription open indefinitely such that `complete` is not called.
  //    *
  //    * Note: Observables are lazy, so calling this method will do nothing until
  //    * the result is subscribed to: environment.execute({...}).subscribe({...}).
  //    */
  //   execute(config: {|
  //     operation: COperationSelector<TNode, TOperation>,
  //     cacheConfig?: ?CacheConfig,
  //     updater?: ?SelectorStoreUpdater,
  //   |}): RelayObservable<TPayload>,

  //   unstable_internal: CUnstableEnvironmentCore<
  //     TEnvironment,
  //     TFragment,
  //     TGraphQLTaggedNode,
  //     TNode,
  //     TOperation,
  //   >,
  // }


  // // From https://github.com/facebook/relay/blob/v1.4.0/packages/relay-runtime/store/RelayStoreTypes.js#L200
  // declare export interface Environment
  //   extends CEnvironment<
  //     TEnvironment,
  //     TFragment,
  //     TGraphQLTaggedNode,
  //     TNode,
  //     TOperation,
  //     TPayload,
  //   > {
  //   /**
  //    * Apply an optimistic update to the environment. The mutation can be reverted
  //    * by calling `dispose()` on the returned value.
  //    */
  //   applyUpdate(optimisticUpdate: OptimisticUpdate): Disposable,

  //   /**
  //    * Determine if the selector can be resolved with data in the store (i.e. no
  //    * fields are missing).
  //    *
  //    * Note that this operation effectively "executes" the selector against the
  //    * cache and therefore takes time proportional to the size/complexity of the
  //    * selector.
  //    */
  //   check(selector: Selector): boolean,

  //   /**
  //    * Commit an updater to the environment. This mutation cannot be reverted and
  //    * should therefore not be used for optimistic updates. This is mainly
  //    * intended for updating fields from client schema extensions.
  //    */
  //   commitUpdate(updater: StoreUpdater): void,

  //   /**
  //    * Commit a payload to the environment using the given operation selector.
  //    */
  //   commitPayload(
  //     operationSelector: OperationSelector,
  //     payload: PayloadData,
  //   ): void,

  //   /**
  //    * Get the environment's internal Store.
  //    */
  //   getStore(): Store,

  //   /**
  //    * Returns an Observable of RelayResponsePayload resulting from executing the
  //    * provided Mutation operation, the result of which is then normalized and
  //    * committed to the publish queue along with an optional optimistic response
  //    * or updater.
  //    *
  //    * Note: Observables are lazy, so calling this method will do nothing until
  //    * the result is subscribed to:
  //    * environment.executeMutation({...}).subscribe({...}).
  //    */
  //   executeMutation({|
  //     operation: OperationSelector,
  //     optimisticUpdater?: ?SelectorStoreUpdater,
  //     optimisticResponse?: ?Object,
  //     updater?: ?SelectorStoreUpdater,
  //     uploadables?: ?UploadableMap,
  //   |}): RelayObservable<RelayResponsePayload>,

  //   /**
  //    * Checks if the records required to fulfill the given `selector` are in
  //    * the. Missing fields use the provided `handlers` to attempt to provide
  //    * substitutes. After traversal, the changes suggested by the `handlers` are
  //    * published back to the store.
  //    *
  //    * returns `true` if all records exist and all fields are fetched, false otherwise.
  //    */
  //   checkSelectorAndUpdateStore(
  //     selector: Selector,
  //     handlers: Array<MissingFieldHandler>,
  //   ): boolean,
  // }










}
