import React from "react";
import { useRecoilValue } from "recoil";
import { SettingsAppHighlightColorAtom } from "../../../../../../atoms/SettingsAppAtom";
import * as SC from "./AppPhoneMockStyledComponents";

type AppPhoneMockCardProps = {
  isHighlighted?: boolean;
};

export default function AppPhoneMockCard({
  isHighlighted = false,
}: AppPhoneMockCardProps) {
  const highlightColor = useRecoilValue(SettingsAppHighlightColorAtom);

  if (isHighlighted) {
    return (
      <SC.Card className="highlighted" color={highlightColor}>
        <SC.IconWrapper>
          <SC.IconFake />
        </SC.IconWrapper>
        <span className="text-wrapper">
          <h1 className="card-title">Title goes here</h1>
          <p className="card-description">Description goes here</p>
        </span>
      </SC.Card>
    );
  }

  return (
    <SC.Card>
      <SC.IconWrapper>
        <SC.IconFake />
      </SC.IconWrapper>
      <span className="text-wrapper">
        <h1 className="card-title">Title goes here</h1>
        <p className="card-description">Description goes here</p>
      </span>
    </SC.Card>
  );
}
