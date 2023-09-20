<template>
  <div>
    <Header></Header>

    <Main>
      <h1 class="text-6xl">Kontaktų sistema</h1>
      <div>Search component Will Be Here</div>
      <div>buttons will be here</div>
      <div>filter</div>

      <div>
        <md-card>
          <md-card-header>
            <div class="md-title">Card without hover effect</div>
          </md-card-header>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
            itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>

          <md-card-actions>
            <md-button>Action</md-button>
            <md-button>Action</md-button>
          </md-card-actions>
        </md-card>

        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">Vardas ir pavardė</div>
              <div class="md-subhead">It also have a ripple</div>
            </md-card-header>

            <md-card-content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
              itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
            </md-card-content>

            <md-card-actions>
              <md-button>Action</md-button>
              <md-button>Action</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </div>
    </Main>

    <Footer> Pagination component Will Be Here</Footer>
  </div>
</template>

<script>
import Header from "../components/header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
