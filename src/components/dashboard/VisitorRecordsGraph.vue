<script>
import { Bar } from 'vue-chartjs'
import axios from 'axios'
import { visitorDataUrl } from '../../config.js'

export default Bar.extend({
  name: 'app',
  data () {
    return {
      datacollection: {
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: []
        }
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barPercentage: 1,
            stacked: true,
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  methods: {
    dynamicColors () {
      var r = Math.floor(Math.random() * 255)
      var g = Math.floor(Math.random() * 255)
      var b = Math.floor(Math.random() * 255)
      return 'rgba(' + r + ',' + g + ',' + b + ', 0.7)'
    }
  },
  mounted () {
    let self = this
    axios.get(visitorDataUrl)
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          var obj = {}
          obj.label = response.data[i].visitPurpose
          obj.data = response.data[i].visitorCount
          obj.backgroundColor = this.dynamicColors()
          obj.borderWidth = 1
          self.datacollection.data.datasets.push(obj)
        }
        self.renderChart(self.datacollection.data, self.options)
      })
  }
})
</script>
