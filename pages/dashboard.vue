<template>
  <div class="col-md-6 mx-auto card  mt-5" >
      <h3 class="text-center" >Create a new Topic</h3>
     
      <div class="card-body">
      <form action="" class="form">
          <div class="form-group">
              <label for="email">Topic Title:</label>
              <input class="form-control" v-model.trim="topic.title" type="email" />
              <small class="form-text text-danger" v-if="errors.title" >{{errors.title[0]}}</small>
          </div>
          <div class="form-group">
              <label for="email" class="text-bolder" >Topic Body:</label>
              <textarea class="form-control" type="password"  v-model="topic.body"></textarea>
               <small class="form-text text-danger" v-if="errors.body" >{{errors.body[0]}}</small>
          </div>
          <button class="btn btn-primary" @click.prevent="create" >Create</button>
      </form>
      </div>
  </div>
</template>

<script>
export default {
    middleware: ["auth"],
    data () {
        return {
            topic: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        
        async create(){
            try {
                await this.$axios.post("/topics", this.topic)
                this.$router.push('/')
            } catch (e) {
                this.error = e.response
            }
            
        }
    },

}
</script>

<style>

</style>