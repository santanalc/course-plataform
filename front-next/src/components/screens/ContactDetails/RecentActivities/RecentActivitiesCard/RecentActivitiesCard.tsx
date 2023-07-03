import React from "react";
import * as SC from "./RecentActivitiesCardStyledComponents";

export default function RecentActivitiesCard() {
  return (
    <SC.Container>
      <SC.InfoWrapper>
        <div className="circle"></div>
        <SC.TextWrapper>
          <h1>tag applied</h1>
          <p>Not Pirate was Applied</p>
        </SC.TextWrapper>
      </SC.InfoWrapper>

      <SC.DateText>Oct 29, 2021 at 9:45 am</SC.DateText>
    </SC.Container>
  );
}
