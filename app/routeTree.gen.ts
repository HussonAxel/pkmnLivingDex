/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RedirectImport } from './routes/redirect'
import { Route as DeferredImport } from './routes/deferred'
import { Route as PathlessLayoutImport } from './routes/_pathlessLayout'
import { Route as UsersRouteImport } from './routes/users.route'
import { Route as PokemonsRouteImport } from './routes/pokemons.route'
import { Route as IndexImport } from './routes/index'
import { Route as UsersIndexImport } from './routes/users.index'
import { Route as PokemonsIndexImport } from './routes/pokemons.index'
import { Route as UsersUserIdImport } from './routes/users.$userId'
import { Route as PokemonsGenerationIDImport } from './routes/pokemons.$generationID'
import { Route as PathlessLayoutNestedLayoutImport } from './routes/_pathlessLayout/_nested-layout'
import { Route as PokemonsPokemonNameDeepImport } from './routes/pokemons_.$pokemonName.deep'
import { Route as PathlessLayoutNestedLayoutRouteBImport } from './routes/_pathlessLayout/_nested-layout/route-b'
import { Route as PathlessLayoutNestedLayoutRouteAImport } from './routes/_pathlessLayout/_nested-layout/route-a'

// Create/Update Routes

const RedirectRoute = RedirectImport.update({
  id: '/redirect',
  path: '/redirect',
  getParentRoute: () => rootRoute,
} as any)

const DeferredRoute = DeferredImport.update({
  id: '/deferred',
  path: '/deferred',
  getParentRoute: () => rootRoute,
} as any)

const PathlessLayoutRoute = PathlessLayoutImport.update({
  id: '/_pathlessLayout',
  getParentRoute: () => rootRoute,
} as any)

const UsersRouteRoute = UsersRouteImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => rootRoute,
} as any)

const PokemonsRouteRoute = PokemonsRouteImport.update({
  id: '/pokemons',
  path: '/pokemons',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIndexRoute = UsersIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => UsersRouteRoute,
} as any)

const PokemonsIndexRoute = PokemonsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PokemonsRouteRoute,
} as any)

const UsersUserIdRoute = UsersUserIdImport.update({
  id: '/$userId',
  path: '/$userId',
  getParentRoute: () => UsersRouteRoute,
} as any)

const PokemonsGenerationIDRoute = PokemonsGenerationIDImport.update({
  id: '/$generationID',
  path: '/$generationID',
  getParentRoute: () => PokemonsRouteRoute,
} as any)

const PathlessLayoutNestedLayoutRoute = PathlessLayoutNestedLayoutImport.update(
  {
    id: '/_nested-layout',
    getParentRoute: () => PathlessLayoutRoute,
  } as any,
)

const PokemonsPokemonNameDeepRoute = PokemonsPokemonNameDeepImport.update({
  id: '/pokemons_/$pokemonName/deep',
  path: '/pokemons/$pokemonName/deep',
  getParentRoute: () => rootRoute,
} as any)

const PathlessLayoutNestedLayoutRouteBRoute =
  PathlessLayoutNestedLayoutRouteBImport.update({
    id: '/route-b',
    path: '/route-b',
    getParentRoute: () => PathlessLayoutNestedLayoutRoute,
  } as any)

const PathlessLayoutNestedLayoutRouteARoute =
  PathlessLayoutNestedLayoutRouteAImport.update({
    id: '/route-a',
    path: '/route-a',
    getParentRoute: () => PathlessLayoutNestedLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/pokemons': {
      id: '/pokemons'
      path: '/pokemons'
      fullPath: '/pokemons'
      preLoaderRoute: typeof PokemonsRouteImport
      parentRoute: typeof rootRoute
    }
    '/users': {
      id: '/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersRouteImport
      parentRoute: typeof rootRoute
    }
    '/_pathlessLayout': {
      id: '/_pathlessLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PathlessLayoutImport
      parentRoute: typeof rootRoute
    }
    '/deferred': {
      id: '/deferred'
      path: '/deferred'
      fullPath: '/deferred'
      preLoaderRoute: typeof DeferredImport
      parentRoute: typeof rootRoute
    }
    '/redirect': {
      id: '/redirect'
      path: '/redirect'
      fullPath: '/redirect'
      preLoaderRoute: typeof RedirectImport
      parentRoute: typeof rootRoute
    }
    '/_pathlessLayout/_nested-layout': {
      id: '/_pathlessLayout/_nested-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PathlessLayoutNestedLayoutImport
      parentRoute: typeof PathlessLayoutImport
    }
    '/pokemons/$generationID': {
      id: '/pokemons/$generationID'
      path: '/$generationID'
      fullPath: '/pokemons/$generationID'
      preLoaderRoute: typeof PokemonsGenerationIDImport
      parentRoute: typeof PokemonsRouteImport
    }
    '/users/$userId': {
      id: '/users/$userId'
      path: '/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof UsersUserIdImport
      parentRoute: typeof UsersRouteImport
    }
    '/pokemons/': {
      id: '/pokemons/'
      path: '/'
      fullPath: '/pokemons/'
      preLoaderRoute: typeof PokemonsIndexImport
      parentRoute: typeof PokemonsRouteImport
    }
    '/users/': {
      id: '/users/'
      path: '/'
      fullPath: '/users/'
      preLoaderRoute: typeof UsersIndexImport
      parentRoute: typeof UsersRouteImport
    }
    '/_pathlessLayout/_nested-layout/route-a': {
      id: '/_pathlessLayout/_nested-layout/route-a'
      path: '/route-a'
      fullPath: '/route-a'
      preLoaderRoute: typeof PathlessLayoutNestedLayoutRouteAImport
      parentRoute: typeof PathlessLayoutNestedLayoutImport
    }
    '/_pathlessLayout/_nested-layout/route-b': {
      id: '/_pathlessLayout/_nested-layout/route-b'
      path: '/route-b'
      fullPath: '/route-b'
      preLoaderRoute: typeof PathlessLayoutNestedLayoutRouteBImport
      parentRoute: typeof PathlessLayoutNestedLayoutImport
    }
    '/pokemons_/$pokemonName/deep': {
      id: '/pokemons_/$pokemonName/deep'
      path: '/pokemons/$pokemonName/deep'
      fullPath: '/pokemons/$pokemonName/deep'
      preLoaderRoute: typeof PokemonsPokemonNameDeepImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface PokemonsRouteRouteChildren {
  PokemonsGenerationIDRoute: typeof PokemonsGenerationIDRoute
  PokemonsIndexRoute: typeof PokemonsIndexRoute
}

const PokemonsRouteRouteChildren: PokemonsRouteRouteChildren = {
  PokemonsGenerationIDRoute: PokemonsGenerationIDRoute,
  PokemonsIndexRoute: PokemonsIndexRoute,
}

const PokemonsRouteRouteWithChildren = PokemonsRouteRoute._addFileChildren(
  PokemonsRouteRouteChildren,
)

interface UsersRouteRouteChildren {
  UsersUserIdRoute: typeof UsersUserIdRoute
  UsersIndexRoute: typeof UsersIndexRoute
}

const UsersRouteRouteChildren: UsersRouteRouteChildren = {
  UsersUserIdRoute: UsersUserIdRoute,
  UsersIndexRoute: UsersIndexRoute,
}

const UsersRouteRouteWithChildren = UsersRouteRoute._addFileChildren(
  UsersRouteRouteChildren,
)

interface PathlessLayoutNestedLayoutRouteChildren {
  PathlessLayoutNestedLayoutRouteARoute: typeof PathlessLayoutNestedLayoutRouteARoute
  PathlessLayoutNestedLayoutRouteBRoute: typeof PathlessLayoutNestedLayoutRouteBRoute
}

const PathlessLayoutNestedLayoutRouteChildren: PathlessLayoutNestedLayoutRouteChildren =
  {
    PathlessLayoutNestedLayoutRouteARoute:
      PathlessLayoutNestedLayoutRouteARoute,
    PathlessLayoutNestedLayoutRouteBRoute:
      PathlessLayoutNestedLayoutRouteBRoute,
  }

const PathlessLayoutNestedLayoutRouteWithChildren =
  PathlessLayoutNestedLayoutRoute._addFileChildren(
    PathlessLayoutNestedLayoutRouteChildren,
  )

interface PathlessLayoutRouteChildren {
  PathlessLayoutNestedLayoutRoute: typeof PathlessLayoutNestedLayoutRouteWithChildren
}

const PathlessLayoutRouteChildren: PathlessLayoutRouteChildren = {
  PathlessLayoutNestedLayoutRoute: PathlessLayoutNestedLayoutRouteWithChildren,
}

const PathlessLayoutRouteWithChildren = PathlessLayoutRoute._addFileChildren(
  PathlessLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/pokemons': typeof PokemonsRouteRouteWithChildren
  '/users': typeof UsersRouteRouteWithChildren
  '': typeof PathlessLayoutNestedLayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/pokemons/$generationID': typeof PokemonsGenerationIDRoute
  '/users/$userId': typeof UsersUserIdRoute
  '/pokemons/': typeof PokemonsIndexRoute
  '/users/': typeof UsersIndexRoute
  '/route-a': typeof PathlessLayoutNestedLayoutRouteARoute
  '/route-b': typeof PathlessLayoutNestedLayoutRouteBRoute
  '/pokemons/$pokemonName/deep': typeof PokemonsPokemonNameDeepRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof PathlessLayoutNestedLayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/pokemons/$generationID': typeof PokemonsGenerationIDRoute
  '/users/$userId': typeof UsersUserIdRoute
  '/pokemons': typeof PokemonsIndexRoute
  '/users': typeof UsersIndexRoute
  '/route-a': typeof PathlessLayoutNestedLayoutRouteARoute
  '/route-b': typeof PathlessLayoutNestedLayoutRouteBRoute
  '/pokemons/$pokemonName/deep': typeof PokemonsPokemonNameDeepRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/pokemons': typeof PokemonsRouteRouteWithChildren
  '/users': typeof UsersRouteRouteWithChildren
  '/_pathlessLayout': typeof PathlessLayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/_pathlessLayout/_nested-layout': typeof PathlessLayoutNestedLayoutRouteWithChildren
  '/pokemons/$generationID': typeof PokemonsGenerationIDRoute
  '/users/$userId': typeof UsersUserIdRoute
  '/pokemons/': typeof PokemonsIndexRoute
  '/users/': typeof UsersIndexRoute
  '/_pathlessLayout/_nested-layout/route-a': typeof PathlessLayoutNestedLayoutRouteARoute
  '/_pathlessLayout/_nested-layout/route-b': typeof PathlessLayoutNestedLayoutRouteBRoute
  '/pokemons_/$pokemonName/deep': typeof PokemonsPokemonNameDeepRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/pokemons'
    | '/users'
    | ''
    | '/deferred'
    | '/redirect'
    | '/pokemons/$generationID'
    | '/users/$userId'
    | '/pokemons/'
    | '/users/'
    | '/route-a'
    | '/route-b'
    | '/pokemons/$pokemonName/deep'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/deferred'
    | '/redirect'
    | '/pokemons/$generationID'
    | '/users/$userId'
    | '/pokemons'
    | '/users'
    | '/route-a'
    | '/route-b'
    | '/pokemons/$pokemonName/deep'
  id:
    | '__root__'
    | '/'
    | '/pokemons'
    | '/users'
    | '/_pathlessLayout'
    | '/deferred'
    | '/redirect'
    | '/_pathlessLayout/_nested-layout'
    | '/pokemons/$generationID'
    | '/users/$userId'
    | '/pokemons/'
    | '/users/'
    | '/_pathlessLayout/_nested-layout/route-a'
    | '/_pathlessLayout/_nested-layout/route-b'
    | '/pokemons_/$pokemonName/deep'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PokemonsRouteRoute: typeof PokemonsRouteRouteWithChildren
  UsersRouteRoute: typeof UsersRouteRouteWithChildren
  PathlessLayoutRoute: typeof PathlessLayoutRouteWithChildren
  DeferredRoute: typeof DeferredRoute
  RedirectRoute: typeof RedirectRoute
  PokemonsPokemonNameDeepRoute: typeof PokemonsPokemonNameDeepRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PokemonsRouteRoute: PokemonsRouteRouteWithChildren,
  UsersRouteRoute: UsersRouteRouteWithChildren,
  PathlessLayoutRoute: PathlessLayoutRouteWithChildren,
  DeferredRoute: DeferredRoute,
  RedirectRoute: RedirectRoute,
  PokemonsPokemonNameDeepRoute: PokemonsPokemonNameDeepRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/pokemons",
        "/users",
        "/_pathlessLayout",
        "/deferred",
        "/redirect",
        "/pokemons_/$pokemonName/deep"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/pokemons": {
      "filePath": "pokemons.route.tsx",
      "children": [
        "/pokemons/$generationID",
        "/pokemons/"
      ]
    },
    "/users": {
      "filePath": "users.route.tsx",
      "children": [
        "/users/$userId",
        "/users/"
      ]
    },
    "/_pathlessLayout": {
      "filePath": "_pathlessLayout.tsx",
      "children": [
        "/_pathlessLayout/_nested-layout"
      ]
    },
    "/deferred": {
      "filePath": "deferred.tsx"
    },
    "/redirect": {
      "filePath": "redirect.tsx"
    },
    "/_pathlessLayout/_nested-layout": {
      "filePath": "_pathlessLayout/_nested-layout.tsx",
      "parent": "/_pathlessLayout",
      "children": [
        "/_pathlessLayout/_nested-layout/route-a",
        "/_pathlessLayout/_nested-layout/route-b"
      ]
    },
    "/pokemons/$generationID": {
      "filePath": "pokemons.$generationID.tsx",
      "parent": "/pokemons"
    },
    "/users/$userId": {
      "filePath": "users.$userId.tsx",
      "parent": "/users"
    },
    "/pokemons/": {
      "filePath": "pokemons.index.tsx",
      "parent": "/pokemons"
    },
    "/users/": {
      "filePath": "users.index.tsx",
      "parent": "/users"
    },
    "/_pathlessLayout/_nested-layout/route-a": {
      "filePath": "_pathlessLayout/_nested-layout/route-a.tsx",
      "parent": "/_pathlessLayout/_nested-layout"
    },
    "/_pathlessLayout/_nested-layout/route-b": {
      "filePath": "_pathlessLayout/_nested-layout/route-b.tsx",
      "parent": "/_pathlessLayout/_nested-layout"
    },
    "/pokemons_/$pokemonName/deep": {
      "filePath": "pokemons_.$pokemonName.deep.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
