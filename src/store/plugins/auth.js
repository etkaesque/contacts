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
      throw Error("Prisijungimas nepavyko. Neteisingas e. paštas arba slaptažodis.");
    }
  };
  store.adminRefresh = async () =>{
    try {
      const authData = await pb.collection('users').authRefresh({
        expand: "permissions_id"
      });
      return authData
    } catch {
      throw Error("Nepavyko atnaujinti administratoriaus duomenų.");
    }
  }
};

export default authAPI;