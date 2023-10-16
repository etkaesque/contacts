<template>
  <div class="flex gap-x-5">
    <md-field class="field" ref="company_id">
      <label v-if="filterData.company_id != ''" for="company">Įmonė</label>
      <md-select
        v-model="filterData.company_id"
        name="company"
        id="company"
        @md-selected="handleCompany(filterData.company_id)"
      >
        <md-option :value="''">Filtruoti įmones...</md-option>
        <md-option v-for="company in companies" :value="company.id">{{
          company.name
        }}</md-option>
      </md-select>
    </md-field>

    <md-field class="field" ref="office_id">
      <label v-if="filterData.office_id != ''" for="office">Ofisas</label>
      <md-select
        v-model="filterData.office_id"
        name="office"
        id="office"
        @md-selected="handleOffice(filterData.office_id)"
      >
        <md-option class="optionLabels" :value="''">
          Filtruoti ofisus...
        </md-option>

        <md-option
          v-for="office in offices"
          :value="office.expand.office_id.id"
          >{{ office.expand.office_id.name }}</md-option
        >
      </md-select>
    </md-field>

    <md-field class="field" ref="division_id">
      <label v-if="filterData.division_id != ''" for="font">Padalinys</label>
      <md-select
        v-model="filterData.division_id"
        name="font"
        id="division"
        @input="handleDivisions(filterData.division_id)"
      >
        <md-option :value="''">Filtruoti padalinius...</md-option>
        <md-option
          v-for="division in divisions"
          :value="division.expand.division_id.id"
          >{{ division.expand.division_id.name }}</md-option
        >
      </md-select>
    </md-field>

    <md-field class="field" ref="department_id">
      <label v-if="filterData.department_id != ''" for="font">Skyrius</label>
      <md-select
        @input="handleDepartment(filterData.department_id)"
        v-model="filterData.department_id"
        name="department"
        id="department"
      >
        <md-option :value="''">Filtruoti skyrius...</md-option>
        <md-option
          v-for="department in departments"
          :value="department.expand.department_id.id"
          >{{ department.expand.department_id.name }}</md-option
        >
      </md-select>
    </md-field>

    <md-field class="field" ref="group_id">
      <label v-if="filterData.group_id != ''" for="font">Grupė</label>
      <md-select
        @input="handleGroup(filterData.group_id)"
        v-model="filterData.group_id"
        name="group"
        id="group"
      >
        <md-option :value="''">Filtruoti grupes...</md-option>

        <md-option v-for="group in groups" :value="group.expand.group_id.id">{{
          group.expand.group_id.name
        }}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      filterData: {
        company_id: "",
        office_id: "",
        division_id: "",
        department_id: "",
        group_id: "",
      },
      changedByCompany: false,
      changedByOffice: false,
      changedByDivision: false,
      changedByDepartment: false,
    };
  },
  computed: {
    ...mapGetters([
      "companies",
      "offices",
      "departments",
      "divisions",
      "groups",
      "searchTerm",
      "currentPage",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchContacts",
      "fetchCompanies",
      "fetchOfficeDivisions",
      "fetchCompanyOffices",
      "fetchDivisionDepartmens",
      "fetchDepartmentGroups",
    ]),
    ...mapMutations([
      "SET_OFFICES",
      "SET_GROUPS",
      "SET_DIVISIONS",
      "SET_DEPARTMENTS",
      "SET_FILTERS",
      "SET_CURRENT_PAGE",
    ]),
    async handleCompany(id) {
      if (this.filterData.office_id !== "") {
        this.changedByCompany = true;
        this.changedByOffice = true;
        this.changedByDivision = true;
        this.changedByDepartment = true;
      } else {
        this.changedByCompany = false;
        this.changedByOffice = false;
        this.changedByDivision = false;
        this.changedByDepartment = false;
      }

      this.filterData.office_id = "";
      this.filterData.division_id = "";
      this.filterData.department_id = "";
      this.filterData.group_id = "";

      this.SET_OFFICES();
      this.SET_GROUPS();
      this.SET_DIVISIONS();
      this.SET_DEPARTMENTS();
      this.SET_CURRENT_PAGE({page:1, isContact: true});
      this.SET_FILTERS(this.filterData);

      await this.fetchCompanyOffices(this.filterData.company_id);
      await this.fetchContacts({
        page: this.currentPage,
        searchTerm: this.searchTerm,
        filterData: this.filterData,
      });
    },
    async handleOffice(id) {
      if (this.changedByCompany) {
        this.changedByCompany = false;
        return;
      }

      if (this.filterData.division_id !== "") {
        this.changedByOffice = true;
        this.changedByDivision = true;
        this.changedByDepartment = true;
      } else {
        this.changedByOffice = false;
        this.changedByDivision = false;
        this.changedByDepartment = false;
      }

      this.filterData.division_id = "";
      this.filterData.department_id = "";
      this.filterData.group_id = "";

      this.SET_GROUPS();
      this.SET_DEPARTMENTS();
      this.SET_DIVISIONS();
      this.SET_CURRENT_PAGE({page:1, isContact: true});
      this.SET_FILTERS(this.filterData);

      await this.fetchOfficeDivisions(id);
      await this.fetchContacts({
        page: this.currentPage,
        searchTerm: this.searchTerm,
        filterData: this.filterData,
      });
    },
    async handleDivisions(id) {
      if (this.changedByCompany || this.changedByOffice) {
        this.changedByCompany = false;
        this.changedByOffice = false;
        return;
      }

      if (this.filterData.department_id !== "") {
        this.changedByDivision = true;
        this.changedByDepartment = true;
      } else {
        this.changedByDivision = false;
        this.changedByDepartment = false;
      }

      this.filterData.department_id = "";
      this.filterData.group_id = "";

      this.SET_GROUPS();
      this.SET_DEPARTMENTS();
      this.SET_CURRENT_PAGE({page:1, isContact: true});
      this.SET_FILTERS(this.filterData);

      await this.fetchDivisionDepartmens(id);
      await this.fetchContacts({
        page: this.currentPage,
        searchTerm: this.searchTerm,
        filterData: this.filterData,
      });
    },

    async handleDepartment(id) {
      if (
        this.changedByCompany ||
        this.changedByOffice ||
        this.changedByDivision
      ) {
        this.changedByCompany = false;
        this.changedByOffice = false;
        this.changedByDivision = false;
        return;
      }

      if (this.filterData.group_id !== "") {
        this.changedByDepartment = true;
      } else {
        this.changedByDepartment = false;
      }

      this.filterData.group_id = "";
      this.SET_GROUPS();
      this.SET_CURRENT_PAGE({page:1, isContact: true});
      this.SET_FILTERS(this.filterData);

      await this.fetchDepartmentGroups(id);
      await this.fetchContacts({
        page: this.currentPage,
        searchTerm: this.searchTerm,
        filterData: this.filterData,
      });
    },
    async handleGroup(id) {
      if (
        this.changedByCompany ||
        this.changedByOffice ||
        this.changedByDivision ||
        this.changedByDepartment
      ) {
        this.changedByCompany = false;
        this.changedByOffice = false;
        this.changedByDivision = false;
        this.changedByDepartment = false;
        return;
      }

      this.SET_FILTERS(this.filterData);
      this.SET_CURRENT_PAGE({page:1, isContact: true});

      await this.fetchContacts({
        page: this.currentPage,
        searchTerm: this.searchTerm,
        filterData: this.filterData,
      });
    },
  },
  created() {
    this.fetchCompanies();
  },
};
</script>

<style>
.field {
  width: 200px !important;
}
</style>
