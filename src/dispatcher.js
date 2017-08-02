import Vue from 'vue'

// Vue custom event dispatcher
// class Dispatcher {
//   constructor () {
//     this.vue = new Vue()
//   }
//   fire (event, data = null) {
//     this.vue.$emit(event, data)
//   }
//   listen (event, callback) {
//     this.vue.$on(event, callback)
//   }
// }

// window.Event = new Dispatcher()

export const Dispatcher = new Vue()
