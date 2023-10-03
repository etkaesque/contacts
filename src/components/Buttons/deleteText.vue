<template>
    <md-button
      class="delete-btn-text md-raised"
      @click="handleClick($event)"
    >
     Ištrinti
    </md-button>
  </template>
  
  <script>

  import { mapMutations } from "vuex";
  
  export default {

    props: {
      id: String,
    },
    methods: {
      ...mapMutations(["CONTROL_DELETE", "SET_ACTIVE_COMPANY"]),
      handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        this.CONTROL_DELETE();
        this.SET_ACTIVE_COMPANY(this.id);
      },
    },
  };
  </script>
  
  <style>
 .delete-btn-text{
    color: white !important;
    border-radius: 15px !important;
    background-color: #a61a11 !important;
    filter: drop-shadow(0.5px 0.5px 0.5px black) !important;
    z-index: 1 !important;
    text-transform: capitalize !important;
    margin: 0px !important;
    width: 75px !important;
    height: 40px !important;
  }
  </style>