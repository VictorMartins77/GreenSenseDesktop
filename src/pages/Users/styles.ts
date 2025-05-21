import styled from "styled-components/native";

export const UsersContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 32px;
  background: transparent;
`;

export const UsersHeader = styled.View`
  width: 92%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

export const UsersTitle = styled.Text`
  color: #b0b0b0;
  font-size: 16px;
  font-weight: bold;
`;

export const NewUserButton = styled.TouchableOpacity`
  background: #44aa00;
  border-radius: 8px;
  padding: 8px 18px;
`;

export const NewUserButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;

export const SearchInput = styled.TextInput`
  background: transparent;
  border-radius: 8px;
  border-width: 1px;
  border-color: #39393f;
  color: #fff;
  padding: 8px 16px;
  min-width: 160px;
`;

export const UsersTable = styled.View`
  width: 92%;
  background: #23232b;
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
`;

export const TableHeader = styled.View`
  flex-direction: row;
  background: #23232b;
  border-bottom-width: 1px;
  border-bottom-color: #39393f;
  padding: 12px 0;
`;

export const TableRow = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #39393f;
  padding: 12px 0;
`;

export const TableCell = styled.Text`
  color: #fff;
  font-size: 14px;
  padding-left: 12px;
`;

export const TableActions = styled.View`
  flex-direction: row;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 4px;
`;