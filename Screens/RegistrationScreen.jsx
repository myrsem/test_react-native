import React, { useState } from "react";
import {
  StyleSheet,
  Keyboard,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [image, setImage] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isFocusInput, setIsFocusInput] = useState({
    username: false,
    email: false,
    password: false,
  });



  const managePasswordVisibility = () => {
    if (passwordVisibility) {
      setPasswordVisibility(false);
    } else setPasswordVisibility(true);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setState(initialState);
    setImage(null);
    console.log(state);
    console.log(image);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  return (
    <View
      style={{ ...styles.container, marginBottom: isShowKeyboard ? 400 : 240 }}
    >
      <View style={styles.form}>
        <View style={styles.wrap}>
          <View style={styles.avatar}>
            {image ? (
              <TouchableOpacity onPress={deleteImage} style={styles.deleteBtn} activeOpacity={0.8}>
                <Image source={require("../assets/images/delete.png")} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pickImage} style={styles.btn} activeOpacity={0.8}>
                <Image source={require("../assets/images/add.png")} />
              </TouchableOpacity>
            )}
            {image && <Image style={styles.image} source={{ uri: image }} />}
          </View>
        </View>
        <Text style={styles.title}>Реєстрація</Text>
        <View style={styles.inputwrap}>
        <TextInput
          style={{
            ...styles.input,
            borderColor: isFocusInput.username
              ? "#FF6C00"
              : "#F6F6F6",
            backgroundColor: isFocusInput.username
              ? "#FFFFFF"
              : "#F6F6F6",
          }}
          placeholder="Логін"
          placeholderTextColor="#BDBDBD"
          value={state.username}
          onFocus={() => {
            setIsShowKeyboard(true),
              setIsFocusInput({
                ...isFocusInput,
                username: true,
              });
          }}
          onBlur={() => {
            setIsFocusInput({
              ...isFocusInput,
              username: false,
            });
          }}
          onChangeText={(value) =>
            setState((prevState) => ({
              ...prevState,
              username: value,
            }))
          }
        />
        <TextInput
         style={{
          ...styles.input,
          borderColor: isFocusInput.email
            ? "#FF6C00"
            : "#F6F6F6",
          backgroundColor: isFocusInput.email
            ? "#FFFFFF"
            : "#F6F6F6",
        }}
          placeholder="Email"
          placeholderTextColor="#BDBDBD"
          value={state.email}
          onFocus={() => {
            setIsShowKeyboard(true),
              setIsFocusInput({
                ...isFocusInput,
                email: true,
              });
          }}
          onBlur={() => {
            setIsFocusInput({
              ...isFocusInput,
              email: false,
            });
          }}
          onChangeText={(value) =>
            setState((prevState) => ({
              ...prevState,
              email: value,
            }))
          }
        />
        <TextInput
            style={{
              ...styles.input,
              borderColor: isFocusInput.password
                ? "#FF6C00"
                : "#F6F6F6",
              backgroundColor: isFocusInput.password
                ? "#FFFFFF"
                : "#F6F6F6",
            }}
          placeholder="Пароль"
          placeholderTextColor="#BDBDBD"
          secureTextEntry={passwordVisibility}
          value={state.password}
          onFocus={() => {
            setIsShowKeyboard(true),
              setIsFocusInput({
                ...isFocusInput,
                password: true,
              });
          }}
          onBlur={() => {
            setIsFocusInput({
              ...isFocusInput,
              password: false,
            });
          }}
          onChangeText={(value) =>
            setState((prevState) => ({
              ...prevState,
              password: value,
            }))
          }
        />
        {state.password && (
          <TouchableOpacity
            style={styles.passwordShow}
            onPress={managePasswordVisibility}
            activeOpacity={0.8}
          >
            {passwordVisibility ? (
              <Text style={styles.passwordShowText}>Показати</Text>
            ) : (
              <Text style={styles.passwordShowText}>Заховати</Text>
            )}
          </TouchableOpacity>
        )}
        </View>
        <TouchableOpacity
          style={styles.registerBtn}
          activeOpacity={0.8}
          onPress={keyboardHide}
        >
          <Text style={styles.registerBtnText}>Зареєструватися</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          activeOpacity={0.8}
        >
          <Text style={styles.loginLinkText}>
          Вже є обліковий запис? Увійти
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  form: {
    position: "relative",
    height: 650,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  wrap: {
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btn: {
    position: "absolute",
    zIndex: 1,
    top: 80,
    left: 105,
    width: 25,
    height: 25,
  },
  deleteBtn: {
    position: "absolute",
    zIndex: 1,
    top: 77,
    left: 101,
    width: 25,
    height: 25,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
    marginBottom: 32,
  },
  inputwrap: {
    gap: 16,
  },
  input: {
    height: 50,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  passwordShow: {
    top: -50,
    left: 290,
  },
  passwordShowText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  registerBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    marginHorizontal: 16,
    marginTop: 43,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  registerBtnText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  loginLink: {
    alignItems: "center",
  },
  loginLinkText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default RegistrationScreen;
