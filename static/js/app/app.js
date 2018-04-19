import Nav from './components/gongos-navbar.js'
import Hero from './components/gongos-hero.js'
import Content from './components/gongos-content.js'
import Card from './components/gongos-card.js'
import Panel from './components/gongos-panel.js'
import { chartSeriesColors, chartTextStyle, baseBarLineChart, baseBarChart, baseDoughnutChart } from './components/gongos-charts.js'

Vue.options.delimiters = ['{%', '%}']
Vue.component('chart', VueECharts)

const isIE11 = !!window.MSInputMethodContext && !!document.documentMode

const app = new Vue({
  // create your Vue Object
  el: '#main',
  components: {
    'gongos-navbar': Nav,
    'gongos-hero': Hero,
    'gongos-content': Content,
    'gongos-card': Card,
    'gongos-panel': Panel
  },
  data: {
    title: 'Bootcamp Exercise',
    subtitle: 'Visualizing data from videogame sales and ratings',
    heroClass: isIE11 ? 'is-large' : 'is-fullheight',
    isLoading: false,
    loadCompleted: 0,
    chartData: [], 
    cards: [],
    barLineChart: {},
    doughnutChart: {},
    barChart: {},
  },
  watch: {
    isLoading: function(v) {
      if (v || this.cards.length > 0) {
        this.heroClass = ''
      } else {
        this.heroClass = 'is-fullheight'
      }
    }
  },
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
          _.forEach(response.data, function(v, k) {
            response.data[k] = JSON.parse(v)
          })
          this.cleanData(response.data)
            .then((readyData) => {
              this.createCharts(readyData)
              this.isLoading = false
            })
          })
        },
        createCharts: function (readyData) {
         
          // need better way to clear echarts data
          if (Object.keys(this.$refs).indexOf('chart') != -1) {
            _.forEach(this.$refs.chart, function (value) {
              value.clear()
            })
          }
          // this shit's weird

          // barLine
          var namesData = _.map(readyData['top5Games'], 'name')
          var seriesData1 = _.map(readyData['top5Games'], 'critic_score')
          seriesData1 = _.map(seriesData1, function (x) { return ((x / 100) * 10).toFixed(1) })
          var seriesData3 = _.map(readyData['top5Games'], 'user_score')
          var seriesData2 = _.map(readyData['top5Games'], 'global_sales')

          // this.barLineChart = JSON.parse(JSON.stringify(baseBarLineChart)) // this can be dangerous
          this.barLineChart = _.cloneDeep(baseBarLineChart) // using lodash to create a deep copy of the obj
          this.barLineChart.title.text = 'Top 5 Global Sales' // should be variable
          this.barLineChart.legend.data = ['Critic Score', 'User Score', 'Global Sales'] // should be variable
          this.barLineChart.yAxis = [
            {
              type: 'value',
              name: 'Rating',
              min: 0,
              max: 10,
              interval: 5,
              axisLabel: {
                formatter: '{value} / 10'
              }
            },
            {
              type: 'value',
              name: 'Global Sales',
              min: 0,
              max: 100,
              interval: 25,
              axisLabel: {
                formatter: '{value} mil units'
              }
            }
          ] // make variable
          this.barLineChart.xAxis = [] 
          
          this.barLineChart.xAxis.push({ type: 'category', data: namesData, axisPointer: { type: 'shadow' } })
          this.barLineChart.series.push({ name: 'Critic Score', type: 'bar', data: seriesData1 })
          this.barLineChart.series.push({ name: 'User Score', type: 'bar', data: seriesData3 })
          this.barLineChart.series.push({ name: 'Global Sales', type: 'line', yAxisIndex: 1, data: seriesData2 })
          this.barLineChart.color = Object.keys(chartSeriesColors).map(e => chartSeriesColors[e])

          // doughnut
          // this.doughnutChart = JSON.parse(JSON.stringify(baseDoughnutChart)) // this can be dangerous
          this.doughnutChart = _.cloneDeep(baseDoughnutChart) // using lodash to create a deep copy of the obj
          this.doughnutChart.title.text = 'Total Genre Breakout'
          this.doughnutChart.legend.data = _.map(readyData['genres'], 'genre')
          this.doughnutChart.series[0].data = readyData['genres']
          this.doughnutChart.series[0].name = 'Genre'
          this.doughnutChart.color = Object.keys(chartSeriesColors).map(e => chartSeriesColors[e])

          // simple bar
          // this.barChart = JSON.parse(JSON.stringify(baseBarChart)) // this can be dangerous
          this.barChart = _.cloneDeep(baseBarChart) // using lodash to create a deep copy of the obj           
          this.barChart.title.text = 'Top 5 Developers (Most 90+ Critic Scores)'
          this.barChart.xAxis.data = _.map(readyData['developers'], 'name')
          this.barChart.series[0] = { type: 'bar', data: _.map(readyData['developers'], 'value') }
          this.barChart.color = Object.keys(chartSeriesColors).map(e => chartSeriesColors[e])

          this.cards = [
            { chartType: this.barLineChart, title: 'Top 5 Global Sales', size: 'column is-full' },
            { chartType: this.doughnutChart, title: 'Total Genre Breakout', size: 'column is-4' },
            { chartType: this.barChart, title: 'Top 5 Developers (Most 90+ Critic Scores)', size: 'column is-8' }
          ] // hardcoded


    },
    cleanData: function (data) {
      return new Promise((resolve, reject) => {
        var readyData = {}
        data['raw_data'] = _(data['raw_data'])
          .filter(function (o) { return (o.critic_score !== null && o.user_score !== null )}).value()
        data['grouped_by_name_data'] = _(data['grouped_by_name_data'])
          .filter(function (o) { return (o.critic_score !== null && o.user_score !== null) }).value()
        // sort desc by score
        this.chartData = data
        var debugData = data
        readyData['top5Games'] = _.orderBy(data['grouped_by_name_data'], ['global_sales'], ['desc']).slice(0, 5)
        readyData['genres'] = _(data['raw_data'])
          .groupBy('genre')
          .map((items, genre) => ({ name: genre, value: items.length }))
          .orderBy(['value'],['desc'])
          .value()
        readyData['developers'] = _(data['raw_data'])
          .filter(function (o) { return o.critic_score >= 90 })
          .groupBy('developer')
          .map((items, developer) => ({name: developer, value: items.length}))
          .orderBy(['value'], ['desc'])
          .value().slice(0, 5)
        resolve(readyData)
      })
    }
  }
})
