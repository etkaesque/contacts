import PocketBase from "pocketbase";

const pb = new PocketBase(SERVER_ADDR);
const perPage = CONTACTS_PER_PAGE;

let contactsAPI = (store) => {
  store.fetchContactsFromDb = async (page, searchTerm, filterData) => {
    let filter = "";
    let termFilter = "";
    let structureFilter = "";

    const words = searchTerm.split(" ");
    let params = ["name", "surname", "phone_number", "email"];

    if (searchTerm != "") {
      for (let w = 0; w < words.length; w++) {
        for (let p = 0; p < params.length; p++) {
          if (p == 0) {
            termFilter += `(`;
          }
          termFilter += `${params[p]}~"%${words[w]}%"`;
          if (p !== params.length - 1) {
            termFilter += `||`;
          } else {
            termFilter += `)`;
          }
        }
        if (w !== words.length - 1) {
          termFilter += `&&`;
        }
      }
    }

    if (termFilter !== "") {
      termFilter = `(${termFilter})`;
    }

    if (filterData.company_id) {
      structureFilter += `company_id="${filterData.company_id}"`;
    }

    if (filterData.office_id) {
      structureFilter += ` && office_id="${filterData.office_id}"`;
    }

    if (filterData.division_id) {
      structureFilter += ` && division_id="${filterData.division_id}"`;
    }

    if (filterData.department_id) {
      structureFilter += ` && department_id="${filterData.department_id}"`;
    }

    if (filterData.group_id) {
      structureFilter += ` && group_id="${filterData.group_id}"`;
    }

    if (structureFilter.length != 0 && termFilter !== "") {
      filter = `${termFilter}&&(${structureFilter})`;
    } else if (structureFilter.length != 0) {
      filter = structureFilter;
    } else if (termFilter !== "") {
      filter = termFilter;
    }

    try {
      const contacts = await pb.collection("employees").getList(page, perPage, {
        expand: "office_id",
        filter,
      });

      return contacts;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  };
  store.fetchInstanceByIdFromDb = async (id, collection, query) => {
    try {
      const instance = await pb
        .collection(collection)
        .getFirstListItem(`id="${id}"`, query);
      return instance;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  };
  store.getFullList = async (collection, query) => {
    try {
      let records = await pb.collection(collection).getFullList(query);
      return records;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  };
  (store.getPaginatedList = async (collection, page) => {
    try {
      const records = await pb.collection(collection).getList(page, perPage);
      return records;
    } catch {
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  }),
    (store.createInstanceInDb = async (data, collection) => {
      try {
        const instance = await pb.collection(collection).create(data);
        return instance;
      } catch {
        throw Error;
      }
    });
  store.editInstanceInDb = async (id, data, collection) => {
    try {
      const instance = await pb.collection(collection).update(id, data);
      return instance;
    } catch {
      throw Error;
    }
  };
  store.deleteInstanceInDb = async (id, collection) => {
    try {
      const instance = await pb.collection(collection).delete(id);
      return instance;
    } catch (ClientResponseErr) {
      throw Error(ClientResponseErr.status);
    }
  };
  store.createRelation = async (collection, data) => {
    try {
      const relation = await pb
        .collection(collection)
        .create(data, { requestKey: null });
      return relation;
    } catch (error) {
      throw Error;
    }
  };
  store.fetchRelationFromDb = async (id, collection, type) => {
    try {
      let filter = `${type}="${id}"`;
      const relations = await pb
        .collection(collection)
        .getList(1, 50, { filter });
      return relations;
    } catch {
      throw Error;
    }
  };
  store.deleteRelationInDb = async (id, collection) => {
    try {
      const relation = await pb
        .collection(collection)
        .delete(id, { requestKey: null });
      return relation;
    } catch (error) {
      throw Error;
    }
  };
};

export default contactsAPI;
