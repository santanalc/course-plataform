import {
  Avatar,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import {
  FaCog,
  FaGripHorizontal,
  FaInfo,
  FaPowerOff,
  FaVideo,
} from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import { useLogout } from "../../../../hooks/useLogout";
import AboutModal from "../../../modals/AboutUploader/AboutModal";

const PopoverTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 4px;

  font-size: 16px;
  color: #222222;

  .popover-name {
    font-weight: 600;
  }
`;

const SidebarPopoverButton = styled.li`
  width: 100%;

  padding: 8px 16px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;

  cursor: pointer;

  transition: background 0.2s ease-in-out;

  > svg {
    width: 12px;
    height: 12px;
    color: #222222;
  }

  > .button-text {
    font-size: 14px;
    font-weight: 400;
    color: #222222;
  }

  &:hover {
    background: var(--orange-300);

    .button-text {
      color: white;
    }

    svg {
      color: white;
    }
  }

  &.logout {
    &:hover {
      background: #dc143c;

      .button-text {
        color: white;
      }

      svg {
        color: white;
      }
    }
  }
`;

export default function FixedSidebarAvatarPopover() {
  const router = useRouter();
  const vApp = useRecoilValue(VirtualAppAtom);
  const user = useRecoilValue(UserAtom);
  const { logout } = useLogout();

  const {
    isOpen: isOpenCreateTagModal,
    onClose: onCloseCreateTagModal,
    onOpen: onOpenCreateTagModal,
  } = useDisclosure();

  return (
    <Popover id="sidebar-popover" placement="auto-end">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Avatar
              size="sm"
              name={vApp?.name || "A"}
              src="https://keycdn.sociallair.io/img_wFC47p22lQXWYvApU58dm.jpg"
              cursor="pointer"
            />
          </PopoverTrigger>

          <PopoverContent maxWidth="280px" padding="4px">
            <PopoverHeader>
              <PopoverTitle>
                Hello, <h1 className="popover-name">{vApp?.name || "A"}</h1>
              </PopoverTitle>
            </PopoverHeader>

            <PopoverBody as="ul" padding="4px 0">
              <SidebarPopoverButton onClick={onOpenCreateTagModal}>
                <FaInfo />
                <p className="button-text">About Uploader</p>
              </SidebarPopoverButton>

              {user?.virtualApps &&
              user.virtualApps.filter((v) => v?.mediaHost === 1 ||  v?.mediaHost === 2).length > 1 ? (
                <Link href="/apps">
                  <a>
                    <SidebarPopoverButton onClick={onClose}>
                      <FaGripHorizontal />
                      <p className="button-text">Switch App</p>
                    </SidebarPopoverButton>
                  </a>
                </Link>
              ) : (
                <></>
              )}

              <SidebarPopoverButton>
                <FaVideo />
                <p className="button-text">What&apos;s New</p>
              </SidebarPopoverButton>

              <Link href="/apps">
                <a>
                  <SidebarPopoverButton onClick={onClose}>
                    <FaGripHorizontal />
                    <p className="button-text">Switch App</p>
                  </SidebarPopoverButton>
                </a>
              </Link>

              <Link href="/settings">
                <a>
                  <SidebarPopoverButton onClick={onClose}>
                    <FaCog />
                    <p className="button-text">Settings</p>
                  </SidebarPopoverButton>
                </a>
              </Link>
            </PopoverBody>

            {/* <Link href="/settings">
                <a>
                  <SidebarPopoverButton onClick={onClose}>
                    <FaCog />
                    <p className="button-text">Settings</p>
                  </SidebarPopoverButton>
                </a>
              </Link> */}

            <PopoverFooter padding="4px 0 0" onClick={logout}>
              <SidebarPopoverButton className="logout">
                <FaPowerOff />
                <p className="button-text">Log Out</p>
              </SidebarPopoverButton>
            </PopoverFooter>
          </PopoverContent>
          <AboutModal
            isOpen={isOpenCreateTagModal}
            onClose={onCloseCreateTagModal}
          />
        </>
      )}
    </Popover>
  );
}
