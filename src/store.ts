import { reactive, readonly, provide, inject, App } from 'vue'
import axios from 'axios'
import { Post, today, thisWeek, thisMonth } from './mocks'

export interface User {
  id: string
  username: string
  password: string
}
interface State {
  posts: PostsState
}

const storeKey = Symbol('store')

interface PostsState {
  // o(n)
  ids: string[]

  // o(1)
  all: Map<string, Post>

  loaded: boolean
}

export class Store {
  private state: State

  constructor(initial: State) {
    this.state = reactive(initial)
  }

  install(app: App) {
    app.provide(storeKey, this)
  }

  getState() {
    return readonly(this.state)
  }

  async createPost(post: Post) {
    const response = await axios.post<Post>('/posts', post)
    this.state.posts.all.set(post.id, response.data)
    this.state.posts.ids.push(post.id)
  }

  async createUser(user: User) {
    // ...
    console.log(user)
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts')
    const postsState: PostsState = {
      ids: [],
      all: new Map,
      loaded: true
    }
    for (const post of response.data) {
      this.state.posts.ids.push(post.id)
      this.state.posts.all.set(post.id, post)
    }

    this.state.posts.loaded = true
  }
}
const all = new Map<string, Post>()

export const store = new Store({
  posts: {
    all,
    ids: [],
    loaded: false
  }
})

// use 
// composable
// provide inject
export function useStore(): Store {
  const _store = inject<Store>(storeKey)
  if (!_store) {
    throw Error('Did you forgot to call provide?')
  }

  return _store
}

store.getState().posts.loaded

// inject('store')
// provide('store', store)