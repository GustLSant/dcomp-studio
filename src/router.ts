import { createRouter, createWebHistory, type RouteRecordRaw  } from "vue-router";
import HomeView from "./views/HomeView.vue";
import FolderView from "./views/FolderView.vue";
import FileView from "./views/FileView.vue";
import type { RouteMeta } from "./types/route";
import CodeNavbarMenu from "./components/fileView/CodeNavbarMenu/CodeNavbarMenu.vue";
import ClassicAlgorithmsView from "./views/ClassicAlgorithmsView.vue";
import MenuView from "./views/MenuView.vue";


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
  {
    path: "/menu",
    name: "Menu",
    component: MenuView,
    meta: { navbarVariation: 'full' }
  },
  {
    path: "/algorithms",
    name: "Algorithms",
    component: ClassicAlgorithmsView,
    meta: { navbarVariation: 'full' },
  },
  {
    path: "/exercises",
    name: "Exercises",
    component: ClassicAlgorithmsView,
    meta: { navbarVariation: 'full' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

