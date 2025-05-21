import React from "react";
import {Container,Card,Title,Section,SectionTitle,Label,InputWrapper,StyledInput,Divider,ButtonArea,SubmitButton,SubmitButtonText} from "./styles";

export default function Profile() {
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
            />
          </InputWrapper>
          {/* Confirmar Senha Atual */}
          <Label>Confirmar Senha Atual</Label>
          <InputWrapper>
            <StyledInput
              placeholder="Confirmar Senha Atual"
              placeholderTextColor="#888"
              secureTextEntry
            />
          </InputWrapper>
          {/* Nova Senha */}
          <Label>Nova Senha</Label>
          <InputWrapper>
            <StyledInput
              placeholder="Nova Senha"
              placeholderTextColor="#888"
              secureTextEntry
            />
          </InputWrapper>
        </Section>
        <Divider />
        <ButtonArea>
          <SubmitButton>
            <SubmitButtonText>Atualizar</SubmitButtonText>
          </SubmitButton>
        </ButtonArea>
      </Card>
    </Container>
  );
}