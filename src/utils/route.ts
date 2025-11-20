import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";
import type { RouteMeta } from "../types/route";

export function getNavbarVariation(_route: RouteLocationNormalizedLoadedGeneric) {
    const meta: RouteMeta = _route.meta as RouteMeta;
    return meta.navbarVariation;
}