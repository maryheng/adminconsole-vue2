<template>
  <div id="container">
    <p class="title is-4">Dashboard</p>
  
    <div class="content">
      <div class="columns">
        <div class="column is-6">
          <div class="box">
            <p class="title is-5">
              <strong>Loan Notification</strong>
            </p>
            <div class="NotiTable">
              <table class="table is-narrow">
                <tbody>
                  <tr v-for="row in loanNotiArray" :key="row" @click="redirectLoanUrl(row)">
                    <td>
                      {{ row.triggerDateTime }}
                    </td>
                    <td>
                      {{ row.notificationBody }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br>
            <br>
          </div>
        </div>
  
        <div class="column is-6">
          <div class="box">
            <p class="title is-5">
              <strong>Training Notification</strong>
            </p>
            <div class="NotiTable">
              <table class="table is-narrow">
                <tbody>
                  <tr v-for="row in trainingNotiArray" :key="row" @click="redirectTrainingUrl(row)">
                    <td>
                      {{ row.triggerDateTime }}
                    </td>
                    <td>
                      {{ row.notificationBody }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
  
    <div class="content">
      <div class="columns">
        <div class="column is-12">
          <div class="box">
            <p class="title is-5">
              <strong>Visitor Count</strong>
            </p>
            <!-- Graph Generation for Visitor Count -->
            <visitor-record-graph></visitor-record-graph>
            
            <!-- Save Button -->
            <div class="savePDFBtn">
              <a class="button is-danger is-outlined" @click="downloadVisitorpdf">
              Download as PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="content">
      <div class="columns">
        <div class="column is-12">
          <div class="box">
            <p class="title is-5">
              <strong>Laser Cutter & 3D Printer</strong>
            </p>
            <!-- Graph Generation for Loan Usage -->
            <loan-usage-graph></loan-usage-graph>

            <!-- Save Button -->
            <div class="savePDFBtn">
              <a class="button is-danger is-outlined" @click="downloadLoanpdf">
              Download as PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import VisitorRecordGraph from '../../components/dashboard/VisitorRecordsGraph.vue'
import LoanUsageGraph from '../../components/dashboard/LoanUsageGraph.vue'
import { notificationUrl, notificationLookedAt, downloadVisitorReport, downloadLoanReport } from '../../config.js'
import axios from 'axios'
import moment from 'moment'
import router from '../../router'

export default {
  name: 'app',
  components: {
    VisitorRecordGraph,
    LoanUsageGraph
  },
  data () {
    return {
      trainingNotiArray: [],
      loanNotiArray: [],
      allNotifications: [],
      date: '',
      currentDate: ''
    }
  },
  methods: {
    downloadVisitorpdf () {
      axios.get(downloadVisitorReport, {
        responseType: 'arraybuffer'
      }).then((response) => {
        console.log(response)
        let blob = new Blob([response.data], { type: 'application/pdf' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'VisitorCountGraph_' + this.currentDate + '.pdf'
        link.click()
      })
    },
    downloadLoanpdf () {
      axios.get(downloadLoanReport, {
        responseType: 'arraybuffer'
      }).then((response) => {
        console.log(response)
        let blob = new Blob([response.data], { type: 'application/pdf' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'LoanGraph_' + this.currentDate + '.pdf'
        link.click()
      })
    },
    filterNotificationsForLoan () {
      let self = this
      const allNotifications = self.allNotifications
      return allNotifications.filter((item) => {
        return item.fk_trainingId === null // If true, notifications belong to due loans!
      })
    },
    filterNotificationsForTraining () {
      let self = this
      const allNotifications = self.allNotifications
      return allNotifications.filter((item) => {
        return item.fk_loanId === null // If true, notifications belong to training!
      })
    },
    redirectTrainingUrl (row) {
      axios.put(notificationUrl + row.notificationId + notificationLookedAt)
      // window.open(row.redirectUrl, '_blank')
      window.location.replace(row.redirectUrl)
    },
    redirectLoanUrl (row) {
      axios.put(notificationUrl + row.notificationId + notificationLookedAt)
      router.push({ path: '/loan/dueloans' })
    }
  },
  created () {
    let self = this

    self.date = new Date()
    self.currentDate = moment(self.date).format('DD/MM/YYYY')

    axios.get(notificationUrl)
      .then((response) => {
        self.allNotifications = response.data

        // Separate notifications between LOAN & TRAINING
        var getTrainingNotification = self.filterNotificationsForTraining()
        var getLoanNotification = self.filterNotificationsForLoan()

        // Format DateTime to be proper
        getLoanNotification.map((item) => {
          if (item.lookedAt === false) {
            const oldTag = {
              triggerDateTime: moment(item.triggerDateTime).format('DD-MM-YYYY'),
              notificationBody: item.notificationBody,
              redirectUrl: item.redirectUrl,
              notificationId: item.notificationId
            }
            self.loanNotiArray.push(oldTag)
          }
        })
        // Format DateTime to be proper
        getTrainingNotification.map((item) => {
          if (item.lookedAt === false) {
            const oldTag = {
              triggerDateTime: moment(item.triggerDateTime).format('DD-MM-YYYY'),
              notificationBody: item.notificationBody,
              redirectUrl: item.redirectUrl,
              notificationId: item.notificationId
            }
            self.trainingNotiArray.push(oldTag)
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

</script>


<style>
.savePDFBtn {
  margin-left: 88%;
  margin-top: 2%;
}

 .NotiTable {
  height: 270px;
  overflow: auto;
  overflow-y: scroll;
} 
tr:hover{
cursor: pointer;
}
</style>
