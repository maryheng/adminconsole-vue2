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
              <table class="table is-narrow is-bordered">
                <tbody>
                  <tr v-for="row in loanArray" :key="row">
                    <td>
                      <input type="text" v-model="row.date">
                    </td>
                    <td>
                      <input type="text" v-model="row.description">
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
              <table class="table is-narrow is-bordered">
                <tbody>
                  <tr v-for="row in loanArray" :key="row">
                    <td>
                      <input type="text" v-model="row.date">
                    </td>
                    <td>
                      <input type="text" v-model="row.description">
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
            <div class="saveBtn">
              <button class="button is-danger is-outlined">
                Download as PDF
              </button>
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
            <div class="saveBtn">
              <button class="button is-danger is-outlined">
                Download as PDF
              </button>
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

export default {
  name: 'app',
  components: {
    VisitorRecordGraph,
    LoanUsageGraph
  },
  data () {
    return {
      loanArray: []
    }
  }
}

</script>


<style>
.saveBtn {
  margin-left: 88%;
  margin-top: 5%;
}

.NotiTable {
  height: 200px;
}
</style>
