import PocketBase from "pocketbase";

const pb = new PocketBase(SERVER_ADDR);

let contactsAPI = (store) => {
  (store.fetchContactsFromDb = async (page, searchTerm, filterData) => {
    const perPage = CONTACTS_PER_PAGE;
    let filter = "";
    let termFilter = "";
    let structureFilter = "";

    const words = searchTerm.split(" ");
    let params = ["name", "surname", "phone_number", "email"];

    
    for (let w = 0; w < words.length; w++) {
      for (let p = 0; p < params.length; p++) {
        termFilter += `${params[p]}~"${words[w]}%"`;

        if (p !== words.length - 1) {
          termFilter += `||`;
        }

      }

      if (w !== params.length - 1) {
        termFilter += `&&`;
      }
    }

    if (termFilter !== "") {

      termFilter = `(${termFilter})`;
    }


    console.log("termfilter",termFilter)

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
      console.log("CALLING IT, with this filter", filter);
      const contacts = await pb.collection("employees").getList(page, perPage, {
        expand: "office_id",
        filter,
      });
      return contacts;
    } catch (err) {
      console.log(err);
      throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
    }
  }),
    (store.fetchContactByIdFromDb = async (id) => {
      try {
        const contact = await pb
          .collection("employees")
          .getFirstListItem(`id="${id}"`, {
            expand: `company_id,office_id,division_id,department_id,group_id`,
          });

        return contact;
      } catch {
        throw Error(`Nėra kontakto su serveriu. Bandykite vėliau.`);
      }
    });

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

  store.getFullList = async (collection, query) => {
    try {
      let records = await pb.collection(collection).getFullList(query);

      return records;
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
