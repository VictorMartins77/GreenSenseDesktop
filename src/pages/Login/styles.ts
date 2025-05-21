import styled from "styled-components/native";

export const LoginContainer = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: row;
  background: #121214;
`;

export const LoginFormSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px 24px;
  background: #121214;
`;

export const Logo = styled.View`
  align-items: center;
  margin-bottom: 32px;
`;

export const LogoImage = styled.Image`
  width: 240px;
  height: 120px;
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  color: #b0b0b0;
  font-size: 16px;
  text-align: center;
`;

export const LoginForm = styled.View`
  width: 100%;
  max-width: 340px;
`;

export const FormGroup = styled.View`
  margin-bottom: 18px;
`;

export const Input = styled.TextInput`
  background: #202024;
  color: #fff;
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 16px;
  border-width: 1px;
  border-color: #39393f;
`;

export const SubmitButton = styled.TouchableOpacity`
  background: #44aa00;
  border-radius: 8px;
  padding: 14px 0;
  align-items: center;
  margin-top: 8px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const LoginImageSection = styled.View`
  flex: 1;
  background: #202024;
  align-items: center;
  justify-content: center;
`;

export const LoginImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;