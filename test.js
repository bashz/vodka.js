import Component from './Component.js'
import User from './User.js'

const user = new Component(User)
user.mount(window.document.getElementById('app'))
window.user = user
