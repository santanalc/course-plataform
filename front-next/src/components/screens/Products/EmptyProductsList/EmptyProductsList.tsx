import { useRouter } from "next/dist/client/router";
import React from "react";
import StyledButton from "../../../global/StyledButton";
import * as SC from "./EmptyProductsListStyledComponents";

export default function EmptyProductsList() {
  const router = useRouter();

  return (
    <SC.Container>
      <SC.Wrapper>
        <img src="/global/empty-product-list.svg" alt="No products to show" />
        <h1>No products to show</h1>
        <p>Would you like to create a new product?</p>
        <StyledButton onClick={() => router.push("/products/add")}>
          Create product
        </StyledButton>
      </SC.Wrapper>
    </SC.Container>
  );
}
