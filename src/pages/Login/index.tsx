import React, { useState } from "react";
import { Platform, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo.png";
import loginImg from "../../assets/login-image.png";
import {LoginContainer,LoginFormSection,Logo,LogoImage,Description,LoginForm,FormGroup,Input,SubmitButton,SubmitButtonText,LoginImageSection,LoginImage} from "./styles";

const { width } = Dimensions.get("window");

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Dashboard" as never);
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