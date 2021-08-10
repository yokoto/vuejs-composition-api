import { mount }  from '@vue/test-utils'
import Navbar from '../../src/components/Navbar.vue'
import Signup from '../../src/components/Signup.vue'
import { Store } from '../../src/store'

describe('Navbar', () => {
  it('shows a signup modal via teleport', async () => {
    const store = new Store({
      posts: {
        all: new Map(),
        ids: [],
        loaded: false
      }
    })

    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)

    const wrapper = mount(Navbar, {
      attachTo: document.body,
      global: {
        components: {
          RouterLink: {
            template: `<div></div>`
          }
        },
        plugins: [
          store,
        ]
      }
    })

    const form = wrapper.getComponent(Signup)

    expect(document.body.outerHTML).toContain('This value must be between 10 and 40.')

    await form.get('#Username').setValue('Username')
    await form.get('#Password').setValue('12345678910')

    expect(document.body.outerHTML).not.toContain('This value must be between 10 and 40.')

    await form.trigger('submit.prevent')
  })
})
