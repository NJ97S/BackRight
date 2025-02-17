import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  z-index: 50;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
  background-color: var(--navy-200);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 4px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 2rem;
  height: 2rem;
`;

export const IconButton = styled.button`
  height: 100%;
`;

export const IconLink = styled(Link)`
  width: 2rem;
  height: 2rem;
`;

export const Icon = styled.img`
  height: 100%;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const ProfileImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
`;
