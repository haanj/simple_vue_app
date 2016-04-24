var vm = new Vue({
  el: '#app',

  data: {
    message: 'Hello World',
    active: null,
    snacks: [
      {name: "nachos", ingredients: ['chips', 'cheese']},
      {name: "potatos", ingredients: ['potatos', 'cheese']} 
    ]
  },

  ready: function() {
    console.log('ready triggered')
    $.get('http://localhost:3000/snacks', (data) => {
      this.snacks = data
    })
  }, 

  methods: {
    isActive: function(snack) {
      return snack == vm.active
    },
    makeActive: function(snack) {
      if (vm.active != snack) {
        return this.active = snack
      }
      this.active = null // becomes inactive if already active
    },
    deleteSnack: function(snack) {
      console.log(`delete ${snack}`)
      this.snacks = this.snacks.map((s)=>{
        return s._id!=this.active?s:snack
      })
    }

 }
})

