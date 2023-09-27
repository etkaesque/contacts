import PocketBase from "pocketbase";

const pb = new PocketBase(SERVER_ADDR);

let contactsAPI = (store) => {
  store.fetchContactsFromDb = async () => {
    try {
      const contacts = await pb.collection("employees").getList(1, 10, {
        expand: "office_id",
      });
      return contacts;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
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
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  };

  store.fetchCompaniesFromDb = async () => {
    try {
      const companies = await pb.collection("companies").getFullList({
        sort: "-created",
      });

      return companies;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  };

  store.fetchDepartmentsFromDb = async () => {
    try {
      const departments = await pb.collection("departments").getFullList({
        sort: "-created",
      });
      return departments;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  };

  store.fetchDivisionsFromDb = async () => {
    try {
      const divisions = await pb.collection("divisions").getFullList({
        sort: "-created",
      });
      return divisions;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  };

  store.fetchOfficesFromDb = async () => {
    try {
      const offices = await pb.collection("offices").getFullList({
        sort: "-created",
      });
      return offices;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  };

  store.fetchGroupsFromDb = async () => {
    try {
      const groups = await pb.collection("groups").getFullList({
        sort: "-created",
      });
      return groups;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  };

  store.createContactInDb = async (data) => {
    try {
      const contact = await pb.collection("employees").create(data);
      return contact;
    } catch {
      throw Error(`Kontaktas nebuvo sukurtas.`);
    }
  };

  store.editContactInDb = async (id, data) => {
    try {
      const contact = await pb.collection("employees").update(id, data);
      return contact;
    } catch {
      throw Error(`Kontaktas nebuvo redaguotas.`);
    }
  };

  store.deleteContactInDb = async (id) => {
    try {
      const contact = await pb.collection("employees").delete(id);
      return contact;
    } catch {
      throw Error(`Kontaktas nebuvo ištrintas.`);
    }
  };
};

export default contactsAPI;
