import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import {
  MenuImageAtom,
  MenuImageLinkAtom,
} from "../../../../../atoms/MenuAtom";
import { MenuItemType, VirtualAppType } from "../../../../../generated/graphql";
import MenuManagementComponentItem from "../MenuManagementComponentItem/MenuManagementComponentItem";
import * as SC from "./MenuManagementContentComponents";

type MenuManagementContentProps = {
  menuItems: MenuItemType[];
  virtualApp: VirtualAppType | null;
};

export default function MenuManagementContent({
  menuItems,
  virtualApp,
}: MenuManagementContentProps) {
  const image = useRecoilValue(MenuImageAtom);
  const imageLink = useRecoilValue(MenuImageLinkAtom);

  return (
    <Fragment>
      {image.src || imageLink ? (
        <SC.BannerImage
          src={image.src || imageLink || ""}
          alt={image.alt || "thumbnail"}
        />
      ) : (
        <SC.BannerWrapper>
          <span className="banner-text-wrapper">
            <h1 className="title">Your branded banner goes here</h1>
            <p className="text">
              Design tip: To make your branded image flow as part of the app
              design, use the same background color like demonstrated here.
            </p>
          </span>
        </SC.BannerWrapper>
      )}

      <SC.CardWrapper>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <MenuManagementComponentItem key={item.id} menu={item} />
          ))
        ) : (
          <Fragment>
            <MenuManagementComponentItem isShimmer />
            <MenuManagementComponentItem isShimmer />
            <MenuManagementComponentItem isShimmer />
          </Fragment>
        )}
      </SC.CardWrapper>
    </Fragment>
  );
}
