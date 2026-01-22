import { createRouter, createWebHistory, type RouteRecordRaw  } from "vue-router";
import HomeView from "./views/HomeView.vue";
import FolderView from "./views/FolderView.vue";
import FileView from "./views/FileView.vue";
import type { RouteMeta } from "./types/route";
import CodeNavbarMenu from "./components/layout/CodeNavbarMenu/CodeNavbarMenu.vue";


const routes: Array<RouteRecordRaw & { meta: RouteMeta }> = [
  {
    path: "/",
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
    meta: { navbarVariation: 'none' },
    children: [
      {
        path: 'menu',
        name: 'FileMenu',
        component: CodeNavbarMenu
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

