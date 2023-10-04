import PocketBase from "pocketbase";

const pb = new PocketBase(SERVER_ADDR);

let authAPI = (store) => {
  store.adminLogin = async (email, password) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password, {
          expand: "permissions_id",
        });
      return authData;
    } catch {
      throw Error("Prisijungimas nepavyko.");
    }
  };
};

export default authAPI;
