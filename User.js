export default {
  render() {
    return '' +
    '<div>' +
      `<div>My name is ${this.lastname}</div>` +
      `<div>${this.fullname}</div>` +
      `<div>00${this.length + 3}</div>` +
      `<input vodka="lastname">` +
    '</div>'
  },
  data: {
    firstname: 'James',
    lastname: 'Bond',
    length: 4
  },
  computed: {
    fullname () {
      return `${this.firstname} ${this.lastname}`
    }
  },
  watchers: {
    firstname(newname, oldname) {
      this.length = newname.length
    }
  }
}
