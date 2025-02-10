import * as Location from "expo-location";

export const loadLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permissão para acesso à localização negada");
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
  } catch (error) {
    console.error("Erro ao obter localização:", error);
    throw new Error("Erro ao obter localização");
  }
};