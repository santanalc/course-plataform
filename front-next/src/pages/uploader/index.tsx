import { Fragment, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { VirtualAppAtom } from "../../atoms/VirtualAppAtom";
import SeoHead from "../../components/global/SeoHead";
import TopBar from "../../components/global/TopBar";
import CardList from "../../components/screens/Uploader/CardList/CardList";
import FormUploader from "../../components/screens/Uploader/FormUploader/FormUploader";
import FormUploader_OLD from "../../components/screens/Uploader/FormUploader/FormUploader_OLD";
import { HookFileUploadAtom } from "../../hooks/useUploadFile";
import * as SC from "./styled";

export default function Uploader() {
  const [uploadFiles, setUploadFiles] = useRecoilState(HookFileUploadAtom);
  const [hasItem, setHasItem] = useState(false);
  const virtualApp = useRecoilValue(VirtualAppAtom);

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }

    if (hasItem) window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [hasItem]);

  useEffect(() => {
    if (
      uploadFiles &&
      Object.keys(uploadFiles).filter((fileId) => {
        return ["UPLOADING"].includes(uploadFiles[fileId].status);
      }).length
    ) {
      setHasItem(true);
    } else {
      setHasItem(false);
    }
  }, [uploadFiles]);

  useEffect(() => {
    (async () => {
      if (uploadFiles) {
        let filesAux = { ...uploadFiles };

        let fileIds = Object.keys(filesAux).filter((fileId) => {
          return ["COMPLETED", "FAILED"].includes(filesAux[fileId].status);
        });

        await Promise.all(
          fileIds.map((fileId) => {
            if (filesAux[fileId]) {
              delete filesAux[fileId];
            }
          })
        );
        setUploadFiles(filesAux);
      }
    })();
  }, []);

  return (
    <Fragment>
      <SeoHead pageName="File Uploader" />
      <SC.Container>
        <TopBar title="File Uploader" />
        <SC.Wrapper>
          {virtualApp ? (
            virtualApp.mediaHost === 2 ? (
              <FormUploader />
            ) : (
              <FormUploader_OLD />
            )
          ) : (
            <Fragment />
          )}
          <CardList />
        </SC.Wrapper>
      </SC.Container>
    </Fragment>
  );
}
