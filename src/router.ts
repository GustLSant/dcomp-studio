import { createRouter, createWebHistory, type RouteRecordRaw  } from "vue-router";
import HomeView from "./views/HomeView.vue";
import FolderView from "./views/FolderView.vue";
import FileView from "./views/FileView.vue";
import StartView from "./views/StartView.vue";
import type { RouteMeta } from "./types/route";


const routes: Array<RouteRecordRaw & { meta: RouteMeta }> = [
  {
    path: "/",
    name: "Start",
    component: StartView,
    meta: { navbarVariation: 'none' }
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: { navbarVariation: 'full' }
  },
  {
    path: "/folder/:id",
    name: "Folder",
    component: FolderView,
    meta: { navbarVariation: 'full' }
  },
  {
    path: "/file/:id",
    name: "File",
    component: FileView,
    meta: { navbarVariation: 'code' }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

