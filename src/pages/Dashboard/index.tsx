import React, { useState } from "react";
import { ScrollView, Image, View, Text } from "react-native";
import {
  Container, Sidebar, LogoContainer, Nav, NavItem, NavItemBar, Main, Header, TopBarIcons, ContentWrapper,
  CardContainer, Card, CardNumber, CardLabel, ChartsRow, ChartBox, ChartTitle, ChartSubtitle, ChartPlaceholder, TopBarNavItem,
  FilterBarWrapper, FilterBarTitle, FilterBarRow, FilterBarButton, FilterBarButtonText
} from "./styles";
import { useNavigation } from "@react-navigation/native";

import houseImg from "../../assets/house.png";
import mapImg from "../../assets/map.png";
import trashImg from "../../assets/trash-2.png";
import usersImg from "../../assets/users.png";
import bellImg from "../../assets/bell.png";
import userImg from "../../assets/user.png";
import logoutImg from "../../assets/log-out.png";
import gImg from "../../assets/g.png";
import Profile from "../Profile";
import TrashPage from "../Trash";
import UsersPage from "../Users";
import NotificationModal from "../../components/NotificationModal";

type FilterType = "30 Dias" | "60 Dias" | "90 Dias" | "12 Meses";
type NavItemType = "home" | "map" | "trash" | "menu";
type TopBarType = "bell" | "user" | "logout";

// Dados dinâmicos para cada filtro
const FILTER_DATA = {
  "30 Dias": {
    cards: { total: 104, alertas: 12, novas: 8 },
    coletaPorRegiao: [
      { label: "Norte", value: 80, color: "#44AA00" },
      { label: "Sul", value: 55, color: "#66CC33" },
      { label: "Leste", value: 40, color: "#BBDD99" },
      { label: "Oeste", value: 28, color: "#DDEEAA" },
    ],
    historicoColetas: [32, 44, 28, 60, 22, 38, 48],
    historicoLabels: ["12", "16", "10", "22", "8", "14", "18"],
  },
  "60 Dias": {
    cards: { total: 210, alertas: 22, novas: 15 },
    coletaPorRegiao: [
      { label: "Norte", value: 100, color: "#44AA00" },
      { label: "Sul", value: 70, color: "#66CC33" },
      { label: "Leste", value: 55, color: "#BBDD99" },
      { label: "Oeste", value: 38, color: "#DDEEAA" },
    ],
    historicoColetas: [40, 60, 38, 80, 32, 54, 68],
    historicoLabels: ["12", "16", "10", "22", "8", "14", "18"],
  },
  "90 Dias": {
    cards: { total: 320, alertas: 35, novas: 22 },
    coletaPorRegiao: [
      { label: "Norte", value: 120, color: "#44AA00" },
      { label: "Sul", value: 90, color: "#66CC33" },
      { label: "Leste", value: 70, color: "#BBDD99" },
      { label: "Oeste", value: 50, color: "#DDEEAA" },
    ],
    historicoColetas: [60, 80, 58, 100, 42, 74, 88],
    historicoLabels: ["12", "16", "10", "22", "8", "14", "18"],
  },
  "12 Meses": {
    cards: { total: 1200, alertas: 110, novas: 60 },
    coletaPorRegiao: [
      { label: "Norte", value: 180, color: "#44AA00" },
      { label: "Sul", value: 120, color: "#66CC33" },
      { label: "Leste", value: 90, color: "#BBDD99" },
      { label: "Oeste", value: 70, color: "#DDEEAA" },
    ],
    historicoColetas: [120, 140, 110, 180, 90, 130, 150],
    historicoLabels: ["12", "16", "10", "22", "8", "14", "18"],
  },
};

export default function Dashboard() {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<FilterType>("30 Dias");
  const [activeNav, setActiveNav] = useState<NavItemType>("home");
  const [activeTopBar, setActiveTopBar] = useState<TopBarType>("bell");
  const [showNotifications, setShowNotifications] = useState(false);
  const [centerContent, setCenterContent] = useState<"dashboard" | "profile" | "trash" | "users">("dashboard");

  // Dados dinâmicos conforme filtro
  const { cards, coletaPorRegiao, historicoColetas, historicoLabels } = FILTER_DATA[activeFilter];

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <LogoContainer>
          <Image source={gImg} style={{ width: 66, height: 88, marginRight: 26 }} />
        </LogoContainer>
        <Nav>
          <NavItem
            active={activeNav === "home"}
            onPress={() => {
              setActiveNav("home");
              setCenterContent("dashboard");
            }}
          >
            <NavItemBar active={activeNav === "home"} />
            <Image
              source={houseImg}
              style={{
                width: 28,
                height: 28,
                tintColor: activeNav === "home" ? "#44AA00" : "#FFFFFF",
              }}
            />
          </NavItem>
          <NavItem
            active={activeNav === "map"}
            onPress={() => setActiveNav("map")}
          >
            <NavItemBar active={activeNav === "map"} />
            <Image
              source={mapImg}
              style={{
                width: 28,
                height: 28,
                tintColor: activeNav === "map" ? "#44AA00" : "#FFFFFF",
              }}
            />
          </NavItem>
          <NavItem
            active={activeNav === "trash"}
            onPress={() => {
              setActiveNav("trash");
              setCenterContent("trash");
            }}
          >
            <NavItemBar active={activeNav === "trash"} />
            <Image
              source={trashImg}
              style={{
                width: 28,
                height: 28,
                tintColor: activeNav === "trash" ? "#44AA00" : "#FFFFFF",
              }}
            />
          </NavItem>
          <NavItem
            active={activeNav === "menu"}
            onPress={() => {
              setActiveNav("menu");
              setCenterContent("users");
            }}
          >
            <NavItemBar active={activeNav === "menu"} />
            <Image
              source={usersImg}
              style={{
                width: 28,
                height: 28,
                tintColor: activeNav === "menu" ? "#44AA00" : "#FFFFFF",
              }}
            />
          </NavItem>
        </Nav>
      </Sidebar>
      {/* Main */}
      <Main>
        {/* Header */}
        <Header>
          <TopBarIcons>
            <TopBarNavItem
              active={activeTopBar === "bell" || showNotifications}
              onPress={() => {
                setActiveTopBar("bell");
                setShowNotifications(true);
              }}
            >
              <Image
                source={bellImg}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: showNotifications ? "#44AA00" : "#FFFFFF",
                }}
              />
            </TopBarNavItem>
            <TopBarNavItem
              active={activeTopBar === "user" && centerContent === "profile"}
              onPress={() => {
                setActiveTopBar("user");
                setCenterContent("profile");
              }}
            >
              <Image
                source={userImg}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: centerContent === "profile" ? "#44AA00" : "#FFFFFF",
                }}
              />
            </TopBarNavItem>
            <TopBarNavItem
              active={activeTopBar === "logout"}
              onPress={() => {
                setActiveTopBar("logout");
                (navigation as any).navigate("Login");
              }}
            >
              <Image
                source={logoutImg}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: activeTopBar === "logout" ? "#44AA00" : "#FFFFFF",
                }}
              />
            </TopBarNavItem>
          </TopBarIcons>
        </Header>
        {centerContent === "dashboard" ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ContentWrapper>
              <FilterBarWrapper>
                <FilterBarTitle>Filtros</FilterBarTitle>
                <FilterBarRow>
                  {(["30 Dias", "60 Dias", "90 Dias", "12 Meses"] as FilterType[]).map((filter) => (
                    <FilterBarButton
                      key={filter}
                      active={activeFilter === filter}
                      onPress={() => setActiveFilter(filter)}
                      style={{
                        borderRightWidth: filter !== "12 Meses" ? 1 : 0,
                        borderColor: "#222",
                      }}
                    >
                      <FilterBarButtonText active={activeFilter === filter}>{filter}</FilterBarButtonText>
                    </FilterBarButton>
                  ))}
                </FilterBarRow>
              </FilterBarWrapper>
              {/* Cards em linha */}
              <CardContainer>
                <Card>
                  <CardNumber>{cards.total}</CardNumber>
                  <CardLabel>Total de Coletas</CardLabel>
                </Card>
                <Card>
                  <CardNumber>{cards.alertas}</CardNumber>
                  <CardLabel>Alertas de Lixeiras Cheias</CardLabel>
                </Card>
                <Card>
                  <CardNumber>{cards.novas}</CardNumber>
                  <CardLabel>Novas Lixeiras</CardLabel>
                </Card>
              </CardContainer>
              {/* Gráficos em linha, abaixo dos cards */}
              <ChartsRow>
                <ChartBox>
                  <ChartTitle>Quantidade de Coletas por Região</ChartTitle>
                  <ChartPlaceholder>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      height: 200,
                      width: 340,
                      justifyContent: "center",
                      paddingTop: 20,
                      gap: 32,
                    }}>
                      {coletaPorRegiao.map((item, idx) => (
                        <View key={idx} style={{ alignItems: "center", marginHorizontal: 16 }}>
                          <View
                            style={{
                              width: 30, // diminuído
                              height: item.value * 1.0, // diminuído
                              backgroundColor: item.color,
                              borderRadius: 18,
                              shadowColor: "#44AA00",
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.3,
                              shadowRadius: 8,
                              elevation: 8,
                              marginBottom: 8,
                              borderWidth: 2,
                              borderColor: "#222",
                            }}
                          />
                          <Text style={{
                            fontSize: 22,
                            color: "#bbb",
                            marginTop: 8,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}>{item.label}</Text>
                        </View>
                      ))}
                    </View>
                  </ChartPlaceholder>
                </ChartBox>
                <ChartBox>
                  <ChartTitle>Histórico de Coletas</ChartTitle>
                  <ChartSubtitle>Dia / Semana / Mês</ChartSubtitle>
                  <ChartPlaceholder>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      height: 180,
                      width: 380,
                      justifyContent: "center",
                      paddingTop: 20,
                      gap: 24,
                    }}>
                      {historicoColetas.map((value, idx) => (
                        <View key={idx} style={{ alignItems: "center", marginHorizontal: 8 }}>
                          <View
                            style={{
                              width: 20, // diminuído
                              height: value * 0.9, // diminuído
                              backgroundColor: "#44AA00",
                              borderRadius: 10,
                              shadowColor: "#44AA00",
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.2,
                              shadowRadius: 6,
                              elevation: 6,
                              marginBottom: 8,
                              borderWidth: 2,
                              borderColor: "#222",
                            }}
                          />
                          <Text style={{
                            fontSize: 18,
                            color: "#bbb",
                            marginTop: 6,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}>{historicoLabels[idx]}</Text>
                        </View>
                      ))}
                    </View>
                  </ChartPlaceholder>
                </ChartBox>
              </ChartsRow>
            </ContentWrapper>
          </ScrollView>
        ) : centerContent === "profile" ? (
          <Profile />
        ) : centerContent === "trash" ? (
          <TrashPage />
        ) : (
          <UsersPage />
        )}
      </Main>
      <NotificationModal visible={showNotifications} onClose={() => setShowNotifications(false)} />
    </Container>
  );
}