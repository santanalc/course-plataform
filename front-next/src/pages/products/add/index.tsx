/** @jsxImportSource @emotion/react */
import { FaPlay } from "react-icons/fa";
import SeoHead from "../../../components/global/SeoHead";
import StyledIconButton from "../../../components/global/StyledIconButton";
import TopBar from "../../../components/global/TopBar";
import AddProductsPhoneMock from "../../../components/screens/AddProducts/AddProductsPhoneMock/AddProductsPhoneMock";
import AddProductsForm from "../../../components/screens/AddProducts/AddProductsForm/AddProductsForm";
import { useRouter } from "next/dist/client/router";
import * as SC from "./styled";
import { Fragment } from "react";

export default function AddProducts() {
  const router = useRouter();

  return (
    <Fragment>
      <SeoHead pageName="New Product" />
      <SC.Container>
        <TopBar
          title="New Product"
          onClickButtonBack={() => router.push("/products")}
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="New product video"
            />
          }
        />
        <SC.Wrapper>
          <AddProductsForm />
          <AddProductsPhoneMock />
        </SC.Wrapper>
      </SC.Container>
    </Fragment>
  );
}
