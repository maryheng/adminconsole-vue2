<template>
  <div id="test2">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">User Details</p>
      </div>
      <hr>
  
      <!--Input field for Full Name-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Full Name:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text">
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for Email-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Email:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="email">
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for NRIC-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">NRIC:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text">
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for Mobile Number-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Mobile Number:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="number">
            </p>
          </div>
        </div>
      </div>
  
      <br>
      <br>
      <div class="header">
        <p class="title is-4">Access Card</p>
      </div>
      <hr>
  
      <!--Input field for Key Card Reference Number-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Key Card Reference Number:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text">
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for Issurance Date-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Issurance Date:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="date">
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
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}

</script>


<style>
.box {
  padding-bottom: 10%;
}

.header {
  margin-left: 200px;
  margin-top: 1%;
}

.innerContainer {
  margin: 0 auto;
  position: relative;
  margin-right: -2000px;
}

input {
  margin-top: 10px;
}

label {
  margin-top: 8px;
}

hr {
  margin-left: 2%;
  width: 35%;
}

button {
  margin-top: 1%;
}

.input {
  width: 300px;
}
</style>
