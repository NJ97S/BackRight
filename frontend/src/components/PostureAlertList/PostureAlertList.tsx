import { motion, AnimatePresence } from "framer-motion";

import { SessionAlertType } from "../../types/type";
import PostureAlertDetail from "../PostureAlertDetail/PostureAlertDetail";

import * as S from "./PostureAlertListStyle";

import closeIcon from "../../assets/icons/close.svg";

interface PostureAlertListProps {
  onClick: () => void;
  sessionAlertList: SessionAlertType[];
}

const PostureAlertList = ({
  onClick,
  sessionAlertList,
}: PostureAlertListProps) => (
  <S.PostureAlertListContainer>
    <S.Title>자세 경고 내역</S.Title>
    <S.CloseIcon onClick={onClick} src={closeIcon} alt="닫기" />

    <S.PostureAlertContainer>
      <S.TimeLine />

      <S.PostureAlertList>
        <AnimatePresence initial={false}>
          {sessionAlertList.map((alert) => (
            <motion.div
              key={alert.startedAt}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
              transition={{ duration: 0.3 }}
            >
              <PostureAlertDetail key={alert.startedAt} sessionAlert={alert} />
            </motion.div>
          ))}
        </AnimatePresence>
      </S.PostureAlertList>
    </S.PostureAlertContainer>
  </S.PostureAlertListContainer>
);

export default PostureAlertList;
