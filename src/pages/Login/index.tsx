import React, { useState } from "react";
import { Platform, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo.png";
import loginImg from "../../assets/login-image.png";
import { useAuth } from "../../context/AuthContext";
import {LoginContainer,LoginFormSection,Logo,LogoImage,Description,LoginForm,FormGroup,Input,SubmitButton,SubmitButtonText,LoginImageSection,LoginImage} from "./styles";

const { width } = Dimensions.get("window");

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, senha: password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token); // Salva o token no contexto
        navigation.navigate("Dashboard" as never);
      } else {
        Alert.alert("E-mail ou senha inválidos.");
      }
    } catch (error) {
      Alert.alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <LoginContainer behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <LoginFormSection>
        <Logo>
          <LogoImage source={logoImg} />
          <Description>
            Aplicação de gerenciamento do GreenSense
          </Description>
        </Logo>
        <LoginForm>
          <FormGroup>
            <Input
              placeholder="E-mail"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Senha"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </FormGroup>
          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>Entrar</SubmitButtonText>
          </SubmitButton>
        </LoginForm>
      </LoginFormSection>
      {width >= 768 && (
        <LoginImageSection>
          <LoginImage source={loginImg} />
        </LoginImageSection>
      )}
    </LoginContainer>
  );
}