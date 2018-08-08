<template>
  <div>

    This is Google Analytics Page

    <!-- The Sign-in button. This will run `queryReports()` on success. -->
    <v-btn @click="queryReports">
      <!-- <p class="g-signin2" data-onsuccess="queryReports"></p> -->
      Analytic
    </v-btn>


    <!-- The API response will be printed here. -->
    <textarea cols="80" rows="20" id="query-output"></textarea>

    <div id="analytics_result">

    </div>


  </div>
</template>

<script>
// Replace with your view ID.
var VIEW_ID = 'analytics_result';

export default {
  data() {
    return {
    }
  },

  mounted() {
  }, // mounted

  methods: {


    // Query the API and print the results to the page.
    queryReports() {
      gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
          reportRequests: [
            {
              viewId: VIEW_ID,
              dateRanges: [
                {
                  startDate: '7daysAgo',
                  endDate: 'today'
                }
              ],
              metrics: [
                {
                  expression: 'ga:sessions'
                }
              ]
            }
          ]
        }
      }).then(this.displayResults, console.error.bind(console));
    },

    displayResults(response) {
      var formattedJson = JSON.stringify(response.result, null, 2);
      document.getElementById('query-output').value = formattedJson;
    }

  },

  components: {

  }

} // export default

</script>

<style>
</style>
