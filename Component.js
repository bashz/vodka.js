export default function (
  {render, data, watchers, computed} = {render: () => "", data: {}, watchers: {}, computed: {}}
) {
  this.element = null
  this.vNode = document.createElement('vnode')
  this.data = data
  this.watchers = {}
  this.computed = {}
  this.state = {}
  this.render = render.bind(this.state)
  this.transpile = () => {
    const state = this.state
    for (let key in computed) {
      this.computed[key] = computed[key].bind(state)
    }
    for (let key in watchers) {
      this.watchers[key] = watchers[key].bind(state)
    }
  }
  this.compileState = () => {
    for (let key in data) {
      if (watchers[key]) {
        Object.defineProperty(this.state, key, {
          enumerable: true,
          get: () => this.data[key],
          set: (val) => {
            if (this.data[key] !== val) {
              this.watchers[key](val, this.data[key])
            }
            const a = document.activeElement

            window.a = a
            console.log('a', a)
            this.data[key] = val
            this.vNode.innerHTML = this.render()
            this.vNode.childNodes[0].childNodes[3].value = this.state[this.vNode.childNodes[0].childNodes[3].getAttribute('vodka')]
            this.vNode.childNodes[0].childNodes[3].oninput = (event) => this.state[event.target.getAttribute('vodka')] = event.target.value
            this.element.innerHTML = ''
            this.element.append(this.vNode)
            console.log('aa', a)
            a.focus()
            console.log('act', document.activeElement)
          }
         })
      } else {
        Object.defineProperty(this.state, key, {
          enumerable: true,
          get: () => this.data[key],
          set: (val) => {
            const a = document.activeElement

            window.a = a
            console.log('a', a)
            this.data[key] = val
            this.vNode.innerHTML = this.render()
            this.vNode.childNodes[0].childNodes[3].value = this.state[this.vNode.childNodes[0].childNodes[3].getAttribute('vodka')]
            this.vNode.childNodes[0].childNodes[3].oninput = (event) => this.state[event.target.getAttribute('vodka')] = event.target.value
            this.element.innerHTML = ''
            this.element.append(this.vNode)
            console.log('aa', a)
            a.focus()
            console.log('act', document.activeElement)
          }
         })
      }
    }
    for (let key in computed) {
      Object.defineProperty(this.state, key, {
        enumerable: true,
        get: () => this.computed[key]()
       })
    }
  },
  this.mount = (element) => {
    this.element = element
    this.transpile()
    this.compileState()
    for (let key in data) {
      this.state[key] = data[key]
    }
  }
}
