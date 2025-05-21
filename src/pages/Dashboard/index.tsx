import React, { useState } from "react";
import { ScrollView, Image, View, Modal, TouchableWithoutFeedback,Text } from "react-native";
import {Container,Sidebar,LogoContainer,Nav,NavItem,NavItemBar,Main,Header,TopBarIcons,ContentWrapper,FilterButtons,Title,FilterButtonRow,FilterButton,FilterButtonText,FilterButtonTextActive,CardContainer,Card,CardNumber,CardLabel,ChartsRow,ChartBox,ChartTitle,ChartSubtitle,ChartPlaceholder,TopBarNavItem,} from "./styles";
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

export default function Dashboard() {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<FilterType>("30 Dias");
  const [activeNav, setActiveNav] = useState<NavItemType>("home");
  const [activeTopBar, setActiveTopBar] = useState<TopBarType>("bell");
  const [showNotifications, setShowNotifications] = useState(false);
  const [centerContent, setCenterContent] = useState<"dashboard" | "profile" | "trash" | "users">("dashboard");

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
                  tintColor: showNotifications ? "#44AA00" : "#FFFFFF", // Verde só quando modal aberto
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
                  tintColor: centerContent === "profile" ? "#44AA00" : "#FFFFFF", // Verde só na página de perfil
                }}
              />
            </TopBarNavItem>
            <TopBarNavItem
              active={activeTopBar === "logout"}
              onPress={() => {
                setActiveTopBar("logout");
                (navigation as any).navigate("Login"); // navega para a tela de Login
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
              <FilterButtons>
                <Title>Filtros</Title>
                <FilterButtonRow>
                  {["30 Dias", "60 Dias", "90 Dias", "12 Meses"].map((filter) => (
                    <FilterButton
                      key={filter}
                      active={activeFilter === filter}
                      onPress={() => setActiveFilter(filter as FilterType)}
                    >
                      {activeFilter === filter ? (
                        <FilterButtonTextActive>{filter}</FilterButtonTextActive>
                      ) : (
                        <FilterButtonText>{filter}</FilterButtonText>
                      )}
                    </FilterButton>
                  ))}
                </FilterButtonRow>
              </FilterButtons>
              {/* Cards em linha */}
              <CardContainer>
                <Card>
                  <CardNumber>104</CardNumber>
                  <CardLabel>Total de Coletas</CardLabel>
                </Card>
                <Card>
                  <CardNumber>12</CardNumber>
                  <CardLabel>Alertas de Lixeiras Cheias</CardLabel>
                </Card>
                <Card>
                  <CardNumber>08</CardNumber>
                  <CardLabel>Novas Lixeiras</CardLabel>
                </Card>
              </CardContainer>
              {/* Gráficos em linha, abaixo dos cards */}
              <ChartsRow>
                <ChartBox>
                  <ChartTitle>Quantidade de Coletas por Região</ChartTitle>
                  <ChartPlaceholder>
                    <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#44AA00", marginBottom: 8 }} />
                  </ChartPlaceholder>
                </ChartBox>
                <ChartBox>
                  <ChartTitle>Histórico de Coletas</ChartTitle>
                  <ChartSubtitle>Dia / Semana / Mês</ChartSubtitle>
                  <ChartPlaceholder>
                    <View style={{ width: 80, height: 40, backgroundColor: "#44AA00", borderRadius: 6 }} />
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