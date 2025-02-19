import styled from "styled-components";

interface WordSpanProps {
  $accent?: boolean;
}

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: #31363f;
  overflow: hidden;
`;

export const LampWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18.75rem;
  height: 18.75rem;
  cursor: pointer;
  perspective: 1000px;
`;

export const LampImage = styled.img`
  width: 12.5rem;
  height: auto;
  transition: transform 0.3s ease;
  will-change: transform;
`;

export const PulsingBorder = styled.div`
  position: absolute;
  inset: -1rem;
  border: 2px solid #64adac;
  border-radius: 50%;
  pointer-events: none;
`;

export const BrandWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50rem;
  margin: 0 auto;
  text-align: center;
  perspective: 1000px;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const HeadingLine = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const Heading = styled.h1`
  color: #64adac;
  font-family: "Pretendard", sans-serif;
  font-size: 4rem;
  will-change: transform;

  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

export const WordSpan = styled.span<WordSpanProps>`
  display: inline-block;
  color: ${({ $accent }) => ($accent ? "#64ADAC" : "white")};
  font-size: 4rem;
  font-weight: bold;
  transition: all 0.5s ease;
  white-space: pre;

  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

export const Description = styled.p`
  margin-bottom: 3rem;
  padding: 0 1rem;
  max-width: 40rem;
  color: white;
  font-size: 1.25rem;
  line-height: 1.6;
  will-change: transform;

  span {
    display: inline-block;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;
  will-change: transform;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const ButtonBase = styled.button`
  min-width: 12.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-family: "Pretendard", sans-serif;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.2s ease;
  will-change: transform;

  &:focus {
    outline: none;
  }
`;

export const PrimaryButton = styled(ButtonBase)`
  background-color: #64adac;
  color: white;

  &:hover {
    background-color: #558e8d;
  }
`;

export const SecondaryButton = styled(ButtonBase)`
  border: 2px solid #64adac;
  background-color: white;
  color: #64adac;

  &:hover {
    background-color: #f8f8f8;
  }
`;

export const LogoImage = styled.img`
  width: 15rem;
  height: auto;
  margin-bottom: 2rem;
  will-change: transform;

  @media (min-width: 768px) {
    width: 30rem;
  }
`;
