import { Link } from "react-router-dom";
import styled from "styled-components";

import mockProfileImg from "../../../assets/images/mock-profile.jpg";

export const HeaderContainer = styled.div`
  position: relative;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
  background-color: var(--gray-400);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 4px;
`;

export const IconLink = styled(Link)`
  width: 2rem;
  height: 2rem;
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const ProfileImage = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background-image: url(${mockProfileImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
