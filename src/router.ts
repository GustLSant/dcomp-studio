import { createRouter, createWebHistory, type RouteRecordRaw  } from "vue-router";
import HomeView from "./views/HomeView.vue";
import FolderView from "./views/FolderView.vue";
import FileView from "./views/FileView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/folder/:id",
    name: "Folder",
    component: FolderView,
  },
  {
    path: "/file/:id",
    name: "File",
    component: FileView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

