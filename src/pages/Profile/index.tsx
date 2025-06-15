import React, { useState } from "react";
import { Alert } from "react-native";
import {
  Container,
  Card,
  Title,
  Section,
  SectionTitle,
  Label,
  InputWrapper,
  StyledInput,
  Divider,
  ButtonArea,
  SubmitButton,
  SubmitButtonText,
} from "./styles";

export default function Profile() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [confirmarSenhaAtual, setConfirmarSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const handleChangePassword = async () => {
    if (senhaAtual !== confirmarSenhaAtual) {
      Alert.alert("Erro", "A confirmação da senha atual não confere.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/change-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "teste@email.com", // Troque pelo usuário logado
            senhaAtual,
            novaSenha,
          }),
        }
      );
      if (response.ok) {
        Alert.alert("Sucesso", "Senha alterada com sucesso!");
      } else {
        Alert.alert("Erro", "Não foi possível alterar a senha.");
      }
    } catch {
      Alert.alert("Erro", "Erro ao conectar com o servidor.");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Editar Perfil</Title>
        <Section>
          <SectionTitle>Editar Senha</SectionTitle>
          {/* Senha Atual */}
          <Label>Senha Atual</Label>
          <InputWrapper>
            <StyledInput
              placeholder="Senha Atual"
              placeholderTextColor="#888"
              secureTextEntry
              value={senhaAtual}
              onChangeText={setSenhaAtual}
            />
          </InputWrapper>
          {/* Confirmar Senha Atual */}
          <Label>Confirmar Senha Atual</Label>
          <InputWrapper>
            <StyledInput
              placeholder="Confirmar Senha Atual"
              placeholderTextColor="#888"
              secureTextEntry
              value={confirmarSenhaAtual}
              onChangeText={setConfirmarSenhaAtual}
            />
          </InputWrapper>
          {/* Nova Senha */}
          <Label>Nova Senha</Label>
          <InputWrapper>
            <StyledInput
              placeholder="Nova Senha"
              placeholderTextColor="#888"
              secureTextEntry
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
          </InputWrapper>
        </Section>
        <Divider />
        <ButtonArea>
          <SubmitButton onPress={handleChangePassword}>
            <SubmitButtonText>Atualizar</SubmitButtonText>
          </SubmitButton>
        </ButtonArea>
      </Card>
    </Container>
  );
}