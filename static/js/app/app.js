const app = new Vue({
  // create your Vue Object
  el: '#main'
})

// use axios for xhr
axios.get(GETDATA)
  .then(response => {
    document.getElementById('main').innerHTML = response.data
  })
