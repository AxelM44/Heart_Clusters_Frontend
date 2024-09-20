import { createRouter, createWebHistory } from 'vue-router'
import FormUSA from '../views/FormUSA.vue'
import FormLiss from '../views/FormLiss.vue'
import NotFound from '../views/NotFound.vue'
import ResultUSA from '../views/ResultUSA.vue'
import ResultLiss from '../views/ResultLiss.vue'
import Dataset_comparison from '../views/Dataset_comparison.vue';

const routes = [
  {
    path: '/',
    name: 'FormUSA',
    component: FormUSA,
    meta: { scrollToTop: false }
  },
  {
    path: '/lissform',
    name: 'FormLiss',
    component: FormLiss,
    meta: { scrollToTop: false }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/dataset_comparison',
    name: 'Dataset_comparison',
    component: Dataset_comparison,
    meta: { scrollToTop: false }
  },
  {
    path: '/resultusa',
    name: 'ResultUSA',
    component: ResultUSA,
    props: true,
    meta: { scrollToTop: true }
  },
  {
    path: '/resultliss',
    name: 'ResultLiss',
    component: ResultLiss,
    props: true,
    meta: { scrollToTop: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If a saved position is available (reverse navigation), restore this position
    if (savedPosition) {
      return savedPosition;
    } else {
      // Checks whether the target route has the meta.scrollToTop property set to true
      if (to.meta.scrollToTop) {
        return { top: 135, left: 0 };
      } else {
        // Doesn't do anything if scrollToTop is false or undefined
        return null;
      }
    }
  }
})

export default router
