var vm = new Vue({
  el: '#app',

  data: {
    newName: null,
    newIngredients: null,
    newTags: null,
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
      return snack == this.active
    },
    
    toggleActive: function(snack) {
      if (this.active != snack) {
        this.active = snack
        return 
      }
      this.active = null // becomes inactive if already active
    },

    newSnack: function() {
      console.log('newSnack)')
      var snack = {
        name: this.newName,
        ingredients: this.newIngredients.split(', '),
        tags: this.newTags.split(', ')
      }


      this.newName = null
      this.newIngredients = null
      this.newTags = null

      console.log(snack)

      $.ajax({
        url: 'http://localhost:3000/snacks/',
        type: 'POST',
        data: JSON.stringify(snack),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: (data) => {
          console.log(data)
          console.log(this.snacks)
          this.snacks.push(data)
          console.log(this.snacks)
        }
      })
    },

    updateSnack: function() {
      console.log(`update ${this.active}`)
      var snack = {
        name: this.newName,
        ingredients: this.newIngredients.split(', '),
        tags: this.newTags.split(', ')
      }

      this.newName = null
      this.newIngredients = null
      this.newTags = null

      $.ajax({
        url: 'http://localhost:3000/snacks/'+this.active, // will submit to active snack id
        type: 'PUT',
        data: JSON.stringify(snack),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: () => {
          this.snacks = this.snacks.map((s)=>{
            return s._id!=this.active?s:snack; // if snack is the active snack, replace it with the new snack object
          })
          this.active = null
        }
      
      })
    },

    deleteSnack: function(snack) {
      console.log(`delete ${snack}`)
      $.ajax({
        url: 'http://localhost:3000/snacks/'+snack,
        type: 'DELETE',
        success: () => {
          this.snacks = this.snacks.map((s)=>{
            return s._id!=this.active?s:snack
          })
        }
      })
    }
 }
})

