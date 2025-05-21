import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px;
  background: #121214;
`;

export const Card = styled.View`
  width: 370px;
  background: #23232b;
  border-radius: 16px;
  padding: 0px;
  margin-top: 24px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 5;
  overflow: hidden;
`;

export const Title = styled.Text`
  color: #fff;
  font-weight: bold;
  margin: 20px;
  margin-bottom: 0px;
  font-size: 18px;
`;

export const Section = styled.View`
  background: #2d2d35;
  padding: 20px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const SectionTitle = styled.Text`
  color: #b0b0b0;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const Label = styled.Text`
  color: #b0b0b0;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: bold;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background: #202024;
  border-radius: 20px;
  border-width: 1px;
  border-color: #39393f;
  padding-horizontal: 12px;
  padding-vertical: 0px;
  margin-bottom: 14px;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  color: #fff;
  padding-vertical: 10px;
  font-size: 15px;
  background: transparent;
`;

export const Divider = styled.View`
  height: 2px;
  background: #39393f;
`;

export const ButtonArea = styled.View`
  align-items: center;
  padding: 18px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background: #44aa00;
  border-radius: 8px;
  padding-vertical: 10px;
  padding-horizontal: 48px;
  min-width: 120px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
`;