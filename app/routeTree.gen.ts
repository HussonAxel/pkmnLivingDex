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
import { Route as IndexImport } from './routes/index'
import { Route as PokedexIndexImport } from './routes/pokedex.index'
import { Route as PokemonPokemonNameImport } from './routes/pokemon.$pokemonName'
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

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PokedexIndexRoute = PokedexIndexImport.update({
  id: '/pokedex/',
  path: '/pokedex/',
  getParentRoute: () => rootRoute,
} as any)

const PokemonPokemonNameRoute = PokemonPokemonNameImport.update({
  id: '/pokemon/$pokemonName',
  path: '/pokemon/$pokemonName',
  getParentRoute: () => rootRoute,
} as any)

const PokedexGenerationIDRoute = PokedexGenerationIDImport.update({
  id: '/pokedex/$generationID',
  path: '/pokedex/$generationID',
  getParentRoute: () => rootRoute,
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
      path: '/pokedex/$generationID'
      fullPath: '/pokedex/$generationID'
      preLoaderRoute: typeof PokedexGenerationIDImport
      parentRoute: typeof rootRoute
    }
    '/pokemon/$pokemonName': {
      id: '/pokemon/$pokemonName'
      path: '/pokemon/$pokemonName'
      fullPath: '/pokemon/$pokemonName'
      preLoaderRoute: typeof PokemonPokemonNameImport
      parentRoute: typeof rootRoute
    }
    '/pokedex/': {
      id: '/pokedex/'
      path: '/pokedex'
      fullPath: '/pokedex'
      preLoaderRoute: typeof PokedexIndexImport
      parentRoute: typeof rootRoute
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
  '': typeof PathlessLayoutNestedLayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/pokedex/$generationID': typeof PokedexGenerationIDRoute
  '/pokemon/$pokemonName': typeof PokemonPokemonNameRoute
  '/pokedex': typeof PokedexIndexRoute
  '/route-a': typeof PathlessLayoutNestedLayoutRouteARoute
  '/route-b': typeof PathlessLayoutNestedLayoutRouteBRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof PathlessLayoutNestedLayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/pokedex/$generationID': typeof PokedexGenerationIDRoute
  '/pokemon/$pokemonName': typeof PokemonPokemonNameRoute
  '/pokedex': typeof PokedexIndexRoute
  '/route-a': typeof PathlessLayoutNestedLayoutRouteARoute
  '/route-b': typeof PathlessLayoutNestedLayoutRouteBRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_pathlessLayout': typeof PathlessLayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/_pathlessLayout/_nested-layout': typeof PathlessLayoutNestedLayoutRouteWithChildren
  '/pokedex/$generationID': typeof PokedexGenerationIDRoute
  '/pokemon/$pokemonName': typeof PokemonPokemonNameRoute
  '/pokedex/': typeof PokedexIndexRoute
  '/_pathlessLayout/_nested-layout/route-a': typeof PathlessLayoutNestedLayoutRouteARoute
  '/_pathlessLayout/_nested-layout/route-b': typeof PathlessLayoutNestedLayoutRouteBRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/deferred'
    | '/redirect'
    | '/pokedex/$generationID'
    | '/pokemon/$pokemonName'
    | '/pokedex'
    | '/route-a'
    | '/route-b'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/deferred'
    | '/redirect'
    | '/pokedex/$generationID'
    | '/pokemon/$pokemonName'
    | '/pokedex'
    | '/route-a'
    | '/route-b'
  id:
    | '__root__'
    | '/'
    | '/_pathlessLayout'
    | '/deferred'
    | '/redirect'
    | '/_pathlessLayout/_nested-layout'
    | '/pokedex/$generationID'
    | '/pokemon/$pokemonName'
    | '/pokedex/'
    | '/_pathlessLayout/_nested-layout/route-a'
    | '/_pathlessLayout/_nested-layout/route-b'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PathlessLayoutRoute: typeof PathlessLayoutRouteWithChildren
  DeferredRoute: typeof DeferredRoute
  RedirectRoute: typeof RedirectRoute
  PokedexGenerationIDRoute: typeof PokedexGenerationIDRoute
  PokemonPokemonNameRoute: typeof PokemonPokemonNameRoute
  PokedexIndexRoute: typeof PokedexIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PathlessLayoutRoute: PathlessLayoutRouteWithChildren,
  DeferredRoute: DeferredRoute,
  RedirectRoute: RedirectRoute,
  PokedexGenerationIDRoute: PokedexGenerationIDRoute,
  PokemonPokemonNameRoute: PokemonPokemonNameRoute,
  PokedexIndexRoute: PokedexIndexRoute,
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
        "/_pathlessLayout",
        "/deferred",
        "/redirect",
        "/pokedex/$generationID",
        "/pokemon/$pokemonName",
        "/pokedex/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
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
      "filePath": "pokedex.$generationID.tsx"
    },
    "/pokemon/$pokemonName": {
      "filePath": "pokemon.$pokemonName.tsx"
    },
    "/pokedex/": {
      "filePath": "pokedex.index.tsx"
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
