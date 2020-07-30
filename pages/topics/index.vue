<template>
  <div class="mx-auto container" >
      <h2 class="text-center" >All Topics</h2>
      <div v-for="topic in topics" :key="topic.id" class="my-5">
          <div class="card p-3">
              <h4 class="card title bg-warning p-2 ">
                  <nuxt-link :to="{name: 'topics-id', params:{id: topic.id}}">
                  {{topic.title}}
                  </nuxt-link>
                  </h4>
        <div v-if="authenticated" >
            <div v-if="user.id === topic.user.id">
                <nuxt-link :to="{name: 'topics-edit', params:{id: topic.id}}">
                    <button  class="btn btn-outline-info  fa fa-edit pull-right" ></button>
                </nuxt-link>

                <button @click="deleteTopic(topic.id)" class="btn btn-outline-danger  fa fa-trash pull-right" ></button>
            </div>
        </div>
              <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
              <div class="card-body" v-for="(content, index) in topic.posts" :key="index" >
                  {{content.body}}
                  <p class="text-muted">{{content.created_at}} by {{content.user.name}}</p>


            <div class="btn btn-outline-primary fa fa-thumbs-up ml-5 mb-2" @click="likePost(topic.id, content)" >
                <span class="badge">{{content.like_count}}</span>
            </div>
              </div>

            <!-- Add likes button -->
          </div>
      </div>
      <nav>
          <ul class="pagination justify-content-center">
              <li v-for="(key, value) in links" :key="value" class="page-item" > 
                  <a @click="loadMore(key)" class="page-link" >{{value}}</a>
              </li>
          </ul>
      </nav>
  </div>
</template>

<script>
export default {
    middleware: ["auth"],
    data () {
        return {
            topics: [],
            links: [],
            authUser: ''
        }
    },
    async asyncData({$axios}) {
        let {data, links} = await $axios.$get("/topics")
        return {
            topics: data,
            links
        }
    },
    methods: {
       async loadMore(key) {
           console.log(key)
           if (key == null) {
               return
           }
          let {data} = await this.$axios.get(key)
          return this.topics = {...this.topics, ...data.data}
       },
       async deleteTopic(topic) {
           console.log(topic)
            await this.$axios.delete(`/topics/${topic}`)
            this.$router.push('/') 
       },
       async likePost(topicId, content){
            const userFromVuex = this.$store.getters.loggedInUser
            if (userFromVuex) {
                if (userFromVuex.id === content.user.id) {
                    alert("You can't like your own post")
                    return;
                }
                if (content.users) {
                    if (content.users.some(user => user.id === userFromVuex.id) ) {
                        alert("You have already liked this post")
                        return;
                    }
                else{
                    await this.$axios.post(`/topics/${topicId}/posts/${content.id}/likes`)
                    let {data, links } = await this.$axios.get(`/topics`)
                    console.log(data)
                    this.topics = data.data
                    this.links = data.links
                    return;
                }
            }
            }
            else{
                alert("Please log in...")
                this.$router.push('/login')
            }
       }
    },
    mounted() {
        this.authUser = this.$store.getters.loggedInUser
        console.log(this.authUser.email)
    },

}
</script>

<style>

</style>