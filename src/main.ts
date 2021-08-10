import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import { thisMonth, thisWeek, today } from './mocks'
import { routerWithStore } from './router'
import random from 'lodash/random';
import 'highlight.js/styles/atom-one-dark.css'
import { store, User, Author } from './store'

function delay() {
  return new Promise(res => {
    setTimeout(res, 2000)
  })
}

// @ts-ignore
axios.get = async (url: string) => {
  if (url === '/posts') {
    await delay()
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}

// @ts-ignore
axios.post = async (url: string, payload: any) => {
  if (url === '/posts') {
    const id = random(100, 100000)
    await delay()
    return Promise.resolve({
      data: { ...payload, id }
    })
  }

  if (url === '/users') {
    const id = random(100, 100000)
    await delay()
    const author: Author = {
      id: id.toString(),
      username: payload.username
    }
    return Promise.resolve({
      data: author
    })
  }
}

const app = createApp(App)
const router = routerWithStore(store)
app.use(router)
app.use(store)

app.mount('#app')
