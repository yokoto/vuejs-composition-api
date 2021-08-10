import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from './components/Home.vue'
import NewPost from './components/NewPost.vue'
import ShowPost from './components/ShowPost.vue'
import { Store } from './store'

export function routerWithStore(store: Store) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/posts/:id',
        component: ShowPost
      },
      {
        path: '/posts/new',
        component: NewPost,
        meta: {
          requiredAuth: true
        }
      }
    ]
  })
  
  router.beforeEach((to, from, next) => {
    const auth = !!store.getState().authors.currentUserId
  
    if (!to.meta.requiredAuth) {
      next()
      return
    }
  
    if (to.meta.requiredAuth && auth) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  })

  return router
}
