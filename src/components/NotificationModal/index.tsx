import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationModal({ visible, onClose }: NotificationModalProps) {
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
          <Text style={{ color: "#fff", marginBottom: 8 }}>Caçamba #cb00644 está com nível alto de lixo.</Text>
          <View style={{ height: 1, backgroundColor: "#39393f", marginVertical: 8 }} />
          <Text style={{ color: "#b0b0b0", textAlign: "center" }}>Ver Todas</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}