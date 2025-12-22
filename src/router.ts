import { createRouter, createWebHistory, type RouteRecordRaw  } from "vue-router";
import HomeView from "./views/HomeView.vue";
import FolderView from "./views/FolderView.vue";
import FileView from "./views/FileView.vue";
import StartView from "./views/StartView.vue";
import type { RouteMeta } from "./types/route";
import CodeNavbarMenu from "./components/layout/CodeNavbarMenu/CodeNavbarMenu.vue";
import { useModalStore } from "./stores/modals";


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


router.beforeEach((_to, _from, _next) => {
  const modalStore = useModalStore();

  console.log('hasAnyOpen: ', modalStore.hasAnyModalOpen());
  console.log('localStorage.getItem(modal): ', localStorage.getItem('modal'));
  const a = modalStore.hasAnyModalOpen();

  if (localStorage.getItem('modal')) {
    // modalStore.closeAllModals();
    // console.log('vai rodaro next(fasle)')
    _next(false);
    return;
  }
  else{ 
    _next();
    return;
  }
})


export default router;