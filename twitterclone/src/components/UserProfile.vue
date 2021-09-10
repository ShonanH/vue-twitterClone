<template>
  <div class="user-profile">
    <div class="user-profile__user-panel">
      <h1 class="user-profile__username">@{{ user.username }}</h1>
      <div class="user-profile__admin-badge" v-if="user.isAdmin">Admin</div>
      <div class="user-profile__follower-count">
        <strong>Followers:</strong> {{ followers }}
      </div>
      <form
        class="user-profile__create-tweet"
        @submit.prevent="createNewTweet"
        :class="{ '--exceeded': newTweetCharacterCount > 180 }"
      >
        <label for="newTweet"
          ><strong>New Tweet</strong>({{ newTweetCharacterCount }}/180)</label
        >
        <textarea id="newTweet" rows="3" v-model="newTweetContent" />
        <div class="user-profile__create-tweet-type">
          <label for="newTweetType"><strong>Type: </strong> </label>
          <select id="newTweetType" v-model="selectedTweetType">
            <option
              :value="option.value"
              v-for="(option, index) in tweetTypes"
              :key="index"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <button>
          Tweet!
        </button>
      </form>
    </div>
    <div class="user-profile__tweets-wrapper">
      <TweetItem
        v-for="t in user.tweets"
        :key="t.id"
        :username="user.username"
        :tweet="t"
        @favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import TweetItem from "./TweetItem";
export default {
  name: "UserProfile",
  components: { TweetItem },
  data() {
    return {
      newTweetContent: "",
      selectedTweetType: "instant",
      tweetTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant Tweet" },
      ],
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
    };
  },
  watch: {
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`${this.user.username} has gained a follower`);
      }
    },
  },
  computed: {
    newTweetCharacterCount() {
      return this.newTweetContent.length;
    },
  },
  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavorite(id) {
      console.log("Favorite", id);
    },
    createNewTweet() {
      if (this.newTweetContent && this.selectedTweetType !== "draft") {
        this.user.tweets.unshift({
          id: this.user.tweets.length + 1,
          content: this.newTweetContent,
        });
        this.newTweetContent = "";
      }
    },
  },
  mounted() {
    this.followUser();
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 85%;
  padding: 50px 5%;

  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;

    .user-profile__admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    }

    h1 {
      margin: 0;
    }

    .user-profile__create-tweet {
      display: flex;
      /* border-top: 1px solid #dfe3e8; */
      padding-top: 20px;
      flex-direction: column;

      &.--exceeded {
        color: red;
        border-color: red;
      }
    }
  }
  .user-profile__tweets-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
}
</style>
