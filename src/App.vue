<template>
  <div id="app" class="container mx-auto">
    <nav id="navbar" class="bg-gray-800">
      <h4 class="text-white font-semibold py-2 px-4">Ledge Judge (demo ver.)</h4>
    </nav>
    <vue-freezeframe ref="ledge_gif" @start="count_start" :options="{trigger: false}">
      <img :src="gif_path">
    </vue-freezeframe>
    <p>frames: {{ frame }}F</p>
    <p>answer: {{ result }}</p>
    <div v-if="is_playing==false">
      <button v-on:click="onStart" class="bg-green-700 font-semibold text-white py-2 px-4 mx-2 rounded focus:shadow-outline">Start</button>
    </div>
    <div v-else class="mx-auto">
      <button @click="onStop('getup')" class="bg-indigo-700 font-semibold text-white mx-2 my-1" style="width: 45%; height: 20vh">Get up</button>
      <button @click="onStop('jump')" class="bg-indigo-700 font-semibold text-white mx-2 my-1" style="width: 45%; height: 20vh">Jump</button><br>
      <button @click="onStop('attack')" class="bg-indigo-700 font-semibold text-white mx-2 my-1" style="width: 45%; height: 20vh">Attack</button>
      <button @click="onStop('roll')" class="bg-indigo-700 font-semibold text-white mx-2 my-1" style="width: 45%; height: 20vh">Roll</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      time: 0,
      frame: 0,
      start_time: 0,
      now_time: "",
      diff: "",
      gif_name: "jump",
      gif_path: require("./assets/jump.gif"),
      result: "",
      is_playing: false
    }
  },

  methods: {
    count_start() {
      this.start_time = new Date().getTime()
    },
    onStart(){
      this.is_playing = true
      this.change_gif()
      this.frame = 0
      this.result = ""
      setTimeout(this.gif_start, 3000)
      setTimeout(this.gif_stop, 4330)
    },
    onStop(answer){
      this.is_playing = false
      this.judge(answer)
      this.count_stop()
    },
    gif_start(){
      this.$refs.ledge_gif.start()
    },
    gif_stop() {
      this.$refs.ledge_gif.stop()
    },
    count_stop(){
      this.now_time = new Date().getTime()
      this.diff = new Date(this.now_time - this.start_time)
      this.time = (this.diff.getSeconds() + this.diff.getMilliseconds() * 0.001) - 0.500
      this.frame = Math.floor(this.time * 60)
    },
    change_gif(){
      var gifs = ["jump", "attack", "roll", "getup"]
      this.gif_name = gifs[Math.floor(Math.random() * gifs.length)]
      this.gif_path = require("./assets/" + this.gif_name + ".gif")
    },
    judge(answer){
      if(this.gif_name == answer){
        this.result = "Correct"
      } else {
        this.result = "Incorrect"
      }
    }
  }
};
</script>