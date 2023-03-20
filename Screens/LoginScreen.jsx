import React, { useState } from "react";
import {
  StyleSheet,
  Keyboard,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ isShowKeyboard, setIsShowKeyboard }) => {
  const [state, setState] = useState(initialState);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isFocusInput, setIsFocusInput] = useState({
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
    console.log(state);
  };

  return (
    <View
      style={{ ...styles.container, marginBottom: isShowKeyboard ? 240 : 200 }}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Увійти</Text>
        <View style={styles.inputwrap}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: isFocusInput.email ? "#FF6C00" : "#F6F6F6",
              backgroundColor: isFocusInput.email ? "#FFFFFF" : "#F6F6F6",
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
              borderColor: isFocusInput.password ? "#FF6C00" : "#F6F6F6",
              backgroundColor: isFocusInput.password ? "#FFFFFF" : "#F6F6F6",
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
          <Text style={styles.registerBtnText}>Увійти</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink} activeOpacity={0.8}>
          <Text style={styles.loginLinkText}>
            Немає облікового запису? Зареєструватись
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
    height: 590,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 32,
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
export default LoginScreen;
