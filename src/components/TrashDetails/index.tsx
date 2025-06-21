import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";

interface Lixeira {
  id: string;
  tipo: string;
  endereco: string;
  capacidadeMaxima: number;
  nivelAtual: number;
  statusSensor: boolean;
  sensorId: string | null;
  dataCadastro: string;
}

interface Revisao {
  id: number;
  descricao: string;
  status: string;
  nomeUsuario: string;
  lixeiraId: string;
}

interface MaterialColetado {
  id: number;
  tipo: string;
  quantidade: number;
  unidade: string;
  nomeUsuario: string;
  dataRegistro: string;
}

interface LixeiraDetalhesModalProps {
  visible: boolean;
  lixeira: Lixeira | null;
  onClose: () => void;
}

export default function TrashDetails({ visible, lixeira, onClose }: LixeiraDetalhesModalProps) {
  const { token } = useAuth();
  const [revisoes, setRevisoes] = useState<Revisao[]>([]);
  const [descricao, setDescricao] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editDescricao, setEditDescricao] = useState("");

  // Material coletado states
  const [materiais, setMateriais] = useState<MaterialColetado[]>([]);
  const [novoMaterial, setNovoMaterial] = useState({
    tipo: "",
    quantidade: "",
    unidade: "",
  });
  const [loadingMaterial, setLoadingMaterial] = useState(false);

  // Estados para edição de material coletado
  const [editMaterialId, setEditMaterialId] = useState<number | null>(null);
  const [editMaterial, setEditMaterial] = useState({
    tipo: "",
    quantidade: "",
    unidade: "",
  });

  // Buscar revisões da lixeira ao abrir o modal
  useEffect(() => {
    if (visible && lixeira) {
      fetch(`http://localhost:8080/api/revisao`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setRevisoes(data.filter((r: Revisao) => r.lixeiraId === lixeira.id)))
        .catch(() => setRevisoes([]));
    }
  }, [visible, lixeira, token]);

  // Buscar materiais coletados ao abrir o modal
  useEffect(() => {
    if (visible && lixeira) {
      setLoadingMaterial(true);
      fetch(`http://localhost:8080/api/material/lixeira/${lixeira.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMateriais(data))
        .catch(() => setMateriais([]))
        .finally(() => setLoadingMaterial(false));
    }
  }, [visible, lixeira, token]);

  // Criar revisão
  const handleAddRevisao = async () => {
    if (!descricao.trim() || !lixeira) return;
    try {
      const response = await fetch("http://localhost:8080/api/revisao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao,
          status: "ABERTO",
          nomeUsuario: "Usuário", // valor fixo
          lixeiraId: lixeira.id,
        }),
      });
      if (response.ok) {
        setDescricao("");
        const nova = await response.json();
        setRevisoes((prev) => [...prev, nova]);
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Erro", errorData.error || "Não foi possível criar a revisão.");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível criar a revisão.");
    }
  };

  // Atualizar revisão
  const handleUpdateRevisao = async (id: number) => {
    if (!editDescricao.trim() || !lixeira) return;
    try {
      const response = await fetch(`http://localhost:8080/api/revisao/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao: editDescricao,
          status: "ABERTO",
          nomeUsuario: "Usuário", // valor fixo
          lixeiraId: lixeira.id,
        }),
      });
      if (response.ok) {
        setEditId(null);
        setEditDescricao("");
        setRevisoes((prev) =>
          prev.map((r) => (r.id === id ? { ...r, descricao: editDescricao } : r))
        );
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Erro", errorData.error || "Não foi possível atualizar a revisão.");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar a revisão.");
    }
  };

  // Deletar revisão
  const handleDeleteRevisao = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/revisao/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setRevisoes((prev) => prev.filter((r) => r.id !== id));
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Erro", errorData.error || "Não foi possível deletar a revisão.");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível deletar a revisão.");
    }
  };

  // CRUD Material Coletado
  const handleAddMaterial = async () => {
    if (
      !novoMaterial.tipo.trim() ||
      !novoMaterial.quantidade.trim() ||
      !novoMaterial.unidade.trim() ||
      !lixeira
    ) {
      Alert.alert("Preencha todos os campos do material!");
      return;
    }
    setLoadingMaterial(true);
    try {
      const response = await fetch("http://localhost:8080/api/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tipo: novoMaterial.tipo,
          quantidade: parseFloat(novoMaterial.quantidade),
          unidade: novoMaterial.unidade,
          nomeUsuario: "Usuário", // valor fixo igual revisão
          lixeiraId: lixeira.id,
        }),
      });
      if (response.ok) {
        setNovoMaterial({ tipo: "", quantidade: "", unidade: "" });
        // Atualiza lista
        fetch(`http://localhost:8080/api/material/lixeira/${lixeira.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setMateriais(data));
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Erro", errorData.error || "Não foi possível registrar o material.");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível registrar o material.");
    }
    setLoadingMaterial(false);
  };

  const handleDeleteMaterial = async (id: number) => {
    setLoadingMaterial(true);
    try {
      const response = await fetch(`http://localhost:8080/api/material/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setMateriais((prev) => prev.filter((m) => m.id !== id));
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Erro", errorData.error || "Não foi possível deletar o material.");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível deletar o material.");
    }
    setLoadingMaterial(false);
  };

  // Editar material coletado
  const handleEditMaterial = (material: MaterialColetado) => {
    setEditMaterialId(material.id);
    setEditMaterial({
      tipo: material.tipo,
      quantidade: String(material.quantidade),
      unidade: material.unidade,
    });
  };

  const handleUpdateMaterial = async (id: number) => {
    if (
      !editMaterial.tipo.trim() ||
      !editMaterial.quantidade.trim() ||
      !editMaterial.unidade.trim() ||
      !lixeira
    ) {
      Alert.alert("Preencha todos os campos do material!");
      return;
    }
    setLoadingMaterial(true);
    try {
      const response = await fetch(`http://localhost:8080/api/material/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tipo: editMaterial.tipo,
          quantidade: parseFloat(editMaterial.quantidade),
          unidade: editMaterial.unidade,
          nomeUsuario: "Usuário", // valor fixo igual ao cadastro
          lixeiraId: lixeira.id,
        }),
      });
      if (response.ok) {
        setEditMaterialId(null);
        setEditMaterial({ tipo: "", quantidade: "", unidade: "" });
        // Atualiza lista
        fetch(`http://localhost:8080/api/material/lixeira/${lixeira.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setMateriais(data));
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Erro", errorData.error || "Não foi possível atualizar o material.");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o material.");
    }
    setLoadingMaterial(false);
  };

  if (!visible || !lixeira) return null;

  return (
    <View style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "#0008",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    }}>
      <View
        style={{
          backgroundColor: "#222",
          padding: 24,
          borderRadius: 12,
          width: 400, // aumente a largura
          maxHeight: 700, // aumente a altura máxima
          minHeight: 500, // altura mínima para garantir espaço para o botão
        }}
      >
        <ScrollView
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ color: "#fff", fontSize: 18, marginBottom: 12 }}>Detalhes da Lixeira</Text>
          <Text style={{ color: "#b0b0b0" }}>Tipo: {lixeira.tipo}</Text>
          <Text style={{ color: "#b0b0b0" }}>Endereço: {lixeira.endereco}</Text>
          <Text style={{ color: "#b0b0b0" }}>Capacidade Máxima: {lixeira.capacidadeMaxima}</Text>
          <Text style={{ color: "#b0b0b0" }}>Nível Atual: {lixeira.nivelAtual}</Text>
          <Text style={{ color: "#b0b0b0" }}>Status Sensor: {lixeira.statusSensor ? "Ativo" : "Inativo"}</Text>
          <Text style={{ color: "#b0b0b0" }}>Sensor ID: {lixeira.sensorId || "N/A"}</Text>
          <Text style={{ color: "#b0b0b0" }}>Data Cadastro: {lixeira.dataCadastro}</Text>

          {/* Revisões */}
          <View style={{ marginVertical: 16 }}>
            <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 8 }}>Revisões</Text>
            <ScrollView style={{ maxHeight: 100 }}>
              {revisoes.length === 0 && (
                <Text style={{ color: "#b0b0b0" }}>Nenhuma revisão para esta lixeira.</Text>
              )}
              {revisoes.map((rev) => (
                <View key={rev.id} style={{ marginBottom: 8, borderBottomWidth: 1, borderBottomColor: "#39393f", paddingBottom: 6 }}>
                  {editId === rev.id ? (
                    <>
                      <TextInput
                        value={editDescricao}
                        onChangeText={setEditDescricao}
                        style={{ backgroundColor: "#333", color: "#fff", borderRadius: 6, padding: 6, marginBottom: 4 }}
                      />
                      <TouchableOpacity onPress={() => handleUpdateRevisao(rev.id)}>
                        <Text style={{ color: "#44AA00" }}>Salvar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setEditId(null)}>
                        <Text style={{ color: "#fff" }}>Cancelar</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={{ color: "#b0b0b0" }}>Status: {rev.status}</Text>
                      <Text style={{ color: "#b0b0b0" }}>Descrição: {rev.descricao}</Text>
                      <View style={{ flexDirection: "row", marginTop: 4 }}>
                        <TouchableOpacity onPress={() => { setEditId(rev.id); setEditDescricao(rev.descricao); }}>
                          <Text style={{ color: "#44AA00", marginRight: 16 }}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteRevisao(rev.id)}>
                          <Text style={{ color: "#ff2222" }}>Excluir</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              ))}
            </ScrollView>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Nova revisão"
                placeholderTextColor="#888"
                style={{ backgroundColor: "#333", color: "#fff", borderRadius: 6, padding: 8, flex: 1 }}
              />
              <TouchableOpacity onPress={handleAddRevisao} style={{ marginLeft: 8, justifyContent: "center" }}>
                <Text style={{ color: "#44AA00", fontWeight: "bold" }}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Materiais Coletados */}
          <View style={{ marginVertical: 12, backgroundColor: "#28342a", borderRadius: 10, padding: 12 }}>
            <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 8, fontSize: 16 }}>Materiais Coletados</Text>
            <ScrollView style={{ maxHeight: 180 }}>
              {loadingMaterial ? (
                <Text style={{ color: "#b0b0b0" }}>Carregando...</Text>
              ) : materiais.length === 0 ? (
                <Text style={{ color: "#b0b0b0" }}>Nenhum material registrado.</Text>
              ) : (
                materiais.map((mat) =>
                  editMaterialId === mat.id ? (
                    <View
                      key={mat.id}
                      style={{
                        marginBottom: 12,
                        backgroundColor: "#222",
                        borderRadius: 10,
                        padding: 12,
                        borderWidth: 1,
                        borderColor: "#44AA00",
                        shadowColor: "#44AA00",
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 6 }}>Editar Material</Text>
                      <View style={{ flexDirection: "row", marginBottom: 6 }}>
                        <TextInput
                          value={editMaterial.tipo}
                          onChangeText={v => setEditMaterial({ ...editMaterial, tipo: v })}
                          placeholder="Tipo"
                          placeholderTextColor="#888"
                          style={{
                            backgroundColor: "#333",
                            color: "#fff",
                            borderRadius: 6,
                            padding: 8,
                            flex: 1,
                            marginRight: 6,
                            borderWidth: 1,
                            borderColor: "#44AA00",
                          }}
                        />
                        <TextInput
                          value={editMaterial.quantidade}
                          onChangeText={v => setEditMaterial({ ...editMaterial, quantidade: v })}
                          placeholder="Qtd."
                          placeholderTextColor="#888"
                          keyboardType="numeric"
                          style={{
                            backgroundColor: "#333",
                            color: "#fff",
                            borderRadius: 6,
                            padding: 8,
                            width: 70,
                            marginRight: 6,
                            borderWidth: 1,
                            borderColor: "#44AA00",
                          }}
                        />
                        <TextInput
                          value={editMaterial.unidade}
                          onChangeText={v => setEditMaterial({ ...editMaterial, unidade: v })}
                          placeholder="Un."
                          placeholderTextColor="#888"
                          style={{
                            backgroundColor: "#333",
                            color: "#fff",
                            borderRadius: 6,
                            padding: 8,
                            width: 60,
                            borderWidth: 1,
                            borderColor: "#44AA00",
                          }}
                        />
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <TouchableOpacity
                          onPress={() => handleUpdateMaterial(mat.id)}
                          style={{
                            backgroundColor: "#44AA00",
                            borderRadius: 6,
                            paddingVertical: 6,
                            paddingHorizontal: 18,
                            marginRight: 10,
                          }}
                        >
                          <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setEditMaterialId(null)}
                          style={{
                            backgroundColor: "#444",
                            borderRadius: 6,
                            paddingVertical: 6,
                            paddingHorizontal: 18,
                          }}
                        >
                          <Text style={{ color: "#fff" }}>Cancelar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View
                      key={mat.id}
                      style={{
                        marginBottom: 10,
                        backgroundColor: "#23232b",
                        borderRadius: 8,
                        padding: 10,
                        borderLeftWidth: 4,
                        borderLeftColor: "#44AA00",
                      }}
                    >
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
                          {mat.tipo} <Text style={{ color: "#b0b0b0", fontWeight: "normal" }}>({mat.quantidade} {mat.unidade})</Text>
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity onPress={() => handleEditMaterial(mat)}>
                            <Text style={{ color: "#44AA00", fontSize: 13, marginRight: 16 }}>Editar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDeleteMaterial(mat.id)}>
                            <Text style={{ color: "#ff2222", fontSize: 13 }}>Excluir</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={{ color: "#b0b0b0", fontSize: 12, marginTop: 2 }}>
                        Por: <Text style={{ color: "#fff" }}>{mat.nomeUsuario}</Text>
                      </Text>
                      <Text style={{ color: "#b0b0b0", fontSize: 12 }}>
                        Data: <Text style={{ color: "#fff" }}>{new Date(mat.dataRegistro).toLocaleString()}</Text>
                      </Text>
                    </View>
                  )
                )
              )}
            </ScrollView>
            <View style={{ flexDirection: "row", marginTop: 12, alignItems: "center" }}>
              <TextInput
                value={novoMaterial.tipo}
                onChangeText={v => setNovoMaterial({ ...novoMaterial, tipo: v })}
                placeholder="Tipo"
                placeholderTextColor="#888"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  borderRadius: 6,
                  padding: 8,
                  flex: 1,
                  marginRight: 4,
                  borderWidth: 1,
                  borderColor: "#44AA00",
                }}
              />
              <TextInput
                value={novoMaterial.quantidade}
                onChangeText={v => setNovoMaterial({ ...novoMaterial, quantidade: v })}
                placeholder="Qtd."
                placeholderTextColor="#888"
                keyboardType="numeric"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  borderRadius: 6,
                  padding: 8,
                  width: 60,
                  marginRight: 4,
                  borderWidth: 1,
                  borderColor: "#44AA00",
                }}
              />
              <TextInput
                value={novoMaterial.unidade}
                onChangeText={v => setNovoMaterial({ ...novoMaterial, unidade: v })}
                placeholder="Un."
                placeholderTextColor="#888"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  borderRadius: 6,
                  padding: 8,
                  width: 50,
                  marginRight: 4,
                  borderWidth: 1,
                  borderColor: "#44AA00",
                }}
              />
              <TouchableOpacity
                onPress={handleAddMaterial}
                style={{
                  backgroundColor: "#44AA00",
                  borderRadius: 6,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={onClose}
          style={{
            marginTop: 16,
            alignSelf: "flex-end",
            backgroundColor: "#222",
            paddingVertical: 8,
            paddingHorizontal: 24,
            borderRadius: 8,
            elevation: 2,
          }}
        >
          <Text style={{ color: "#44AA00", fontWeight: "bold", fontSize: 16 }}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}