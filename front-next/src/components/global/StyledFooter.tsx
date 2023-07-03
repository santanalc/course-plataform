import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
`;

const LinkList = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 24px;
`;

const LinkElement = styled.a`
  font-size: 13px;
  font-weight: 700;
  color: #6b6b6b;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #6b6b6b;
  text-align: center;
`;

const LINK_ARRAY = [
  {
    href: "https://learnistic.com/pp",
    label: "Privacy Policy",
  },
  {
    href: "https://learnistic.com/tos",
    label: "Terms of Service",
  },
  {
    href: "https://learnistic.com/eula",
    label: "End User License Agreement",
  },
  {
    href: "https://learnistic.com/cancellation",
    label: "Refunds & Cancellations Policy",
  },
];

export default function StyledFooter() {
  return (
    <Wrapper>
      <LinkList>
        {LINK_ARRAY.map((link) => (
          <LinkElement key={link.href} href={link.href} target="_blank">
            {link.label}
          </LinkElement>
        ))}
      </LinkList>

      <Text>
        © Learnistic LLC 2021. All rights reserved.
        <br />
        13506 Summerport Village Parkway #714, Windermere, FL 34786 — (407)
        377-7721
      </Text>
    </Wrapper>
  );
}
