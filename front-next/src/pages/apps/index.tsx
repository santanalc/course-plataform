import { Fragment, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useResetRecoilState } from "recoil";
import SeoHead from "../../components/global/SeoHead";
import AppsList from "../../components/screens/Apps/AppsList/AppsList";
import {
  CurrentCourseUploaderAtom,
  CurrentTopicUploaderAtom,
} from "../../components/screens/Uploader/FormUploader/FormUploader";
import { useLogout } from "../../hooks/useLogout";
import {
  HookFileKeysOrder,
  HookFileUploadAtom,
  HookUploadNext,
} from "../../hooks/useUploadFile";
import * as SC from "./styled";

export default function Apps() {
  const resetTopicAtom = useResetRecoilState(CurrentTopicUploaderAtom);
  const resetCourseAtom = useResetRecoilState(CurrentCourseUploaderAtom);
  const resetCardsAtom = useResetRecoilState(HookFileUploadAtom);
  const resetFileKeysAtom = useResetRecoilState(HookFileKeysOrder);
  const resetUploadNextAtom = useResetRecoilState(HookUploadNext);
  const { logout } = useLogout();

  useEffect(() => {
    resetTopicAtom();
    resetCourseAtom();
    resetCardsAtom();
    resetFileKeysAtom();
    resetUploadNextAtom();
  }, []);

  return (
    <Fragment>
      <SeoHead pageName="Apps" />
      <SC.Container>
        <SC.Image src="/global/white-text-logo.svg" alt="Learnistic" />
        <SC.Logout>
          <FaSignOutAlt size={40} color={"white"} onClick={logout} />
        </SC.Logout>
        <SC.Wrapper>
          <AppsList />
        </SC.Wrapper>
      </SC.Container>
    </Fragment>
  );
}
