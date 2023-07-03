import React, { Fragment, useState } from "react";
import { FaPlay } from "react-icons/fa";
import SeoHead from "../../components/global/SeoHead";
import TopBar from "../../components/global/TopBar";
import StyledIconButton from "../../components/global/StyledIconButton";
import ProductsFilterBar from "../../components/screens/Products/ProductsFilterBar/ProductsFilterBar";
import EmptyProductsList from "../../components/screens/Products/EmptyProductsList/EmptyProductsList";
import DefaultCard from "../../components/screens/Products/DefaultCard/DefaultCard";
import { PRODUCTS_ITEMS } from "../../components/screens/Products/ProductsListHelpers";
import ProductsSidebarFilter from "../../components/screens/Products/ProductsSidebarFilter/ProductsSidebarFilter";
import * as SC from "./styled";

export default function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Fragment>
      <SeoHead pageName="Products" />
      <SC.Container>
        <TopBar
          title="Products"
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Products video"
            />
          }
        />
        {true ? (
          <Fragment>
            <ProductsFilterBar
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
            <SC.Wrapper>
              <SC.ListWrapper>
                {PRODUCTS_ITEMS.map((product) => (
                  <DefaultCard
                    key={product.title}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    src={product.src}
                    status={product.status}
                  />
                ))}
              </SC.ListWrapper>
            </SC.Wrapper>
          </Fragment>
        ) : (
          <EmptyProductsList />
        )}
        <ProductsSidebarFilter
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      </SC.Container>
    </Fragment>
  );
}
