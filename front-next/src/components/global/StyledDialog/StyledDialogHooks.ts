import { atom, useSetRecoilState } from "recoil";

//! Hooks that control Chakra components to mimic alert() and confirm()
interface DialogAlert {
  hasImage: boolean;
  hasCheckbox?: boolean;
  img?: JSX.Element | null;
  title: string;
  description: string;
  okButtonLabel?: string;
  okButtonColor?: string;
  onOkPressed?: (doNotWarnMeAgain: boolean) => void;
  colorTheme?: "orange" | "red" | "green";
}

interface DialogConfirm extends DialogAlert {
  cancelButtonLabel?: string;
}

export const DialogAlertAtom = atom<DialogAlert & { isOpen: boolean }>({
  key: "DialogAlertAtom",
  default: {
    hasImage: false,
    hasCheckbox: true,
    img: null,
    title: "",
    description: "",
    isOpen: false,
    colorTheme: "orange",
    okButtonColor: "",
  },
});

export const DialogConfirmAtom = atom<DialogConfirm & { isOpen: boolean }>({
  key: "DialogConfirmAtom",
  default: {
    hasImage: false,
    hasCheckbox: true,
    img: null,
    title: "",
    description: "",
    isOpen: false,
    colorTheme: "orange",
    okButtonColor: "",
  },
});

export function useDialog() {
  const setDialog = useSetRecoilState(DialogAlertAtom);
  const setConfirm = useSetRecoilState(DialogConfirmAtom);

  function alert(dialogData: DialogAlert) {
    setDialog({
      colorTheme: "orange",
      ...dialogData,
      isOpen: true,
    });
  }

  function confirm(confirmData: DialogConfirm) {
    setConfirm({
      ...confirmData,
      isOpen: true,
    });
  }

  return {
    alert,
    confirm,
  };
}
