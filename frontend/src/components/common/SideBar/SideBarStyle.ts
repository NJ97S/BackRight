import { Link } from "react-router-dom";
import styled from "styled-components";

interface SideBarProps {
  isExpanded: boolean;
}

export const SideBarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<SideBarProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 100%;
  width: ${(props) => (props.isExpanded ? "18rem" : "4rem")};
  padding: 1.5rem 1rem;
  background-color: var(--navy-200);

  transition: width 0.3s ease-in-out;
`;

export const ImageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<SideBarProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
  width: 100%;
`;

export const IconLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<SideBarProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  font-weight: 600;
`;

export const IconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<SideBarProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  font-weight: 600;
`;

export const Icon = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const LinkName = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<SideBarProps>`
  color: var(--gray-200);
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  visibility: ${({ isExpanded }) => (isExpanded ? "visible" : "hidden")};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  ${({ isExpanded }) => !isExpanded && "transition: none;"}
  white-space: nowrap;
`;

interface ArrowDownIconProps {
  isExpanded: boolean;
  isReportMenuOpened: boolean;
}

export const ReportMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ArrowIcon = styled.img.withConfig({
  shouldForwardProp: (prop) =>
    prop !== "isReportMenuOpened" && prop !== "isExpanded",
})<ArrowDownIconProps>`
  position: absolute;
  right: 0;
  width: 1.25rem;
  height: 1.25rem;

  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  visibility: ${({ isExpanded }) => (isExpanded ? "visible" : "hidden")};
  transform: ${({ isReportMenuOpened }) =>
    isReportMenuOpened ? "rotate(180deg)" : "rotate(0)"};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out,
    transform 0.3s ease-in-out;
  ${({ isExpanded }) => !isExpanded && "transition: none;"}
`;

interface SubMenuContainerProps {
  isReportMenuOpened: boolean;
}

export const SubMenuContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isReportMenuOpened",
})<SubMenuContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 0.75rem;
  max-height: ${({ isReportMenuOpened }) =>
    isReportMenuOpened ? "10rem" : "0"};

  opacity: ${({ isReportMenuOpened }) => (isReportMenuOpened ? 1 : 0)};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

export const SubMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;

  &:first-child {
    margin-top: 1.5rem;
  }
`;
