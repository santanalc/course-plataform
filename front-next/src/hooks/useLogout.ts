import router from "next/dist/client/router";
import { useResetRecoilState } from "recoil";
import { UserAtom } from "../atoms/UserAtom";
import { VirtualAppAtom } from "../atoms/VirtualAppAtom";
import {
  CurrentTopicUploaderAtom,
  CurrentCourseUploaderAtom,
} from "../components/screens/Uploader/FormUploader/FormUploader";
import { HookFileUploadAtom } from "./useUploadFile";
import { Firebase } from "../service/FirebaseService";
import VirtualAppId from "../utils/storage/VirtualAppId";

export  function useLogout() {
  const resetTopicAtom = useResetRecoilState(CurrentTopicUploaderAtom);
  const resetCourseAtom = useResetRecoilState(CurrentCourseUploaderAtom);
  const resetCardsAtom = useResetRecoilState(HookFileUploadAtom);
  const resetUserAtom = useResetRecoilState(UserAtom);
  const resetVirtualAppAtom = useResetRecoilState(VirtualAppAtom);

  async function logout() {
    resetTopicAtom();
    resetCourseAtom();
    resetCardsAtom();
    resetUserAtom();
    resetVirtualAppAtom();
    VirtualAppId.clear();

    await Firebase.clearIdToken();
    router.push("/");
  }

  return { logout };
}
