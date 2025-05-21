import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import {
  UsersContainer,
  UsersHeader,
  UsersTitle,
  NewUserButton,
  NewUserButtonText,
  SearchInput,
  UsersTable,
  TableHeader,
  TableRow,
  TableCell,
  TableActions,
  ActionButton,
} from "./styles";
import eyeIcon from "../../assets/eye.png";
import editIcon from "../../assets/edit.png";
import trashIcon from "../../assets/trash-2.png";

const users = [
  { id: "001", email: "gabriel@gmail.com", categoria: "Administrador", telefone: "11 95846232" },
  { id: "001", email: "gabriel@gmail.com", categoria: "Administrador", telefone: "11 95846232" },
  { id: "001", email: "gabriel@gmail.com", categoria: "Administrador", telefone: "11 95846232" },
  { id: "001", email: "gabriel@gmail.com", categoria: "Administrador", telefone: "11 95846232" },
  { id: "001", email: "gabriel@gmail.com", categoria: "Administrador", telefone: "11 95846232" },
  { id: "001", email: "gabriel@gmail.com", categoria: "Administrador", telefone: "11 95846232" },
  { id: "001", email: "gabriel@gmail.com", categoria: "Administrador", telefone: "11 95846232" },
  { id: "001", email: "gabriel@gmail.com", categoria: "Administrador", telefone: "11 95846232" },
];

export default function UsersPage() {
  return (
    <UsersContainer>
      <UsersHeader>
        <UsersTitle>Gerenciamento de usuários</UsersTitle>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <NewUserButton>
            <NewUserButtonText>Novo Usuário</NewUserButtonText>
          </NewUserButton>
          <SearchInput placeholder="Procurar..." placeholderTextColor="#888" />
        </View>
      </UsersHeader>
      <UsersTable>
        <TableHeader>
          <TableCell style={{ flex: 0.7 }}>ID</TableCell>
          <TableCell style={{ flex: 2 }}>Email</TableCell>
          <TableCell style={{ flex: 1.5 }}>Categoria</TableCell>
          <TableCell style={{ flex: 1.5 }}>Telefone</TableCell>
          <TableCell style={{ flex: 1 }}>Ações</TableCell>
        </TableHeader>
        <ScrollView>
          {users.map((user, idx) => (
            <TableRow key={idx}>
              <TableCell style={{ flex: 0.7 }}>{user.id}</TableCell>
              <TableCell style={{ flex: 2 }}>{user.email}</TableCell>
              <TableCell style={{ flex: 1.5 }}>{user.categoria}</TableCell>
              <TableCell style={{ flex: 1.5 }}>{user.telefone}</TableCell>
              <TableActions style={{ flex: 1 }}>
                <ActionButton>
                  <Image source={eyeIcon} style={{ width: 18, height: 18, tintColor: "#b0b0b0" }} />
                </ActionButton>
                <ActionButton>
                  <Image source={editIcon} style={{ width: 18, height: 18, tintColor: "#b0b0b0" }} />
                </ActionButton>
                <ActionButton>
                  <Image source={trashIcon} style={{ width: 18, height: 18, tintColor: "#b0b0b0" }} />
                </ActionButton>
              </TableActions>
            </TableRow>
          ))}
        </ScrollView>
      </UsersTable>
    </UsersContainer>
  );
}