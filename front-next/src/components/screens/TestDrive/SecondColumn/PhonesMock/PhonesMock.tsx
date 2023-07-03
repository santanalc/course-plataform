import React from "react";
import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { IoCartOutline, IoPlayOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import MobileStatusBarTestDrive from "../../../../../../public/test-drive/MobileStatusBarTestDrive";
import { IconBuilderBackgroundColorAtom } from "../../../../../atoms/IconBuilderAtom";
import {
  SettingsAppBackgroundColorAtom,
  SettingsAppButtonColorAtom,
  SettingsAppHighlightColorAtom,
  SettingsAppTitleBarColorAtom,
} from "../../../../../atoms/SettingsAppAtom";
import * as SC from "./PhonesMockStyledComponents";

export default function PhonesMock() {
  const titleBarColor = useRecoilValue(SettingsAppTitleBarColorAtom);
  const buttonColor = useRecoilValue(SettingsAppButtonColorAtom);
  const backgroundColor = useRecoilValue(SettingsAppBackgroundColorAtom);
  const highlightColor = useRecoilValue(SettingsAppHighlightColorAtom);

  return (
    <SC.Container>
      <SC.TextWrapper>
        <h1 className="title">A Preview of Your App</h1>
        <p className="description">
          Have fun and don’t worry, you can always make changes later!
        </p>
      </SC.TextWrapper>
      <SC.PhonesWrapper>
        <SC.PhonesContainer>
          <img src="/test-drive/iPhone-11-black-mock.svg" alt="iPhone 11" />

          <SC.PhoneContentWrapper>
            <MobileStatusBarTestDrive color={titleBarColor} />

            <SC.TitleBar color={titleBarColor}>App Color Preview</SC.TitleBar>

            <img src="/test-drive/troy-video-app.svg" alt="Video" />

            <SC.FirstPhoneContent color={backgroundColor}>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard color={highlightColor} className="highlighted">
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard color={highlightColor} className="highlighted">
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>

              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
              <SC.FirstPhoneCard>
                <div className="fake-image" />
                <span className="text-wrapper">
                  <h1 className="title">Lesson title</h1>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim atque recusandae doloribus eligendi facere repellat
                    voluptate sint eveniet.
                  </p>
                </span>
              </SC.FirstPhoneCard>
            </SC.FirstPhoneContent>

            <SC.MobileNavigationBarWrapper color={titleBarColor}>
              <AiOutlineHome />
              <IoPlayOutline />
              <AiOutlineHeart />
              <BsChat />
              <IoCartOutline />
            </SC.MobileNavigationBarWrapper>
          </SC.PhoneContentWrapper>
        </SC.PhonesContainer>

        <SC.PhonesContainer>
          <img src="/test-drive/iPhone-11-black-mock.svg" alt="iPhone 11" />

          <SC.PhoneContentWrapper>
            <MobileStatusBarTestDrive color={titleBarColor} />

            <SC.TitleBar color={titleBarColor}>App Color Preview</SC.TitleBar>

            <img src="/test-drive/troy-audio-app.svg" alt="Audio" />

            <SC.SecondPhoneContent color={backgroundColor}>
              <SC.Button color={buttonColor}>Buy $7.99</SC.Button>

              <span className="text-wrapper">
                <h1 className="title">IS Mastery Audio Book</h1>
                <p className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
                  eiusmod tempor incididunt ut labore et dolore.
                  <br />
                  <br />
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo conseq.
                </p>
              </span>
            </SC.SecondPhoneContent>

            <SC.MobileNavigationBarWrapper color={titleBarColor}>
              <AiOutlineHome />
              <IoPlayOutline />
              <AiOutlineHeart />
              <BsChat />
              <IoCartOutline />
            </SC.MobileNavigationBarWrapper>
          </SC.PhoneContentWrapper>
        </SC.PhonesContainer>
      </SC.PhonesWrapper>
    </SC.Container>
  );
}
