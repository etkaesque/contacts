<template>
    <div class="grid grid-auto-col grid-auto-rows w-full gap-x-8">
        <div class="w-full text-2xl col-start-1 col-span-4 row-start-1 row-end-2 h-10 flex justify-end">
            <dissmiss></dissmiss>
        </div>

        <div class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-center">

            <h2 class="text-2xl w-full mb-2 ml-9">Pridėti administratorių (-ę):</h2>

            <md-field :class="{ 'md-invalid': v$.formData.adminData.name.$error }">
                <md-icon>
                </md-icon>
                <label>Vardas</label>
                <md-input v-model="formData.adminData.name"></md-input>

                <div v-if="v$.formData.adminData.name.$error">
                    <span class="md-error ml-9">{{
                        v$.formData.adminData.name.$errors[0].$message
                    }}</span>
                </div>

            </md-field>

            <md-field :class="{ 'md-invalid': v$.formData.adminData.email.$error }">
                <md-icon>
                    <img :src="emailIcon" alt="email icon">
                </md-icon>
                <label>Elektroninis paštas</label>
                <md-input v-model="formData.adminData.email"></md-input>

                <div v-if="v$.formData.adminData.email.$error">
                    <span class="md-error ml-9">{{
                        v$.formData.adminData.email.$errors[0].$message
                    }}</span>
                </div>

            </md-field>

            <div class="fileLabelWrapper w-full ml-10 flex mt-4">
                <label class="fileLabel uppercase" for="photo">Įkelti nuotrauką</label>
                <input type="file" name="photo" id="photo" class="fileInput" @change="handlePhotoUpload($event)" />
                <div class="photoValidation">
                    <span style="color: #a61a11 !important" v-if="!isFilePhoto">
                        {{ validation.fileNotPhoto }}</span>
                    <span style="color: #a61a11 !important" v-else-if="isFileTooLarge">
                        {{ validation.fileTooLarge }}</span>
                    <span v-else>{{
                        photoSelected ? "Failas pasirinktas." : "Pasirinkite failą."
                    }}</span>
                </div>

            </div>

        </div>

        <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col gap-y-6">

            <h2 class="text-2xl w-full mb-2">Administracinės teisės:</h2>

            <label class="cl-checkbox">
                <input v-model="formData.permissionsData.edit_employees" type="checkbox">
                <span>Redaguoti ir kurti kontaktus</span>
            </label>

            <label class="cl-checkbox">
                <input v-model="formData.permissionsData.delete_employees" type="checkbox">
                <span>Trinti kontaktus</span>
            </label>

            <label class="cl-checkbox">
                <input v-model="formData.permissionsData.edit_companies" type="checkbox">
                <span>Redaguoti ir kurti įmones</span>
            </label>

            <label class="cl-checkbox ">
                <input v-model="formData.permissionsData.delete_companies" type="checkbox">
                <span>Trinti įmones</span>
            </label>

            <label class="cl-checkbox ">
                <input v-model="formData.permissionsData.edit_offices" type="checkbox">
                <span>Redaguoti ir kurti ofisus</span>
            </label>

            <label class="cl-checkbox ">
                <input v-model="formData.permissionsData.delete_offices" type="checkbox">
                <span>Trinti ofisus</span>
            </label>

            <label class="cl-checkbox">
                <input v-model="formData.permissionsData.edit_structure" type="checkbox">
                <span>Redaguoti ir kurti struktūras</span>
            </label>

            <label class="cl-checkbox">
                <input v-model="formData.permissionsData.delete_structure" type="checkbox">
                <span>Trinti struktūras</span>
            </label>


        </div>


        <button class="col-start-3 row-start-3 row-end-4 submitBtn  uppercase h-10" @click="handleSubmit()">
            Pridėti
        </button>



    </div>
</template>

<script>

import dissmiss from "../Buttons/dissmiss.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, alphaNum } from "@vuelidate/validators";
import emailIcon from "../../assets/email3.svg"
import { mapActions, mapGetters, mapMutations } from "vuex";


const emailExists = function (value) {
    return !this.emails.includes(value);
};

export default {
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            formData: {
                adminData: {
                    username: "",
                    email: "",
                    emailVisibility: true,
                    password: "",
                    passwordConfirm: "",
                    name: "",
                    permissions_id: "",
                    avatar: ""

                },
                permissionsData: {
                    edit_employees: false,
                    delete_employees: false,
                    edit_offices: false,
                    delete_offices: false,
                    edit_structure: false,
                    delete_structure: false,
                    read_permissions: true,
                    edit_permissions: false,
                    delete_permissions: false,
                    edit_companies: false,
                    delete_companies: false

                }
            },
            validation: {
                fieldEmpty: "Nepalikite tusčio lauko",
                emailInvalid: "Neteisingas e. pašto adresas",
                isTextValid: "Nenaudokite specialių simbolių",
                fileTooLarge: "Failo dydis neturi būti didesnis nei 5Mb.",
                fileNotPhoto:
                    "Neteisingas failo formatas. Pridėkite JPEG arba PNG failą.",
                emailExists: "Toks e. paštas jau egzistuoja."
            },

            photoValid: true,
            isFilePhoto: true,
            isFileTooLarge: false,
            photoSelected: false,
            emailIcon

        }
    },
    validations() {
        return {
            formData: {
                adminData: {
                    name: {
                        alphaNum: helpers.withMessage(this.validation.isTextValid, alphaNum),
                        required: helpers.withMessage(this.validation.fieldEmpty, required),
                    },
                    email: {
                        email: helpers.withMessage(this.validation.emailInvalid, email),
                        required: helpers.withMessage(this.validation.fieldEmpty, required),
                        emailExists: helpers.withMessage(this.validation.emailExists, emailExists),
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters(["emails", "totalItems"])
    },
    components: {
        dissmiss
    },
    methods: {
        generatePassword() {
            const length = 12;
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=';
            let password = '';

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }

            return password;
        },
        ...mapActions(["createAdmin"]),
        ...mapMutations(["CONTROL_MODAL"]),
        async handleSubmit() {

            let isFormCorrect = await this.v$.$validate();
            isFormCorrect = this.photoValid && isFormCorrect

            let password = this.generatePassword()
            this.formData.adminData.password = password
            this.formData.adminData.passwordConfirm = password


            if (!isFormCorrect) {
                return
            }

            await this.createAdmin({ adminData: this.formData.adminData, permissionsData: this.formData.permissionsData })
            this.CONTROL_MODAL();
        },
        handlePhotoUpload(event) {
            const allowedTypes = ["image/png", "image/jpeg"];
            const maxSize = 5 * 1024 * 1024;

            if (event.target.files.length > 0) {
                const selectedFile = event.target.files[0];

                if (!allowedTypes.includes(selectedFile.type)) {

                    this.isFilePhoto = false;
                    this.isFileTooLarge = false;
                    this.formData.adminData.avatar = "";
                    this.photoValid = false

                    return;
                }

                if (selectedFile.size > maxSize) {

                    this.isFileTooLarge = true;
                    this.isFilePhoto = true;
                    this.formData.adminData.avatar = "";
                    this.photoValid = false

                    return;
                }

                this.formData.adminData.avatar = selectedFile;
                this.isFileTooLarge = false;
                this.isFilePhoto = true;
                this.photoSelected = true;
                this.photoValid = true
            } else {

                this.photoSelected = false;
                this.isFileTooLarge = false;
                this.isFilePhoto = true;
                this.formData.adminData.avatar = "";
                this.photoValid = true
            }
        },
    },




}

</script>

<style scoped>
@import url("../../checkbox.css");


.fileLabel,
.submitBtn {
    padding: 10px 30px;
    background-color: #0054a6;
    color: white !important;
    border: none;
    cursor: pointer;
}

.submitBtn {
    margin-top: 10px;
}

.fileLabelWrapper {
    position: relative;
    width: 200px;
}

.fileInput {
    display: none;
}

.photoValidation {
    color: black;
    position: absolute;
    left: 40px;
    top: 50px !important;
    text-transform: initial;
    display: block;
    width: 150px !important;
}
</style>