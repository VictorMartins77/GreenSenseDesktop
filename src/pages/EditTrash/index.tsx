import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../context/AuthContext";

const Overlay = styled.View`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBox = styled.View`
  background: #222;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Label = styled.Text`
  color: #b0b0b0;
  margin-bottom: 4px;
`;

const Input = styled.TextInput`
  background: #333;
  color: #fff;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 12px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 12px;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 10px 18px;
  margin-right: 8px;
  background: #444;
  border-radius: 6px;
`;

const CancelButtonText = styled.Text`
  color: #fff;
`;

const SaveButton = styled.TouchableOpacity`
  padding: 10px 18px;
  background: #44AA00;
  border-radius: 6px;
`;

const SaveButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

interface EditTrashModalProps {
  visible: boolean;
  lixeira: {
    id: string;
    tipo: string;
    endereco: string;
    capacidadeMaxima: number;
    nivelAtual: number;
    statusSensor: boolean;
    sensorId: string | null;
  } | null;
  onClose: () => void;
  onSave: () => void;
}

export default function EditTrashModal({ visible, lixeira, onClose, onSave }: EditTrashModalProps) {
  const { token } = useAuth();
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [capacidadeMaxima, setCapacidadeMaxima] = useState("");
  const [nivelAtual, setNivelAtual] = useState("");
  const [statusSensor, setStatusSensor] = useState(false);
  const [sensorId, setSensorId] = useState("");

  useEffect(() => {
    if (lixeira) {
      setTipo(lixeira.tipo);
      setEndereco(lixeira.endereco);
      setCapacidadeMaxima(String(lixeira.capacidadeMaxima));
      setNivelAtual(String(lixeira.nivelAtual));
      setStatusSensor(lixeira.statusSensor);
      setSensorId(lixeira.sensorId || "");
    }
  }, [lixeira, visible]);

  if (!visible || !lixeira) return null;

  const handleSave = async () => {
    const updatedLixeira = {
      tipo,
      endereco,
      capacidadeMaxima: parseInt(capacidadeMaxima, 10),
      nivelAtual: nivelAtual ? parseInt(nivelAtual, 10) : 0,
      statusSensor,
      sensorId: sensorId || null,
    };

    const response = await fetch(`http://localhost:8080/api/lixeiras/${lixeira.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedLixeira),
    });

    if (response.ok) {
      Alert.alert("Sucesso", "Lixeira editada com sucesso!");
      onSave();
      onClose();
    } else {
      Alert.alert("Erro ao editar", "Não foi possível editar a lixeira.");
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>Editar Lixeira</Title>
        <Label>Tipo</Label>
        <Input
          value={tipo}
          onChangeText={setTipo}
          placeholder="Tipo"
          placeholderTextColor="#888"
        />
        <Label>Endereço</Label>
        <Input
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Endereço"
          placeholderTextColor="#888"
        />
        <Label>Capacidade Máxima</Label>
        <Input
          value={capacidadeMaxima}
          onChangeText={setCapacidadeMaxima}
          keyboardType="numeric"
          placeholder="Capacidade Máxima"
          placeholderTextColor="#888"
        />
        <Label>Nível Atual</Label>
        <Input
          value={nivelAtual}
          onChangeText={setNivelAtual}
          keyboardType="numeric"
          placeholder="Nível Atual"
          placeholderTextColor="#888"
        />
        <Label>Status do Sensor</Label>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => setStatusSensor(!statusSensor)}
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: "#44AA00",
              backgroundColor: statusSensor ? "#44AA00" : "transparent",
              marginRight: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Text style={{ color: "#b0b0b0" }}>{statusSensor ? "Ativo" : "Inativo"}</Text>
        </View>
        <Label>ID do Sensor</Label>
        <Input
          value={sensorId}
          onChangeText={setSensorId}
          placeholder="ID do Sensor"
          placeholderTextColor="#888"
        />
        <ButtonRow>
          <CancelButton onPress={onClose}>
            <CancelButtonText>Cancelar</CancelButtonText>
          </CancelButton>
          <SaveButton onPress={handleSave}>
            <SaveButtonText>Salvar</SaveButtonText>
          </SaveButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}