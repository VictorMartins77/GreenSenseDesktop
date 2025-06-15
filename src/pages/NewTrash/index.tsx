import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../context/AuthContext"; // ajuste o caminho se necessário

const Overlay = styled.View`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.2);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.View`
  background: #23232b;
  border-radius: 10px;
  padding: 24px 20px 20px 20px;
  min-width: 300px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 5;
`;

const Title = styled.Text`
  color: #b0b0b0;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 18px;
`;

const Label = styled.Text`
  color: #b0b0b0;
  font-size: 14px;
  margin-bottom: 4px;
`;

const Input = styled.TextInput`
  background: #18181c;
  color: #fff;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 16px;
  border: 1px solid #39393f;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 8px 18px;
  border-radius: 8px;
  background: #39393f;
`;

const CancelButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const SaveButton = styled.TouchableOpacity`
  padding: 8px 18px;
  border-radius: 8px;
  background: #44AA00;
`;

const SaveButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

interface NewTrashModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export default function NewTrashModal({ visible, onClose, onSave }: NewTrashModalProps) {
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [capacidadeMaxima, setCapacidadeMaxima] = useState("");
  const [nivelAtual, setNivelAtual] = useState("");
  const [statusSensor, setStatusSensor] = useState(false);
  const [sensorId, setSensorId] = useState("");
  const { token } = useAuth(); // pega o token do contexto

  if (!visible) return null;

  const handleSave = async () => {
    if (!tipo || !endereco || !capacidadeMaxima) return;

    const lixeiraData = {
      tipo,
      endereco,
      capacidadeMaxima: parseInt(capacidadeMaxima, 10),
      nivelAtual: nivelAtual ? parseInt(nivelAtual, 10) : 0,
      statusSensor,
      sensorId: sensorId || null,
    };

    await fetch("http://localhost:8080/api/lixeiras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(lixeiraData),
    });

    Alert.alert("Sucesso", "Lixeira cadastrada com sucesso!");
    if (onSave) onSave(lixeiraData);
    handleClose();
  };

  const handleClose = () => {
    setTipo("");
    setEndereco("");
    setCapacidadeMaxima("");
    setNivelAtual("");
    setStatusSensor(false);
    setSensorId("");
    onClose();
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>Cadastrar Nova Lixeira</Title>
        <Label>Tipo</Label>
        <Input
          placeholder="Ex: Lixeira ou Caçamba"
          placeholderTextColor="#888"
          value={tipo}
          onChangeText={setTipo}
        />
        <Label>Endereço</Label>
        <Input
          placeholder="Endereço"
          placeholderTextColor="#888"
          value={endereco}
          onChangeText={setEndereco}
        />
        <Label>Capacidade Máxima</Label>
        <Input
          placeholder="Ex: 100"
          placeholderTextColor="#888"
          value={capacidadeMaxima}
          onChangeText={setCapacidadeMaxima}
          keyboardType="numeric"
        />
        <Label>Nível Atual</Label>
        <Input
          placeholder="Ex: 0"
          placeholderTextColor="#888"
          value={nivelAtual}
          onChangeText={setNivelAtual}
          keyboardType="numeric"
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
          placeholder="Opcional"
          placeholderTextColor="#888"
          value={sensorId}
          onChangeText={setSensorId}
        />
        <ButtonRow>
          <CancelButton onPress={handleClose}>
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