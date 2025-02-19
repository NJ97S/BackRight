import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import LAMP_STATES from "../../constants/lampStates";
import logo from "../../assets/images/logo.webp";
import * as S from "./LandingPageStyle";
import * as A from "../../animations/landingAnimations";

import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

const LandingPage = () => {
  const navigate = useNavigate();
  const [lampState, setLampState] = useState<string>(LAMP_STATES[0].src);
  const [clickCount, setClickCount] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showClickHint, setShowClickHint] = useState(false);
  const [showOnlyBrandName, setShowOnlyBrandName] = useState(false);

  const handleLampClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickCount === 0) {
      setLampState(LAMP_STATES[1].src);
      setShowClickHint(true);
    } else if (clickCount >= 3) {
      setLampState(LAMP_STATES[2].src);
      setShowClickHint(false);
      setTimeout(() => setShowText(true), 1000);
    }
  };

  useEffect(() => {
    if (showText) {
      setTimeout(() => setShowOnlyBrandName(true), 3000);
      setTimeout(() => setShowLogo(true), 4500);
    }
  }, [showText]);

  return (
    <S.Container
      as={motion.main}
      variants={A.containerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 1 }}
    >
      <AnimatePresence>
        {!showText && (
          <S.LampWrapper
            as={motion.div}
            variants={A.lampWrapperVariants}
            onClick={handleLampClick}
          >
            <S.LampImage
              src={lampState}
              alt="Interactive Lamp"
              as={motion.img}
              variants={A.lampImageVariants}
            />
            {showClickHint && (
              <S.PulsingBorder
                as={motion.div}
                variants={A.pulsingBorderVariants}
              />
            )}
          </S.LampWrapper>
        )}

        {showText && !showLogo && (
          <S.TextWrapper as={motion.div} variants={A.textWrapperVariants}>
            <S.HeadingLine>
              <motion.div {...A.wordVariants(showOnlyBrandName, false, 0)}>
                <S.WordSpan>We will </S.WordSpan>
              </motion.div>

              <motion.div {...A.wordVariants(showOnlyBrandName, true, 1)}>
                <S.WordSpan $accent>Back</S.WordSpan>
              </motion.div>

              <motion.div {...A.wordVariants(showOnlyBrandName, false, 2)}>
                <S.WordSpan>you up </S.WordSpan>
              </motion.div>

              <motion.div {...A.wordVariants(showOnlyBrandName, true, 3)}>
                <S.WordSpan $accent>Right</S.WordSpan>
              </motion.div>
            </S.HeadingLine>
          </S.TextWrapper>
        )}

        {showLogo && (
          <S.TextWrapper
            as={motion.div}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <S.LogoImage
              as={motion.img}
              src={logo}
              alt="BackRight Logo"
              initial={{ opacity: 0, y: -100 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: [90, 0],
              }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
              }}
            />
            <S.Description
              as={motion.p}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.5,
              }}
            >
              {`오래 앉아 있는 당신만을 위한,\n맞춤형 자세교정 서비스를 제공해 드려요`
                .split(/(\s+)/)
                .map((char, index) => (
                  <motion.span
                    key={index}
                    style={{
                      display: char.trim() === "" ? "inline" : "inline-block",
                      whiteSpace: "pre-wrap",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
            </S.Description>
            <S.ButtonGroup
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <S.PrimaryButton
                as={motion.button}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 10px 20px rgba(100, 173, 172, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                앱 다운로드
              </S.PrimaryButton>
              <S.SecondaryButton
                as={motion.button}
                onClick={() => navigate(PATH.SIGN_IN)}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 10px 20px rgba(100, 173, 172, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                웹에서 맛보기
              </S.SecondaryButton>
            </S.ButtonGroup>
          </S.TextWrapper>
        )}
      </AnimatePresence>
    </S.Container>
  );
};

export default LandingPage;
