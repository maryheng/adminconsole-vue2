<template>
    <div id="test">
        <p class="title is-4">Manage Users</p>
          <div class="box">
            <div class="tabs">
                <ul>
                    <li class="is-active">
                        <a>Staff</a>
                    </li>
                    <li>
                        <a>Resident Developers</a>
                    </li>
                </ul>
            </div>
            <br>
            <br>
            <!--Input field for Name-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Full Name:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <input class="input" type="text" placeholder="Name">
                  </p>
                </div>
              </div>
            </div>

            <!--Input field for Username-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Username:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <input class="input" type="text" placeholder="Username">
                  </p>
                </div>
              </div>
            </div>      

            <!--Input field for Password-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Password:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <input class="input" type="password" placeholder="Password">
                  </p>
                </div>
              </div>
            </div>                   

            
            <div class="field is-horizontal">
              <div class="field-label">
                <!-- Left empty for spacing -->
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <button class="button is-primary">
                      Send message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>

    <!--Staff Tab-->
    
</template>

<script>
// import axios from 'axios'

export default {
  name: 'app',
  methods: {

  }
  // mounted () {
  //   axios.get(staffUrl)
  //   .then(function (response) {
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })
  // }
}

</script>


<style>
.box {
      display: flex;
    align-items: center; /* for vertical alignment */
}
.field {
  margin-right: -700px;
  margin: 0 auto;
}
.input {
  margin: 8px;
}
</style>
