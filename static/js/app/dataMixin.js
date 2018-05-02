const dataMixin = {
  methods: {
    getData: function (index) {
      var vm = this
      let decade = index || 0
      this.isLoading = true
      let axiosConfig = {
        onDownloadProgress: function (progressEvent) {
          let currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          vm.loadCompleted = currentProgress
          console.warn(currentProgress)
        }
      }
      axios.post(GETDATA, { decade: decade }, axiosConfig)
        .then(response => {
          // console.log(response.data)
          _.forEach(response.data, function (v, k) {
            response.data[k] = JSON.parse(v)
          })
          this.cleanData(response.data)
            .then((readyData) => {
              this.createCharts(readyData)
              this.isLoading = false
            })
        })
    }
  }
}

export default dataMixin
