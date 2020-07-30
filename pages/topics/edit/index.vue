<template>
  <div class="container">
      
    <div class="col-md-12 mx-auto card  mt-5" >
      <h4>Edit Topic</h4>
     
      <div class="card-body">
      <form action="" class="form">
          <div class="form-group">
              <label for="email">Topic Title:</label>
              <input class="form-control" v-model.trim="topic.title" type="text" />
              <small class="form-text text-danger" v-if="errors.title" >{{errors.title[0]}}</small>
          </div>
          <!-- <div class="form-group">
              <label for="email" class="text-bolder" >Topic Body:</label>
              <textarea class="form-control" type="password"  v-model="topic.body"></textarea>
               <small class="form-text text-danger" v-if="errors.body" >{{errors.body[0]}}</small>
          </div> -->
          <button class="btn btn-outline-primary" @click.prevent="update" >Update</button>
      </form>
      </div>
  </div>
  <div class="mt-5 btn btn-ouline-info" >Back to Topics</div>
  </div>
</template>

<script>
export default {
     middleware: ["auth"],
    data () {
        return {
            topic: {
                title: ''
            }
        }
    },
    async asyncData({$axios, params}) {
        const {data} = await $axios.get(`/topics/${params.id}`)
        return {topic: data.data}
    },
    methods: {
        async update(){
            try {
                await this.$axios.patch(`/topics/${this.$route.params.id}`, {title: this.topic.title})
                this.$router.push('/topics')
            } catch (e) {
                this.error = e.response
            }
        }
    },

}
</script>

<style>

</style>