/** @jsxImportSource @emotion/react */
import { gql, useApolloClient } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCamera, FaCopy, FaRedo } from "react-icons/fa";
import { SingleValue } from "react-select";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  SettingsAppBackgroundColorAtom,
  SettingsAppButtonColorAtom,
  SettingsAppHighlightColorAtom,
  isLoadingOnSettingsAtom,
  SettingsAppTitleBarColorAtom,
} from "../../../../../atoms/SettingsAppAtom";
import { VirtualAppAtom } from "../../../../../atoms/VirtualAppAtom";
import {
  BottomBarTypeEnum,
  GetAppSettingsQuery,
  GetAppSettingsQueryVariables,
  UpdateVirtualAppMutation,
  UpdateVirtualAppMutationVariables,
} from "../../../../../generated/graphql";
import StyledButton from "../../../../global/StyledButton";
import StyledIconButton from "../../../../global/StyledIconButton";
import StyledInput from "../../../../global/StyledInput";
import StyledSelect from "../../../../global/StyledSelect";
import StyledShimmer from "../../../../global/StyledShimmer";
import { UPDATE_VIRTUAL_APP } from "../Profile/Profile";
import { COLOR_THEME, HOURS } from "./AppHelpers";
import * as SC from "./AppStyledComponents";
import ColorPickerFields from "./ColorPickerFields/ColorPickerFields";

export const GET_APP_SETTING = gql`
  query GetAppSettings($virtualAppId: String!) {
    getVirtualApp(virtualAppId: $virtualAppId) {
      titleBarColor
      logo
      highlightColor
      ctaColor
      backgroundColor
      name
      bottomBarPref
      bottombarHidden
      appKey
      notificationIntervalHour
      inviteUserLink
    }
  }
`;

interface AppProps {
  bottomNavigationColor: {
    value: string;
    label: string;
  };
  setBottomNavigationColor: Dispatch<
    SetStateAction<{
      value: string;
      label: string;
    }>
  >;
}

type UpdateButtonProps = {
  loadingSave: boolean;
  setLoadingSave: Dispatch<SetStateAction<boolean>>;
  bottomNavigationColor: {
    value: string;
    label: string;
  };
  setBottomNavigationColor: Dispatch<
    SetStateAction<{
      value: string;
      label: string;
    }>
  >;
  setIsEditing: Dispatch<SetStateAction<boolean>>;

  appName: string;
  appAPIKey: string;
  inviteUserAPILink: string;

  pushProtectionWindow: {
    value: string;
    label: string;
  };

  setAppNameError: Dispatch<SetStateAction<boolean>>;
  setTitleBarColorError: Dispatch<SetStateAction<boolean>>;
  setButtonColorError: Dispatch<SetStateAction<boolean>>;
  setBackgroundColorError: Dispatch<SetStateAction<boolean>>;
  setHighlightColorError: Dispatch<SetStateAction<boolean>>;
  setAppAPIKeyError: Dispatch<SetStateAction<boolean>>;
  setInviteUserAPILinkError: Dispatch<SetStateAction<boolean>>;
  setBottomNavigationColorError: Dispatch<SetStateAction<boolean>>;
  setPushProtectionWindowError: Dispatch<SetStateAction<boolean>>;
};

function UpdateButton(props: UpdateButtonProps) {
  const {
    loadingSave,
    setLoadingSave,
    bottomNavigationColor,
    setBottomNavigationColor,
    appName,
    appAPIKey,
    inviteUserAPILink,
    pushProtectionWindow,

    setIsEditing,
    setAppNameError,
    setTitleBarColorError,
    setButtonColorError,
    setBackgroundColorError,
    setHighlightColorError,
    setAppAPIKeyError,
    setInviteUserAPILinkError,
    setBottomNavigationColorError,
    setPushProtectionWindowError,
  } = props;

  const virtualApp = useRecoilValue(VirtualAppAtom);
  const client = useApolloClient();

  const titleBarColor = useRecoilValue(SettingsAppTitleBarColorAtom);
  const buttonColor = useRecoilValue(SettingsAppButtonColorAtom);
  const backgroundColor = useRecoilValue(SettingsAppBackgroundColorAtom);
  const highlightColor = useRecoilValue(SettingsAppHighlightColorAtom);
  const toast = useToast();

  function validationSettings() {
    if (!virtualApp) return false;

    let hasError = false;

    const reg = new RegExp("^((0x){0,1}|#{0,1})([0-9a-f]{8}|[0-9a-f]{6})$");

    if (!appName) {
      hasError = true;
      setAppNameError(true);
    }
    if (!titleBarColor || !reg.test(titleBarColor)) {
      hasError = true;
      setTitleBarColorError(true);
    }
    if (!buttonColor || !reg.test(buttonColor)) {
      hasError = true;
      setButtonColorError(true);
    }
    if (!backgroundColor || !reg.test(backgroundColor)) {
      hasError = true;
      setBackgroundColorError(true);
    }
    if (!highlightColor || !reg.test(highlightColor)) {
      hasError = true;
      setHighlightColorError(true);
    }
    if (!bottomNavigationColor.value) {
      hasError = true;
      setBottomNavigationColorError(true);
    }
    if (!appAPIKey) {
      hasError = true;
      setAppAPIKeyError(true);
    }
    if (!inviteUserAPILink) {
      hasError = true;
      setInviteUserAPILinkError(true);
    }
    if (!pushProtectionWindow.value) {
      hasError = true;
      setPushProtectionWindowError(true);
    }

    if (hasError) {
      toast({
        title: "Form error",
        description: "Fields invalids",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoadingSave(false);

      return false;
    }

    const data = {
      name: appName,
      titleBarColor: titleBarColor,
      ctaColor: buttonColor,
      backgroundColor: backgroundColor,
      highlightColor: highlightColor,
      appKey: appAPIKey,
      inviteUserLink: inviteUserAPILink,
      bottomBarPref: bottomNavigationColor.value as BottomBarTypeEnum,
      notificationIntervalHour: parseInt(pushProtectionWindow.value, 10),
    };

    return data;
  }

  async function updateProfile() {
    const data = validationSettings();

    if (!data || !virtualApp?.id) return;

    await client.mutate<
      UpdateVirtualAppMutation,
      UpdateVirtualAppMutationVariables
    >({
      mutation: UPDATE_VIRTUAL_APP,
      variables: {
        data: data,
        virtualAppId: virtualApp?.id,
      },
    });

    toast({
      title: `The virtual app was successfully edited`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });

    setLoadingSave(false);
    setIsEditing(false);
  }

  return (
    <StyledButton
      isLoading={loadingSave}
      onClick={() => {
        if (loadingSave) return;
        setLoadingSave(true);
        updateProfile();
      }}
    >
      Save changes
    </StyledButton>
  );
}

export default function App({
  bottomNavigationColor,
  setBottomNavigationColor,
}: AppProps) {
  const setIsLoadingOnSettings = useSetRecoilState(isLoadingOnSettingsAtom);
  const [isLoading, setIsLoading] = useState(true);

  const setTitleBarColor = useSetRecoilState(SettingsAppTitleBarColorAtom);
  const setButtonColor = useSetRecoilState(SettingsAppButtonColorAtom);
  const setBackgroundColor = useSetRecoilState(SettingsAppBackgroundColorAtom);
  const setHighlightColor = useSetRecoilState(SettingsAppHighlightColorAtom);

  const [isEditing, setIsEditing] = useState(false);
  const [appName, setAppName] = useState("");
  const [appAPIKey, setAppAPIKey] = useState("");
  const [inviteUserAPILink, setInviteUserAPILink] = useState("");
  const [pushProtectionWindow, setPushProtectionWindow] = useState({
    value: "",
    label: "",
  });
  const [timezone, setTimezone] = useState("");
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const client = useApolloClient();

  const [loadingSave, setLoadingSave] = useState(false);

  const [appNameError, setAppNameError] = useState(false);
  const [titleBarColorError, setTitleBarColorError] = useState(false);
  const [bottomNavigationColorError, setBottomNavigationColorError] =
    useState(false);
  const [buttonColorError, setButtonColorError] = useState(false);
  const [backgroundColorError, setBackgroundColorError] = useState(false);
  const [highlightColorError, setHighlightColorError] = useState(false);
  const [appAPIKeyError, setAppAPIKeyError] = useState(false);
  const [inviteUserAPILinkError, setInviteUserAPILinkError] = useState(false);
  const [pushProtectionWindowError, setPushProtectionWindowError] =
    useState(false);

  function timezoneOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setTimezone(newValue?.value!);
  }

  useEffect(() => {
    if (!virtualApp?.id) return;

    (async () => {
      try {
        let response = await client.query<
          GetAppSettingsQuery,
          GetAppSettingsQueryVariables
        >({
          query: GET_APP_SETTING,
          variables: { virtualAppId: virtualApp?.id },
        });

        const data = response.data.getVirtualApp;

        if (data) {
          setAppName(data.name);
          setTitleBarColor(data.titleBarColor || "");
          setButtonColor(data.ctaColor || "");
          setBackgroundColor(data.backgroundColor || "");
          setHighlightColor(data.highlightColor || "");
          setAppAPIKey(data.appKey || "");
          setInviteUserAPILink(data.inviteUserLink || "");

          const colorOpt = COLOR_THEME.find(
            (elm) => elm.value === data.bottomBarPref
          );

          if (colorOpt) {
            setBottomNavigationColor(colorOpt);
          }

          const hourOpt = HOURS.find(
            (elm) => elm.value === data.notificationIntervalHour?.toString()
          );

          if (hourOpt) {
            setPushProtectionWindow(hourOpt);
          }

          setIsLoading(false);
          setIsLoadingOnSettings(false);
        }
      } catch (e) {}
    })();
  }, [virtualApp?.id]);

  return (
    <SC.Container>
      <SC.HeaderWrapper>
        <h1 className="title">App</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quasi
          molestias iure quisquam, doloremque consectetur porro suscipit ducimus
          accusamus dolorum. Eligendi quam earum ab dolor, accusantium tempore
          beatae dolorum libero?
        </p>
      </SC.HeaderWrapper>

      <SC.Content>
        <SC.AvatarContainer>
          <SC.AvatarWrapper>
            <span className="icon-wrapper">
              <StyledIconButton
                variant="filled"
                icon={<FaCamera />}
                onClick={() => {}}
              />
            </span>
          </SC.AvatarWrapper>
          {isLoading ? (
            <StyledShimmer
              style={{ width: "160px", marginTop: "16px" }}
              className="shimmer"
            />
          ) : (
            <h1 className="avatar-name">{appName}</h1>
          )}
        </SC.AvatarContainer>

        <div className="divider" />
        <h1 className="title">App Settings</h1>
        <p className="description">
          Lorem ipsum dolor sit amet. Quod quasi molestias iure quisquam,
          doloremque consectetur porro suscipit ducimus accusamus dolorum.
        </p>

        <SC.FormContent>
          <SC.FormWrapper>
            <label>App Name</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "200px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Enter your app name"
                error={appNameError}
              />
            ) : (
              <p className="result">{appName}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper dontHaveBorderBottom>
            <label>Push Protection Window</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "240px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledSelect
                onChange={(opt) =>
                  setPushProtectionWindow({
                    value: opt?.value || "",
                    label: opt?.label || "",
                  })
                }
                options={HOURS}
                placeholder="Select a hour"
                defaultValue={pushProtectionWindow}
              />
            ) : (
              <p className="result">{pushProtectionWindow.label}</p>
            )}
          </SC.FormWrapper>

          {/* <SC.FormWrapper dontHaveBorderBottom>
            <label>Timezone</label>
            {isEditing ? (
              <StyledSelect
                onChange={timezoneOnChange}
                options={TIMEZONES}
                placeholder="Select a timezone"
              />
            ) : (
              <p className="result">{timezone}</p>
            )}
          </SC.FormWrapper> */}
        </SC.FormContent>

        <div className="divider" />
        <h1 className="title">Color Theme</h1>
        <p className="description">
          Lorem ipsum dolor sit amet. Quod quasi molestias iure quisquam,
          doloremque consectetur porro suscipit ducimus accusamus dolorum.
        </p>

        <ColorPickerFields
          isEditing={isEditing}
          buttonColorError={buttonColorError}
          setButtonColorError={setButtonColorError}
          titleBarColorError={titleBarColorError}
          setTitleBarColorError={setTitleBarColorError}
          backgroundColorError={backgroundColorError}
          setBackgroundColorError={setBackgroundColorError}
          highlightColorError={highlightColorError}
          setHighlightColorError={setHighlightColorError}
        />

        <div className="divider" />

        <SC.FormWrapper
          css={css`
            padding: 0 16px;
          `}
          dontHaveBorderBottom
        >
          <label>Bottom Navigation</label>
          {isEditing ? (
            <StyledSelect
              onChange={(opt) => {
                setBottomNavigationColor({
                  value: opt?.value || "",
                  label: opt?.label || "",
                });

                setBottomNavigationColorError(false);
              }}
              options={COLOR_THEME}
              defaultValue={bottomNavigationColor}
              placeholder="Select a color theme"
              error={bottomNavigationColorError}
            />
          ) : (
            <StyledInput
              readOnly={!isEditing}
              value={bottomNavigationColor.label}
            />
          )}
        </SC.FormWrapper>

        <div className="divider" />

        <h1 className="title">API Configuration</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
          quam earum ab dolor, accusantium tempore beatae dolorum libero?
        </p>

        <SC.FormContent>
          <SC.FormWrapper>
            <label>App API Key</label>
            <SC.InputWrapper>
              <StyledInput
                readOnly={!isEditing}
                value={appAPIKey}
                onChange={(e) => {
                  setAppAPIKey(e.target.value);
                  setAppAPIKeyError(false);
                }}
                placeholder="Enter your app API key"
                error={appAPIKeyError}
              />
              <StyledIconButton
                className="refresh"
                variant="filled"
                icon={<FaRedo />}
                onClick={() => {}}
                tooltipLabel="Re-Sync App API Key"
                tooltipPlacement="top"
              />
              <StyledIconButton
                className="copy"
                variant="filled"
                icon={<FaCopy />}
                onClick={() => {}}
                tooltipLabel="Copy to clipboard"
                tooltipPlacement="top"
              />
            </SC.InputWrapper>
          </SC.FormWrapper>

          <SC.FormWrapper dontHaveBorderBottom>
            <label>Invite User API Link</label>
            <SC.InputWrapper>
              <StyledInput
                readOnly={!isEditing}
                value={inviteUserAPILink}
                onChange={(e) => {
                  setInviteUserAPILink(e.target.value);
                  setInviteUserAPILinkError(false);
                }}
                placeholder="Enter your invite user API link"
                error={inviteUserAPILinkError}
              />
              <StyledIconButton
                className="copy"
                variant="filled"
                icon={<FaCopy />}
                onClick={() => {}}
                tooltipLabel="Copy to clipboard"
                tooltipPlacement="top"
              />
            </SC.InputWrapper>
          </SC.FormWrapper>
        </SC.FormContent>

        <div className="divider" />

        <SC.ButtonsWrapper>
          {isEditing ? (
            <>
              <StyledButton
                onClick={() => setIsEditing(false)}
                variant="outlined"
              >
                Cancel
              </StyledButton>
              <UpdateButton
                loadingSave={loadingSave}
                setLoadingSave={setLoadingSave}
                bottomNavigationColor={bottomNavigationColor}
                setBottomNavigationColor={setBottomNavigationColor}
                appName={appName}
                appAPIKey={appAPIKey}
                inviteUserAPILink={inviteUserAPILink}
                pushProtectionWindow={pushProtectionWindow}
                setIsEditing={setIsEditing}
                setAppNameError={setAppNameError}
                setTitleBarColorError={setTitleBarColorError}
                setButtonColorError={setButtonColorError}
                setBackgroundColorError={setBackgroundColorError}
                setHighlightColorError={setHighlightColorError}
                setAppAPIKeyError={setAppAPIKeyError}
                setInviteUserAPILinkError={setInviteUserAPILinkError}
                setBottomNavigationColorError={setBottomNavigationColorError}
                setPushProtectionWindowError={setPushProtectionWindowError}
              />
            </>
          ) : (
            <StyledButton onClick={() => setIsEditing(true)}>
              Edit app
            </StyledButton>
          )}
        </SC.ButtonsWrapper>
      </SC.Content>
    </SC.Container>
  );
}
