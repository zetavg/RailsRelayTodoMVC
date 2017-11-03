# Rails + Relay TodoMVC

This project demonstrates to expose an Relay-compatible GraphQL API with [graphql-ruby](https://github.com/rmosolgo/graphql-ruby) from an existing Rails app, and to build a React app with Relay which uses the GraphQL API.


## Setup

```sh
bin/setup
```


## Running

In development, you'll need to run `bin/rails server` with `bin/webpack-dev-server` to have the `app/javascript/packs/*.js` files be compiled as you make changes, and `bin/relay-compiler` if you change the GraphQL schema or any `graphql` tags in any JavaScript files.

If you'd rather not have to run the two processes separately by hand, you can use [Foreman](https://ddollar.github.io/foreman/):

```sh
gem install foreman
```

```sh
foreman start
```

The default port of the Rails Server is `5000`.


## TODOs

- [ ] Refactor code
- [x] Use cached data while switching the todo items filter ([facebook/relay#2006](https://github.com/facebook/relay/issues/2006) explains this behavior, needs to dig on more about GC of Relay Modern Store)
- [ ] Fix all optimistic updates
- [ ] Use Relay Subscriptions with Action Cable to do realtime update
- [ ] Resolve Rails n+1 query problem while executing an GraphQL query
- [ ] Let the user manage multiple todo lists
- [ ] Implement user authentication
- [ ] Build a React Native app with the same JavaScript codebase
