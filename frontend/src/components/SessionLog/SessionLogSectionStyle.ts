import styled from "styled-components";
import { MODAL_DIMENSIONS } from "../../constants/constants";
import { SessionStatus } from "../../types/type";
// ===== Styled Components =====
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isExpanded"].includes(prop),
})`
  padding: 1.5rem;
  background: var(--white);
  border-radius: 0.75rem;
  height: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
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
  shouldForwardProp: (prop) => !["sessionCount"].includes(prop),
})<TimelineWrapperProps>`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 1rem;
    top: 0.75rem;
    height: ${({ sessionCount }) =>
      sessionCount > 1 ? `${(sessionCount - 1) * 6}rem` : "0"};
    width: 0.25rem;
    background-color: var(--gray-300);
    transform: translateX(-50%);
    z-index: 2;
  }
`;

export const TimelineDot = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0.125rem 0.375rem 0 0;
  background-color: var(--gray-300);
  border-radius: 50%;
  position: relative;
  z-index: 1;
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
  shouldForwardProp: (prop) => !["status"].includes(prop),
})<{ status: SessionStatus }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  background-color: var(--cream);
  border-radius: 999px;
  transition: background-color 0.2s ease;

  span {
    font-size: 0.75rem;
    color: var(--gray-300);
    transition: color 0.2s ease;
  }
`;

export const WarningCount = styled.div`
  font-size: 0.875rem;
  color: var(--black);
  transition: color 0.2s ease;
`;

export const SessionItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  position: relative;
  border-radius: 0.75rem;
  transition: background-color 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--mint);

    ${SessionTime} {
      color: var(--white);
    }

    ${WarningCount} {
      color: var(--white);
    }

    ${StatusBadge} {
      background-color: var(--white);

      span {
        color: var(--mint);
      }
    }
  }
`;

// Modal Styles
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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
  background-color: var(--white);
  border-radius: 0.75rem;
  padding: 1.5rem;
  width: 80%;
  max-width: ${MODAL_DIMENSIONS.MAX_WIDTH};
  max-height: ${MODAL_DIMENSIONS.MAX_HEIGHT};
  z-index: 1;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-300);

  &:hover {
    color: var(--gray-400);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const VideoSection = styled.div`
  flex: 1;
  background-color: var(--gray-100);
  border-radius: 0.5rem;
  padding: 1rem;
  min-height: 18.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WarningSection = styled.div`
  flex: 1;
  max-height: 25rem;
  overflow-y: auto;
`;

export const WarningTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const WarningList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const WarningItem = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--gray-100);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--gray-200);
  }
`;

export const WarningTime = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const WarningDescription = styled.div`
  color: var(--gray-700);
  font-size: 0.875rem;
`;
