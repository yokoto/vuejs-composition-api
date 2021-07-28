import { reactive, readonly } from 'vue'
import axios from 'axios'
import { Post } from './mocks'

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

const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false
  }
})

store.getState().posts.loaded
