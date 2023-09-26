import PocketBase from "pocketbase";

const pb = new PocketBase(SERVER_ADDR);

let contactsAPI = (store) => {
  store.fetchContactsFromDb = async () => {
    try {
      const contacts = await pb.collection("employees").getList(1, 10, {
        expand: "office_id",
      });
      return contacts;
    } catch (err) {
      throw Error("Failed to fetch data.");
    }
  };
  store.fetchContactByIdFromDb = async (id) => {
    try {
      const contact = await pb
        .collection("employees")
        .getFirstListItem(`id="${id}"`, {
          expand: `company_id,office_id,division_id,department_id`,
        });

      return contact;
    } catch {
      throw Error("Failed to fetch data.");
    }
  };

  store.fetchCompaniesFromDb = async () => {
    try {
      const companies = await pb.collection("companies").getFullList({
        sort: "-created",
      });

      return companies;
    } catch {
      throw Error("Failed to fetch data.");
    }
  };

  store.fetchDepartmentsFromDb = async () => {
    try {
      const departments = await pb.collection("departments").getFullList({
        sort: "-created",
      });
      return departments;
    } catch {
      throw Error("Failed to fetch data.");
    }
  };

  store.fetchDivisionsFromDb = async () => {
    try {
      const divisions = await pb.collection("divisions").getFullList({
        sort: "-created",
      });
      return divisions;
    } catch {
      throw Error("Failed to fetch data.");
    }
  };

  store.fetchOfficesFromDb = async () => {
    try {
      const offices = await pb.collection("offices").getFullList({
        sort: "-created",
      });
      return offices;
    } catch {
      throw Error("Failed to fetch data.");
    }
  };

  store.fetchGroupsFromDb = async () => {
    try {
      const groups = await pb.collection("groups").getFullList({
        sort: "-created",
      });
      return groups;
    } catch {
      throw Error("Failed to fetch data.");
    }
  };

  store.createContactInDb = async (data) => {
    try {
      const contact = await pb.collection("employees").create(data);
      return contact;
    } catch (ClientResponseError) {
      throw Error("Failed to create a new contact. Try again later.");
    }
  };

  store.editContactInDb = async (id, data) => {

    try {
      const contact = await pb.collection('employees').update(id, data);
      return contact;
    } catch (ClientResponseError) {
      throw Error("Failed to create a new contact. Try again later.");
    }

  }

};

export default contactsAPI;
