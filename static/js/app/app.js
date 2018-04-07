Vue.options.delimiters = ['{%', '%}']

const app = new Vue({
  // create your Vue Object
  el: '#main',
  components: {
    'gongos-navbar': gongosNavbar,
    'gongos-hero': gongosHero,
    'gongos-content': gongosContent,
    'gongos-card': gongosCard
  },
  data: {
    title: 'Bootcamp Exercise',
    subtitle: 'Visualizing data from videogame sales and ratings',
    isLoading: false
  },
  methods: {
    getData: function () {
      this.isLoading = true
      axios.get(GETDATA)
        .then(response => {
          const data = response.data
          console.log(data)
          this.isLoading = false
        })
    }
  }
})
