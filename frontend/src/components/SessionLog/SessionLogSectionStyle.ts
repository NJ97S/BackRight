import styled from "styled-components";
import { MODAL_DIMENSIONS } from "../../constants/reportConstants";
import type { SessionStatus } from "../../types/type";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  background: var(--white);
  border-radius: 0.75rem;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;

  color: var(--black);
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

export const SessionList = styled.div`
  height: calc(100% - 3.5rem);
  overflow-y: auto;
`;

interface TimelineWrapperProps {
  sessionCount: number;
}

export const TimelineWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "sessionCount",
})<TimelineWrapperProps>`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    left: 1.5rem;
    top: 1.5rem;
    width: 0.25rem;
    height: ${({ sessionCount }) =>
      sessionCount > 1 ? `${(sessionCount - 1) * 5}rem` : "0"};
    background-color: var(--gray-300);
    transform: translateX(-50%);
  }
`;

export const SessionItem = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  padding: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--mint);

    ${/* sc-selector */ "SessionTime"} {
      color: var(--white);
    }

    ${/* sc-selector */ "WarningCount"} {
      color: var(--white);
    }

    ${/* sc-selector */ "StatusBadge"} {
      background-color: var(--white);
    }
  }
`;

export const TimelineDot = styled.div`
  position: relative;
  z-index: 1;
  width: 1rem;
  height: 1rem;
  margin: 0.125rem 1rem 0 0;
  background-color: var(--gray-300);
  border-radius: 50%;
  transition: background-color 0.2s ease;
`;

export const SessionContent = styled.div`
  flex: 1;
  z-index: 1;
`;

export const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const SessionTime = styled.span`
  color: var(--gray-300);
  font-size: 0.875rem;
  transition: color 0.2s ease;
`;

export const StatusBadge = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "status",
})<{ status: SessionStatus }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;

  background-color: var(--cream);
  border-radius: 999px;
  transition: background-color 0.2s ease;

  span {
    color: var(--gray-300);
    font-size: 0.75rem;
    transition: color 0.2s ease;
  }
`;

export const Icon = styled.img`
  width: 1rem;
  height: 1rem;
  object-fit: contain;
`;

export const WarningCount = styled.div`
  color: var(--black);
  font-size: 0.875rem;
  transition: color 0.2s ease;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  width: 80%;
  max-width: ${MODAL_DIMENSIONS.MAX_WIDTH};
  max-height: ${MODAL_DIMENSIONS.MAX_HEIGHT};
  padding: 1.5rem;

  background-color: var(--white);
  border-radius: 0.75rem;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;

  color: var(--gray-300);
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: var(--gray-400);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const VideoSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  min-height: 18.75rem;
  padding: 1rem;
  background-color: var(--gray-100);
  border-radius: 0.5rem;
`;

export const WarningSection = styled.div`
  flex: 1;
  max-height: 25rem;
  overflow-y: auto;
`;

export const WarningTitle = styled.h3`
  margin-bottom: 1rem;

  font-size: 1.125rem;
  font-weight: 600;
`;

export const WarningList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const WarningItem = styled.div`
  padding: 0.5rem;

  background-color: var(--gray-100);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--gray-200);
  }
`;

export const WarningTime = styled.div`
  margin-bottom: 0.25rem;
  font-weight: 600;
`;

export const WarningDescription = styled.div`
  color: var(--gray-700);
  font-size: 0.875rem;
`;
