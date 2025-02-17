import styled from "styled-components";
import { motion } from "framer-motion";

export const StandardPoseGuideContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: 100%;
  aspect-ratio: 1.8;
  padding: 2rem;
  border-radius: 12px;
  background-color: var(--cream);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;

  width: 50%;
  height: 100%;
`;

export const ContentTitle = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.25rem;
  font-weight: 600;

  span {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const SlideContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 6rem;
  border-radius: 12px;
  width: 100%;
  background-color: var(--white);
`;

export const Slide = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const SlideImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  border: 1px solid var(--gray-100);
  border-radius: 12px;
`;

export const SlideImage = styled(motion.img)`
  position: absolute;
  width: 30%;
  height: 30%;
  object-fit: contain;
`;

export const SlideDescription = styled.p`
  font-weight: 600;
  text-align: center;
  line-height: 1.6;
  white-space: pre-line;
`;

export const PreviousButton = styled.img<{ $isDisplayed: boolean }>`
  visibility: ${({ $isDisplayed }) => ($isDisplayed ? "visible" : "hidden")};
  cursor: pointer;
`;

export const NextButton = styled.img<{ $isDisplayed: boolean }>`
  visibility: ${({ $isDisplayed }) => ($isDisplayed ? "visible" : "hidden")};
  transform: rotate(180deg);
  cursor: pointer;
`;

export const CloseButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  padding: 0.75rem 3.5rem;
  border-radius: 12px;
  background-color: var(--gray-200);
  color: var(--white);
  font-weight: 600;
`;
