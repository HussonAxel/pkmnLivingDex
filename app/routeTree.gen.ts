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
import { Route as PokedexRouteImport } from './routes/pokedex.route'
import { Route as IndexImport } from './routes/index'
import { Route as UsersIndexImport } from './routes/users.index'
import { Route as PokedexIndexImport } from './routes/pokedex.index'
import { Route as UsersUserIdImport } from './routes/users.$userId'
import { Route as PokemonsPokemonNameImport } from './routes/pokemons.$pokemonName'
import { Route as PokedexGenerationIDImport } from './routes/pokedex.$generationID'
import { Route as PathlessLayoutNestedLayoutImport } from './routes/_pathlessLayout/_nested-layout'
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

const PokedexRouteRoute = PokedexRouteImport.update({
  id: '/pokedex',
  path: '/pokedex',
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

const PokedexIndexRoute = PokedexIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PokedexRouteRoute,
} as any)

const UsersUserIdRoute = UsersUserIdImport.update({
  id: '/$userId',
  path: '/$userId',
  getParentRoute: () => UsersRouteRoute,
} as any)

const PokemonsPokemonNameRoute = PokemonsPokemonNameImport.update({
  id: '/pokemons/$pokemonName',
  path: '/pokemons/$pokemonName',
  getParentRoute: () => rootRoute,
} as any)

const PokedexGenerationIDRoute = PokedexGenerationIDImport.update({
  id: '/$generationID',
  path: '/$generationID',
  getParentRoute: () => PokedexRouteRoute,
} as any)

const PathlessLayoutNestedLayoutRoute = PathlessLayoutNestedLayoutImport.update(
  {
    id: '/_nested-layout',
    getParentRoute: () => PathlessLayoutRoute,
  } as any,
)

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
    '/pokedex': {
      id: '/pokedex'
      path: '/pokedex'
      fullPath: '/pokedex'
      preLoaderRoute: typeof PokedexRouteImport
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
    '/pokedex/$generationID': {
      id: '/pokedex/$generationID'
      path: '/$generationID'
      fullPath: '/pokedex/$generationID'
      preLoaderRoute: typeof PokedexGenerationIDImport
      parentRoute: typeof PokedexRouteImport
    }
    '/pokemons/$pokemonName': {
      id: '/pokemons/$pokemonName'
      path: '/pokemons/$pokemonName'
      fullPath: '/pokemons/$pokemonName'
      preLoaderRoute: typeof PokemonsPokemonNameImport
      parentRoute: typeof rootRoute
    }
    '/users/$userId': {
      id: '/users/$userId'
      path: '/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof UsersUserIdImport
      parentRoute: typeof UsersRouteImport
    }
    '/pokedex/': {
      id: '/pokedex/'
      path: '/'
      fullPath: '/pokedex/'
      preLoaderRoute: typeof PokedexIndexImport
      parentRoute: typeof PokedexRouteImport
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
  }
}

// Create and export the route tree

interface PokedexRouteRouteChildren {
  PokedexGenerationIDRoute: typeof PokedexGenerationIDRoute
  PokedexIndexRoute: typeof PokedexIndexRoute
}

const PokedexRouteRouteChildren: PokedexRouteRouteChildren = {
  PokedexGenerationIDRoute: PokedexGenerationIDRoute,
  PokedexIndexRoute: PokedexIndexRoute,
}

const PokedexRouteRouteWithChildren = PokedexRouteRoute._addFileChildren(
  PokedexRouteRouteChildren,
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
  '/pokedex': typeof PokedexRouteRouteWithChildren
  '/users': typeof UsersRouteRouteWithChildren
  '': typeof PathlessLayoutNestedLayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/pokedex/$generationID': typeof PokedexGenerationIDRoute
  '/pokemons/$pokemonName': typeof PokemonsPokemonNameRoute
  '/users/$userId': typeof UsersUserIdRoute
  '/pokedex/': typeof PokedexIndexRoute
  '/users/': typeof UsersIndexRoute
  '/route-a': typeof PathlessLayoutNestedLayoutRouteARoute
  '/route-b': typeof PathlessLayoutNestedLayoutRouteBRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof PathlessLayoutNestedLayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/pokedex/$generationID': typeof PokedexGenerationIDRoute
  '/pokemons/$pokemonName': typeof PokemonsPokemonNameRoute
  '/users/$userId': typeof UsersUserIdRoute
  '/pokedex': typeof PokedexIndexRoute
  '/users': typeof UsersIndexRoute
  '/route-a': typeof PathlessLayoutNestedLayoutRouteARoute
  '/route-b': typeof PathlessLayoutNestedLayoutRouteBRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/pokedex': typeof PokedexRouteRouteWithChildren
  '/users': typeof UsersRouteRouteWithChildren
  '/_pathlessLayout': typeof PathlessLayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/_pathlessLayout/_nested-layout': typeof PathlessLayoutNestedLayoutRouteWithChildren
  '/pokedex/$generationID': typeof PokedexGenerationIDRoute
  '/pokemons/$pokemonName': typeof PokemonsPokemonNameRoute
  '/users/$userId': typeof UsersUserIdRoute
  '/pokedex/': typeof PokedexIndexRoute
  '/users/': typeof UsersIndexRoute
  '/_pathlessLayout/_nested-layout/route-a': typeof PathlessLayoutNestedLayoutRouteARoute
  '/_pathlessLayout/_nested-layout/route-b': typeof PathlessLayoutNestedLayoutRouteBRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/pokedex'
    | '/users'
    | ''
    | '/deferred'
    | '/redirect'
    | '/pokedex/$generationID'
    | '/pokemons/$pokemonName'
    | '/users/$userId'
    | '/pokedex/'
    | '/users/'
    | '/route-a'
    | '/route-b'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/deferred'
    | '/redirect'
    | '/pokedex/$generationID'
    | '/pokemons/$pokemonName'
    | '/users/$userId'
    | '/pokedex'
    | '/users'
    | '/route-a'
    | '/route-b'
  id:
    | '__root__'
    | '/'
    | '/pokedex'
    | '/users'
    | '/_pathlessLayout'
    | '/deferred'
    | '/redirect'
    | '/_pathlessLayout/_nested-layout'
    | '/pokedex/$generationID'
    | '/pokemons/$pokemonName'
    | '/users/$userId'
    | '/pokedex/'
    | '/users/'
    | '/_pathlessLayout/_nested-layout/route-a'
    | '/_pathlessLayout/_nested-layout/route-b'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PokedexRouteRoute: typeof PokedexRouteRouteWithChildren
  UsersRouteRoute: typeof UsersRouteRouteWithChildren
  PathlessLayoutRoute: typeof PathlessLayoutRouteWithChildren
  DeferredRoute: typeof DeferredRoute
  RedirectRoute: typeof RedirectRoute
  PokemonsPokemonNameRoute: typeof PokemonsPokemonNameRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PokedexRouteRoute: PokedexRouteRouteWithChildren,
  UsersRouteRoute: UsersRouteRouteWithChildren,
  PathlessLayoutRoute: PathlessLayoutRouteWithChildren,
  DeferredRoute: DeferredRoute,
  RedirectRoute: RedirectRoute,
  PokemonsPokemonNameRoute: PokemonsPokemonNameRoute,
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
        "/pokedex",
        "/users",
        "/_pathlessLayout",
        "/deferred",
        "/redirect",
        "/pokemons/$pokemonName"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/pokedex": {
      "filePath": "pokedex.route.tsx",
      "children": [
        "/pokedex/$generationID",
        "/pokedex/"
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
    "/pokedex/$generationID": {
      "filePath": "pokedex.$generationID.tsx",
      "parent": "/pokedex"
    },
    "/pokemons/$pokemonName": {
      "filePath": "pokemons.$pokemonName.tsx"
    },
    "/users/$userId": {
      "filePath": "users.$userId.tsx",
      "parent": "/users"
    },
    "/pokedex/": {
      "filePath": "pokedex.index.tsx",
      "parent": "/pokedex"
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
    }
  }
}
ROUTE_MANIFEST_END */
