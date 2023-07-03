import React from "react";
import RecentActivitiesCard from "./RecentActivitiesCard/RecentActivitiesCard";

import * as SC from "./RecentActivitiesStyledComponents";

export default function RecentActivities() {
  return (
    <SC.Container>
      <h1 className="title">Recent Activities</h1>

      <SC.ListWrapper>
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
        <RecentActivitiesCard />
      </SC.ListWrapper>
    </SC.Container>
  );
}
