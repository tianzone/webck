<template>
  <div id="tt-body">
    <label id="tt-count-val">{{countVal}}</label>
    <br />
    <label id="tt-set-interval">Interval</label>
    <input id="tt-input-interval" type="number" v-model="interval" />
    <label id="tt-switch">Switch</label>
    <input id="tt-input-switch" type="number" v-model="enableSwitch" />
    <br />
    <input id="tt-btn-apply" type="button" @click="ApplySettingFunc" value="Apply"/>
  </div>
</template>

<script>
import request from '../common/Request.js'

export default{
  data () {
    return {
      countVal: '0',
      interval: '0',
      enableSwitch: '0'
    }
  },
  methods: {
    ApplySettingFunc: function () {
      var payload = {
        Action: 'applySetting',
        Params: {
          interval: this.interval,
          enable: this.enableSwitch
        }
      }

      // Debugging
      console.log('New setting' + JSON.stringify(payload))

      // Request for the server
      request.Request.Post('/ticktimer', payload, function (response) {
        if (response['Code'] !== '0') {
          alert('Applied new setting fail...')
        } else {
          // Success to apply the setting
        }
      })
    },
    // The callback of request get.
    UpdateSettingCb: function (response) {
      // Debugging
      console.log('Get response: ' + JSON.stringify(response.data))
      // var respObj = JSON.parse(response.data)
      var data = response.data['Data']
      this.countVal = data['countVal']
      this.interval = data['interval']
      this.enableSwitch = data['enable']
    },

    // The sync data loop
    SyncDataLoopFunc: function () {
      var payload = {
        action: 'getInfos',
        params: {}
      }

      // Debugging
      console.log('New get' + JSON.stringify(payload))

      // Request for the server
      request.Request.Get('/ticktimer', payload, this.UpdateSettingCb)
    }
  },

  // The actions when in mounted stage
  mounted: function () {
    // Request the data every interval.
    // setInterval(this.SyncDataLoopFunc, 3 * 1000)
    console.log('Added the sync loop...')
  }
}
</script>

<style>
</style>
