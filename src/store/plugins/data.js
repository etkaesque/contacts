import PocketBase from "pocketbase";

const pb = new PocketBase(SERVER_ADDR);

let contactsAPI = (store) => {
  store.fetchContactsFromDb = async () => {
    try {

      const contacts = await pb.collection("employees").getList(1, 10, {
        expand: "office_id",
      });
      return contacts;
    } catch(err) {
      console.log(err)
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
    } catch(err) {
      console.log(err)
      throw Error("Failed to fetch data.");
    }
  };
};

export default contactsAPI;
