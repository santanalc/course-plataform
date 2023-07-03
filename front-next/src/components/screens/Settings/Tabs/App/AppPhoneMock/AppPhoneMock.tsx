/** @jsxImportSource @emotion/react */
import AppPhoneMockContent from "./AppPhoneMockContent";
import AppPhoneMockCard from "./AppPhoneMockCard";
import * as SC from "./AppPhoneMockStyledComponents";
import { useRecoilValue } from "recoil";
import { isLoadingOnSettingsAtom } from "../../../../../../atoms/SettingsAppAtom";
import { Spinner } from "@chakra-ui/react";

interface AppPhoneMockProps {
  bottomNavigationColor: string;
}

export default function AppPhoneMock({
  bottomNavigationColor,
}: AppPhoneMockProps) {
  const isLoadinOnSettings = useRecoilValue(isLoadingOnSettingsAtom);

  if (isLoadinOnSettings) {
    return (
      <SC.SpinnerContainer>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="white"
          color="orange.300"
          size="xl"
        />
      </SC.SpinnerContainer>
    );
  }

  return (
    <SC.Container>
      <SC.MobileImageWrapper>
        <SC.MobileImage src="/global/mobile-mock.png" alt="Mobile" />
        <AppPhoneMockContent bottomNavigationColor={bottomNavigationColor}>
          <AppPhoneMockCard isHighlighted />
          <AppPhoneMockCard />
          <AppPhoneMockCard isHighlighted />
          <AppPhoneMockCard />
          <AppPhoneMockCard />
        </AppPhoneMockContent>
      </SC.MobileImageWrapper>
    </SC.Container>
  );
}
