import styled from "styled-components/native";

export const TrashContainer = styled.View`
  flex: 1;
  padding: 32px 0 0 0;
  align-items: center;
  background: transparent;
`;

export const TrashHeader = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

export const TrashTitle = styled.Text`
  color: #b0b0b0;
  font-size: 16px;
  font-weight: bold;
`;

export const NewButton = styled.TouchableOpacity`
  background: #44aa00;
  border-radius: 8px;
  padding: 8px 18px;
`;

export const NewButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;

export const TrashList = styled.ScrollView`
  width: 90%;
`;

export const TrashCard = styled.View`
  background: #23232b;
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 0;
  overflow: hidden;
`;

export const TrashCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 18px 0 18px;
`;

export const TrashCardTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;

export const TrashCardActions = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const TrashActionButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const TrashCardFooter = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 18px 18px 18px;
`;

export const TrashStatus = styled.View<{ color: string }>`
  background: ${({ color }) => color};
  border-radius: 6px;
  padding: 2px 12px;
`;

export const TrashStatusText = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: bold;
`;