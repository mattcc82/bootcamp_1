// bar & line
const baseBarLineChart = {
  title: {
    text: ''
  },
  legend: {
    data: []
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  xAxis: [],
  yAxis: [],
  series: [],
  animationDuration: 1000
}

// simple bar
const baseBarChart = {
  title: {
    text: ''
  },
  xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
      },
      data: []
  },
  yAxis: {
      type: 'value'
  },
  series: []
};


// doughnut
const baseDoughnutChart = {
  title: {
    text: ''
  },
  tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      x: 'left',
      data:[]
  },
  series: [
      {
          name:'',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          data:[]
      }
  ]
};
