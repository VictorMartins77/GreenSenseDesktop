import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import {TrashContainer,TrashHeader,TrashTitle,NewButton,NewButtonText,TrashList,TrashCard,TrashCardHeader,TrashCardTitle,TrashCardActions,TrashStatus,TrashStatusText,TrashCardFooter,TrashActionButton,} from "./styles";
import eyeIcon from "../../assets/eye.png";
import editIcon from "../../assets/edit.png";
import trashIcon from "../../assets/trash-2.png";
import NewTrashModal from "./../NewTrash";
import EditTrashModal from "./../EditTrash/index"; // importe o modal de edição
import { useAuth } from "../../context/AuthContext";
import TrashDetails from "../../components/TrashDetails"; // Crie esse modal conforme instruções abaixo



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

export default function TrashPage() {
  const [showModal, setShowModal] = useState(false);
  const [lixeiras, setLixeiras] = useState<Lixeira[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLixeira, setSelectedLixeira] = useState<Lixeira | null>(null);
  const [revisaoModalVisible, setRevisaoModalVisible] = useState(false);
  const [selectedLixeiraForRevisao, setSelectedLixeiraForRevisao] = useState<Lixeira | null>(null);
  const [revisoes, setRevisoes] = useState<Revisao[]>([]);
  const [detalhesModalVisible, setDetalhesModalVisible] = useState(false);
  const [selectedLixeiraDetalhes, setSelectedLixeiraDetalhes] = useState<Lixeira | null>(null);
  const { token } = useAuth(); // <-- pega o token do contexto

  // Buscar lixeiras ao montar a página
  const fetchLixeiras = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/lixeiras", {
        headers: {
          Authorization: `Bearer ${token}`, // <-- token correto aqui
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLixeiras(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Erro ao buscar lixeiras", errorData.error || JSON.stringify(errorData) || "Erro desconhecido.");
      }
    } catch (error) {
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
    }
  };

  // Função para buscar revisões
  const fetchRevisoes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/revisao", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRevisoes(data);
      } else {
        setRevisoes([]);
      }
    } catch {
      setRevisoes([]);
    }
  };

  useEffect(() => {
    fetchLixeiras();
    fetchRevisoes();
  }, [token]); // refaz o fetch se o token mudar

  // Atualizar lista após cadastrar nova lixeira
  const handleSaveTrash = async (data: {
    tipo: string;
    endereco: string;
    capacidadeMaxima: number;
    nivelAtual: number;
    statusSensor: boolean;
    sensorId: string | null;
  }) => {
    const response = await fetch("http://localhost:8080/api/lixeiras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        dataCadastro: null,
      }),
    });
    if (response.ok) {
      setShowModal(false);
      fetchLixeiras();
      Alert.alert("Sucesso", "Lixeira cadastrada com sucesso!");
    }
    // Não exibe mais nenhum alerta de erro!
  };

  // Função para cor do status (exemplo simples)
  const getStatusColor = (nivel: number, capacidade: number) => {
    const percent = (nivel / capacidade) * 100;
    if (percent < 60) return "#44AA00";
    if (percent < 90) return "#ff8000";
    return "#ff2222";
  };

  // Função para texto do status
  const getStatusText = (nivel: number, capacidade: number) => {
    const percent = (nivel / capacidade) * 100;
    if (percent < 60) return "Ideal Level";
    if (percent < 90) return "Alerta";
    return "Muito cheia";
  };

  // Função para deletar uma lixeira
  const handleDeleteTrash = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/lixeiras/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok || response.status === 204) {
        fetchLixeiras();
        Alert.alert("Sucesso", "Lixeira deletada com sucesso!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Erro ao deletar", errorData.error || JSON.stringify(errorData) || "Erro desconhecido.");
      }
    } catch (error) {
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
    }
  };

  // Função para abrir o modal de edição
  const handleEditPress = (lixeira: Lixeira) => {
    setSelectedLixeira(lixeira);
    setEditModalVisible(true);
  };

  // Função para abrir o modal de revisão
  const handleRevisaoPress = (lixeira: Lixeira) => {
    setSelectedLixeiraForRevisao(lixeira);
    setRevisaoModalVisible(true);
  };

  // Função para abrir o modal de detalhes
  const handleDetalhesPress = (lixeira: Lixeira) => {
    setSelectedLixeiraDetalhes(lixeira);
    setDetalhesModalVisible(true);
  };

  // Função para atualizar a lista após editar
  const handleEditSave = () => {
    fetchLixeiras();
  };

  // Função para salvar revisão
  const handleSaveRevisao = async (descricao: string) => {
    if (!selectedLixeiraForRevisao) return;
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
          nomeUsuario: "Usuário", // Substitua pelo nome do usuário logado, se disponível
          lixeiraId: selectedLixeiraForRevisao.id,
        }),
      });
      if (response.ok) {
        setRevisaoModalVisible(false);
        Alert.alert("Sucesso", "Solicitação de revisão enviada!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert("Erro ao solicitar revisão", errorData.error || JSON.stringify(errorData) || "Erro desconhecido.");
      }
    } catch (error) {
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <TrashContainer>
      <TrashHeader>
        <TrashTitle>Gerenciamento de Lixeiras e Caçambas</TrashTitle>
        <NewButton onPress={() => setShowModal(true)}>
          <NewButtonText>Cadastrar Nova Lixeira</NewButtonText>
        </NewButton>
      </TrashHeader>

      <TrashList>
        {lixeiras.map((lixeira) => (
          <TrashCard key={lixeira.id}>
            <TrashCardHeader>
              <TrashCardTitle>
                {lixeira.tipo} {lixeira.endereco ? `#${lixeira.endereco}` : ""}
              </TrashCardTitle>
              <TrashCardActions>
                <TrashActionButton onPress={() => handleDetalhesPress(lixeira)}>
                  <Image source={eyeIcon} style={{ width: 20, height: 20, tintColor: "#44AA00" }} />
                </TrashActionButton>
                <TrashActionButton onPress={() => handleEditPress(lixeira)}>
                  <Image source={editIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
                </TrashActionButton>
                <TrashActionButton onPress={() => handleDeleteTrash(lixeira.id)}>
                  <Image source={trashIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
                </TrashActionButton>
              </TrashCardActions>
            </TrashCardHeader>
            <TrashCardFooter>
              <TrashStatus color={getStatusColor(lixeira.nivelAtual, lixeira.capacidadeMaxima)}>
                <TrashStatusText>
                  {getStatusText(lixeira.nivelAtual, lixeira.capacidadeMaxima)}
                </TrashStatusText>
              </TrashStatus>
            </TrashCardFooter>
          </TrashCard>
        ))}
      </TrashList>
      <NewTrashModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTrash}
      />
      <EditTrashModal
        visible={editModalVisible}
        lixeira={selectedLixeira}
        onClose={() => setEditModalVisible(false)}
        onSave={handleEditSave}
      />
      <TrashDetails
        visible={detalhesModalVisible}
        lixeira={selectedLixeiraDetalhes}
        onClose={() => setDetalhesModalVisible(false)}
      />
    </TrashContainer>
  );
}