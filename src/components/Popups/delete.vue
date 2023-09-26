<template>
    <div class="overlay">

        <div class="deletePopUp">
            <div class="h-5/6">
                <h2>Ar tikrai norite ištrinti kontaktą?</h2>
                <p>
                    Vardas ir pavardė: {{ name }} {{ surname }} <br>
                    Pozicija: {{ position }}
                </p>
            </div>

            <div class="flex flex-end">

                <button class="text-teltonikaBlue uppercase" @click="handleDelete">Taip</button>
                <button class="text-teltonikaBlue uppercase" @click="dismiss">Ne</button>

            </div>

        </div>

    </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            name: "",
            surname: "",
            position: ""
        }
    },
    computed: {
        ...mapGetters(["activeContact", "contact"])
    },
    methods: {
        ...mapActions(["fetchContactById"]),
        ...mapMutations(["CONTROL_DELETE"]),
        dismiss() {
            this.CONTROL_DELETE()
        },
        handleDelete(){
            console.log("delete")
        }

    },
    async created() {
       await  this.fetchContactById(this.activeContact)
        this.name = this.contact.name
        this.surname = this.contact.surname
        this.position = this.contact.position
    }

}

</script>

<style>
.deletePopUp {
    min-width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f7f4f4;
    padding: 30px 80px !important;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
}
</style>