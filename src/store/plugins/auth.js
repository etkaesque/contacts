import PocketBase from "pocketbase";

const pb = new PocketBase(SERVER_ADDR);

let authAPI = (store) => {
  store.adminLogin = async (email, password) => {
    try {
      console.log(email, password);
      const authData = await pb
        .collection("users")
        .authWithPassword(email,password);

      return authData;
    } catch (err) {
      console.log(err);
      throw Error("Failed to fetch data.");
    }
  };
};

export default authAPI;
