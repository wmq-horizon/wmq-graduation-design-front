<template>
  <div class="home">
    <vue-canvas-nest :config="{color:'0,0,0', count: 500}" :el="'#area'">
    </vue-canvas-nest>
    <div id="area" style="width: 1000px;height: 1000px">里面是背景上面的内容</div>
  </div>

</template>

<script>
    import vueCanvasNest from 'vue-canvas-nest'
    export default {
        name: 'Home',
        components:{vueCanvasNest},
        data () {
            return {
            }
        },
        mounted(){//****在这里绑定监听器


        },
        methods: {


        }

    }
</script>
<style>
  #area{
    width: 1000px;
    height: 1000px;
  }
</style>
