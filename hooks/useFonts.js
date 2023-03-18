import * as Font from "expo-font";

const useFonts = async () => {
   await Font.loadAsync({
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
      });
}

export default useFonts;