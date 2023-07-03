/** @jsxImportSource @emotion/react */
import { AnimateSharedLayout, motion } from "framer-motion";
import { SettingsTabs } from "../../../../pages/settings";
import * as SC from "./SettingsNavigationStyledComponents";
import { css } from "@emotion/react";

interface Props {
  selected: SettingsTabs;
  handleSelected: (vle: SettingsTabs) => void;
}

export default function SettingsNavigation(props: Props) {
  const { selected, handleSelected } = props;

  let screens = [SettingsTabs.PROFILE, SettingsTabs.APP];

  return (
    <AnimateSharedLayout>
      <SC.Container>
        <SC.Grid>
          {screens.map((screen) => (
            <motion.div
              key={screen}
              css={css`
                margin: 0;
                position: relative;
                cursor: pointer;
              `}
              animate
              onClick={() => handleSelected(screen)}
            >
              {screen === selected && (
                <motion.div
                  layoutId="underline"
                  className="underline"
                  css={css`
                    width: 100%;
                    height: 3px;
                    background: var(--orange-300);
                    position: absolute;
                    top: 53px;
                    z-index: 1;
                    text-align: center;
                  `}
                />
              )}
            </motion.div>
          ))}

          <SC.NavigationButton
            onClick={() => {
              handleSelected(SettingsTabs.PROFILE);
            }}
          >
            Profile
          </SC.NavigationButton>

          <SC.NavigationButton
            onClick={() => {
              handleSelected(SettingsTabs.APP);
            }}
          >
            App
          </SC.NavigationButton>
        </SC.Grid>
      </SC.Container>
    </AnimateSharedLayout>
  );
}
