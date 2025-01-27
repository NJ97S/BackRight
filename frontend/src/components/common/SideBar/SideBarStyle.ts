import { Link } from "react-router-dom";
import styled from "styled-components";

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 1.5rem;
  background-color: var(--gray-400);
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
`;

export const IconLink = styled(Link)`
  width: 2rem;
  height: 2rem;
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;
