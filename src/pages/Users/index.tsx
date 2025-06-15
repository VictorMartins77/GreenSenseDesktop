import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
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
import { useAuth } from "../../context/AuthContext";
import EditUserModal from "../EditUser/index";
import NewUserModal from "../NewUser/index"; // importe o modal

interface Usuario {
  id: string;
  username: string;
  role: string;
}

export default function UsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState<Usuario[]>([]);
  const [search, setSearch] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newUserModalVisible, setNewUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8080/api/auth/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  // Função para deletar usuário
  const handleDeleteUser = async (id: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja deletar este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            const response = await fetch(`http://localhost:8080/api/auth/usuarios/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.ok || response.status === 204) {
              fetchUsers();
              Alert.alert("Sucesso", "Usuário deletado com sucesso!");
            } else {
              Alert.alert("Erro", "Não foi possível deletar o usuário.");
            }
          },
        },
      ]
    );
  };

  // Filtro de busca simples por email/username
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditPress = (user: Usuario) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleEditSave = () => {
    fetchUsers();
  };

  return (
    <UsersContainer>
      <UsersHeader>
        <UsersTitle>Gerenciamento de usuários</UsersTitle>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <NewUserButton onPress={() => setNewUserModalVisible(true)}>
            <NewUserButtonText>Novo Usuário</NewUserButtonText>
          </NewUserButton>
          <SearchInput
            placeholder="Procurar..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
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
          {filteredUsers.map((user, idx) => (
            <TableRow key={user.id}>
              <TableCell style={{ flex: 0.7 }}>{user.id}</TableCell>
              <TableCell style={{ flex: 2 }}>{user.username}</TableCell>
              <TableCell style={{ flex: 1.5 }}>
                {user.role === "ROLE_ADMIN" ? "Administrador" : "Operacional"}
              </TableCell>
              <TableCell style={{ flex: 1.5 }}>-</TableCell>
              <TableActions style={{ flex: 1 }}>
                <ActionButton onPress={() => handleEditPress(user)}>
                  <Image source={editIcon} style={{ width: 18, height: 18, tintColor: "#b0b0b0" }} />
                </ActionButton>
                <ActionButton onPress={() => handleDeleteUser(user.id)}>
                  <Image source={trashIcon} style={{ width: 18, height: 18, tintColor: "#b0b0b0" }} />
                </ActionButton>
              </TableActions>
            </TableRow>
          ))}
        </ScrollView>
      </UsersTable>
      {selectedUser && (
        <EditUserModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)} // Corrija aqui: use onClose
          user={selectedUser}
          onSave={handleEditSave}
        />
      )}
      <NewUserModal
        visible={newUserModalVisible}
        onClose={() => setNewUserModalVisible(false)}
        onSave={fetchUsers}
      />
    </UsersContainer>
  );
}