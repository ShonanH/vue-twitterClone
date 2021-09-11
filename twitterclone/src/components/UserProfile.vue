<template>
  <div class="user-profile">
    <div class="user-profile__sidebar">
      <div class="user-profile__user-panel">
        <h1 class="user-profile__username">@{{ state.user.username }}</h1>
        <div class="user-profile__admin-badge" v-if="state.user.isAdmin">
          Admin
        </div>
        <div class="user-profile__follower-count">
          <strong>Followers:</strong> {{ state.followers }}
        </div>
      </div>
      <CreateTweetPanel @add-tweet="addTweet" />
    </div>

    <div class="user-profile__tweets-wrapper">
      <TweetItem
        v-for="t in state.user.tweets"
        :key="t.id"
        :username="state.user.username"
        :tweet="t"
      />
    </div>
  </div>
</template>

<script>
import TweetItem from "./TweetItem";
import CreateTweetPanel from "./CreateTweetPanel";
import { reactive } from "vue";

export default {
  name: "UserProfile",
  components: { TweetItem, CreateTweetPanel },
  setup() {
    const state = reactive({
      followers: 0,
      user: {
        id: 1,
        username: "leakyplunder",
        firstName: "Shonan",
        lastName: "Hendre",
        email: "shonanhendre@gmail.com",
        isAdmin: true,
        tweets: [
          { id: 1, content: "Twitter-Clone is amazing!" },
          { id: 2, content: "Nice Twitter-Clone bro!" },
        ],
      },
    });

    function addTweet(t) {
      state.user.tweets.unshift({
        id: this.user.tweets.length + 1,
        content: t,
      });
    }

    return {
      state,
      addTweet,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 50px;
  // width: 85%;
  padding: 50px 5%;

  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;
    margin-bottom: auto;

    .user-profile__admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-top: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    }

    h1 {
      margin: 0;
    }
  }
  .user-profile__tweets-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
}
</style>
