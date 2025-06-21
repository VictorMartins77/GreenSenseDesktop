import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext"; // Importa o contexto de autenticação

interface Notification {
  id: string;
  titulo: string;
  mensagem: string;
  lida: boolean;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationModal({ visible, onClose }: NotificationModalProps) {
  const { token } = useAuth(); // Usa o token do contexto, igual ao EditUserModal
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Buscar notificações do backend ao abrir o modal
  useEffect(() => {
    if (visible) {
      fetch("http://localhost:8080/api/notificacoes", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setNotifications(
            data.map((n: any) => ({
              id: n.id,
              titulo: n.titulo,
              mensagem: n.mensagem,
              lida: n.lida,
            }))
          );
        })
        .catch(() => setNotifications([]));
    }
  }, [visible, token]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/notificacoes/${id}/ler`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
        );
      }
    } catch (e) {
      // Trate o erro se necessário
    }
  };

  if (!visible) return null;
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: 999,
      }}>
        <View style={{
          marginTop: 60,
          backgroundColor: "#23232b",
          borderRadius: 10,
          padding: 16,
          minWidth: 220,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 5
        }}>
          <Text style={{ color: "#b0b0b0", fontWeight: "bold", marginBottom: 8 }}>Notificações</Text>
          {notifications.map((notificacao) => (
            <View key={notificacao.id} style={{ marginBottom: 8 }}>
              <Text style={{ color: "#fff" }}>{notificacao.titulo}</Text>
              <Text style={{ color: "#b0b0b0" }}>{notificacao.mensagem}</Text>
              {!notificacao.lida && (
                <TouchableOpacity onPress={() => handleMarkAsRead(notificacao.id)}>
                  <Text style={{ color: "#44AA00" }}>Marcar como lida</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <View style={{ height: 1, backgroundColor: "#39393f", marginVertical: 8 }} />
          <Text style={{ color: "#b0b0b0", textAlign: "center" }}>Ver Todas</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}