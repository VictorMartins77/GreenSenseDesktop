// EditUserModal.tsx
import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";

interface Usuario {
  id: string;
  username: string;
  role: string;
}

interface EditUserModalProps {
  visible: boolean;
  user: Usuario | null;
  onClose: () => void;
  onSave: () => void;
}

export default function EditUserModal({ visible, user, onClose, onSave }: EditUserModalProps) {
  const { token } = useAuth();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("ROLE_OPERACIONAL");
  const [showRoleOptions, setShowRoleOptions] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRole(user.role);
    }
  }, [user, visible]);

  if (!visible || !user) return null;

  const handleSave = async () => {
    const response = await fetch(`http://localhost:8080/api/auth/usuarios/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...user, username, role }),
    });
    if (response.ok) {
      onSave();
      onClose();
    }
  };

  return (
    <View style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "#0008",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    }}>
      <View style={{ backgroundColor: "#222", padding: 24, borderRadius: 12, width: 320 }}>
        <Text style={{ color: "#fff", fontSize: 18, marginBottom: 12 }}>Editar Usuário</Text>
        <TextInput
          style={{ backgroundColor: "#333", color: "#fff", marginBottom: 12, borderRadius: 6, padding: 10 }}
          value={username}
          onChangeText={setUsername}
          placeholder="E-mail"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          onPress={() => setShowRoleOptions(!showRoleOptions)}
          style={{
            backgroundColor: "#333",
            borderRadius: 6,
            padding: 10,
            marginBottom: 12,
          }}
        >
          <Text style={{ color: "#fff" }}>
            {role === "ROLE_ADMIN" ? "Administrador" : "Operacional"}
          </Text>
        </TouchableOpacity>
        {showRoleOptions && (
          <View style={{
            backgroundColor: "#444",
            borderRadius: 6,
            marginBottom: 12,
            paddingVertical: 4,
          }}>
            <TouchableOpacity
              onPress={() => {
                setRole("ROLE_ADMIN");
                setShowRoleOptions(false);
              }}
              style={{ padding: 10 }}
            >
              <Text style={{ color: "#fff" }}>Administrador</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRole("ROLE_OPERACIONAL");
                setShowRoleOptions(false);
              }}
              style={{ padding: 10 }}
            >
              <Text style={{ color: "#fff" }}>Operacional</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
            <Text style={{ color: "#fff" }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={{ color: "#44AA00", fontWeight: "bold" }}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}