import { reactive, readonly } from 'vue'
import axios from 'axios'
import { Post, today, thisWeek, thisMonth } from './mocks'

interface State {
  posts: PostsState
}

interface PostsState {
  // o(n)
  ids: string[]

  // o(1)
  all: Map<string, Post>

  loaded: boolean
}

class Store {
  private state: State

  constructor(initial: State) {
    this.state = reactive(initial)
  }

  getState() {
    return readonly(this.state)
  }

  async createPost(post: Post) {
    const response = await axios.post<Post>('/posts', post)
    this.state.posts.all.set(post.id, response.data)
    this.state.posts.ids.push(post.id)
    console.log(response)
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

const store = new Store({
  posts: {
    all,
    ids: [],
    loaded: false
  }
})

// use 
// composable
// provide inject
export function useStore() {
  return store
}

store.getState().posts.loaded
