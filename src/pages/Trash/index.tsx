import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import {TrashContainer,TrashHeader,TrashTitle,NewButton,NewButtonText,TrashList,TrashCard,TrashCardHeader,TrashCardTitle,TrashCardActions,TrashStatus,TrashStatusText,TrashCardFooter,TrashActionButton,} from "./styles";
import eyeIcon from "../../assets/eye.png";
import editIcon from "../../assets/edit.png";
import trashIcon from "../../assets/trash-2.png";

export default function TrashPage() {
  return (
    <TrashContainer>
      <TrashHeader>
        <TrashTitle>Gerenciamento de Lixeiras e Caçambas</TrashTitle>
        <NewButton>
          <NewButtonText>Cadastrar Nova Lixeira</NewButtonText>
        </NewButton>
      </TrashHeader>
      <TrashList>
        <TrashCard>
          <TrashCardHeader>
            <TrashCardTitle>Lixeira #lx001231</TrashCardTitle>
            <TrashCardActions>
              <TrashActionButton>
                <Image source={eyeIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
              <TrashActionButton>
                <Image source={editIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
              <TrashActionButton>
                <Image source={trashIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
            </TrashCardActions>
          </TrashCardHeader>
          <TrashCardFooter>
            <TrashStatus color="#44AA00">
              <TrashStatusText>Ideal Level</TrashStatusText>
            </TrashStatus>
          </TrashCardFooter>
        </TrashCard>
        <TrashCard>
          <TrashCardHeader>
            <TrashCardTitle>Lixeira #lx001225</TrashCardTitle>
            <TrashCardActions>
              <TrashActionButton>
                <Image source={eyeIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
              <TrashActionButton>
                <Image source={editIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
              <TrashActionButton>
                <Image source={trashIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
            </TrashCardActions>
          </TrashCardHeader>
          <TrashCardFooter>
            <TrashStatus color="#ff8000">
              <TrashStatusText>Alerta</TrashStatusText>
            </TrashStatus>
          </TrashCardFooter>
        </TrashCard>
        <TrashCard>
          <TrashCardHeader>
            <TrashCardTitle>Caçamba #cb00644</TrashCardTitle>
            <TrashCardActions>
              <TrashActionButton>
                <Image source={eyeIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
              <TrashActionButton>
                <Image source={editIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
              <TrashActionButton>
                <Image source={trashIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
            </TrashCardActions>
          </TrashCardHeader>
          <TrashCardFooter>
            <TrashStatus color="#ff2222">
              <TrashStatusText>Muito cheia</TrashStatusText>
            </TrashStatus>
          </TrashCardFooter>
        </TrashCard>
        <TrashCard>
          <TrashCardHeader>
            <TrashCardTitle>Lixeira #lx008533</TrashCardTitle>
            <TrashCardActions>
              <TrashActionButton>
                <Image source={eyeIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
              <TrashActionButton>
                <Image source={editIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
              <TrashActionButton>
                <Image source={trashIcon} style={{ width: 20, height: 20, tintColor: "#b0b0b0" }} />
              </TrashActionButton>
            </TrashCardActions>
          </TrashCardHeader>
          <TrashCardFooter>
            <TrashStatus color="#888">
              <TrashStatusText>Não coletada</TrashStatusText>
            </TrashStatus>
          </TrashCardFooter>
        </TrashCard>
      </TrashList>
    </TrashContainer>
  );
}