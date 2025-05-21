import styled from "styled-components/native";
import NotificationModal from "../../components/NotificationModal";

// Layout containers
export const Container = styled.View`
  flex-direction: row;
  height: 100%;
  background: #121214;
`;

export const Sidebar = styled.View`
  width: 100px;
  background: #202024;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
`;

export const LogoContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-top: 18px;
  padding-bottom: 18px;
  flex-direction: column;
`;

export const Nav = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 32px;
`;

export const NavItem = styled.TouchableOpacity<{ active?: boolean }>`
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  position: relative;
  /* Barrinha verde à esquerda apenas quando ativo */
  ${({ active }) =>
    active &&
    `
      background: rgba(68,170,0,0.08);
    `}
`;

export const NavItemBar = styled.View<{ active?: boolean }>`
  position: absolute;
  left: 0;
  top: 16px;
  bottom: 16px;
  width: 4px;
  border-radius: 2px;
  background: ${({ active }) => (active ? "#44AA00" : "transparent")};
`;

export const Main = styled.View`
  flex: 1;
  flex-direction: column;
  background: #121214;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background: #202024;
  padding: 24px 40px 24px 24px;
  width: 100%;
`;

export const TopBarIcons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

export const ContentWrapper = styled.View`
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 32px;
`;

export const FilterButtons = styled.View`
  background: #202024;
  border-radius: 16px;
  margin: 40px 0;
  padding: 20px 32px;
  width: 100%;
  max-width: 700px;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #f0f0f0;
  font-weight: bold;
  margin-bottom: 18px;
`;

export const FilterButtonRow = styled.View`
  flex-direction: row;
  width: 100%;
  border-width: 2px;
  border-color: #44aa00;
  border-radius: 12px;
  background: transparent;
  overflow: hidden;
`;

export const FilterButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  padding: 12px 0;
  background: ${({ active }) => (active ? "#44AA00" : "transparent")};
  align-items: center;
`;

export const FilterButtonText = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
`;

export const FilterButtonTextActive = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const CardContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;
`;

export const Card = styled.View`
  background: #202024;
  padding: 29px 24px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  width: 120px;
  min-width: 100px;
  height: 120px;
  margin: 0 8px;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CardNumber = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const CardLabel = styled.Text`
  font-size: 14px;
  color: #b0b0b0;
  text-align: center;
`;

export const ChartsRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  margin-top: 0;
`;

export const ChartBox = styled.View`
  background: #202024;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  width: 320px;
  min-width: 220px;
  align-self: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ChartTitle = styled.Text`
  font-size: 16px;
  color: #f0f0f0;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const ChartSubtitle = styled.Text`
  font-size: 13px;
  color: #a0a0a0;
  margin-bottom: 8px;
`;

export const ChartPlaceholder = styled.View`
  flex-grow: 1;
  background: #39393f;
  border-radius: 6px;
  min-height: 80px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.52);
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const NotificationsModal = styled.View`
  background: #23232a;
  border-radius: 8px;
  padding: 24px;
  min-width: 220px;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

export const NotificationsTitle = styled.Text`
  color: #b0b0b0;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const NotificationText = styled.Text`
  color: #c0bcbc;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: center;
`;

export const Divider = styled.View`
  height: 1px;
  background: #39393f;
  align-self: stretch;
  margin: 8px 0;
`;

export const SeeAll = styled.Text`
  color: #b0b0b0;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 0;
`;

export const TopBarNavItem = styled.TouchableOpacity<{ active?: boolean }>`
  margin-left: 24px;
  align-items: center;
  justify-content: center;
  /* Não coloque nenhuma barrinha ou destaque lateral aqui */
`;