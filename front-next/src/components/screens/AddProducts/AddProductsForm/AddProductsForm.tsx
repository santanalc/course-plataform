/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as SC from "./AddProductsFormStyledComponents";
import { useRecoilState } from "recoil";
import {
  ProductSelectedArticleAtom,
  ProductTitleAtom,
  ProductMediaAtom,
  ProductSelectedCourseAtom,
  ProductIAPPriceAtom,
} from "../../../../atoms/AddProductsAtom";
import StyledInput from "../../../global/StyledInput";
import StyledDropImage from "../../../global/StyledDropImage";
import StyledButton from "../../../global/StyledButton";

export default function AddProductsForm() {
  const [article, setArticle] = useRecoilState(ProductSelectedArticleAtom);
  const [title, setTitle] = useRecoilState(ProductTitleAtom);
  const [image, setImage] = useRecoilState(ProductMediaAtom);
  const [course, setCourse] = useRecoilState(ProductSelectedCourseAtom);
  const [price, setPrice] = useRecoilState(ProductIAPPriceAtom);

  return (
    <SC.Container>
      <SC.FormContent
        css={css`
          grid-template-columns: 0.5fr;
        `}
      >
        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Article</label>
          </SC.LabelWrapper>
          <StyledInput
            value={article}
            onChange={(e) => {
              setArticle(e.target.value);
            }}
            placeholder="Select an article"
          />
        </SC.FormWrapper>
      </SC.FormContent>

      <SC.FormContent>
        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Product Title</label>
            <label className="optional">{title.length.toString()}/30</label>
          </SC.LabelWrapper>
          <StyledInput
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter product title"
            error={title.length > 30}
          />
        </SC.FormWrapper>

        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Default Product Media</label>
          </SC.LabelWrapper>
          <StyledDropImage
            heightLimit={500}
            widthLimit={500}
            title="Drop file to upload article icon"
            description="500 x 500px"
            src={image.src}
            alt={image.alt}
            setImage={(vle) => setImage(vle)}
          />
        </SC.FormWrapper>
      </SC.FormContent>

      <SC.FormContent
        css={css`
          grid-template-columns: 0.65fr 0.35fr;
        `}
      >
        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Enroll in a course</label>
          </SC.LabelWrapper>
          <StyledInput
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
            }}
            placeholder="Search for courses"
            hasIcon
          />
        </SC.FormWrapper>

        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>IAP Price</label>
          </SC.LabelWrapper>
          <StyledInput
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="number"
            placeholder="Enter IAP price"
          />
        </SC.FormWrapper>
      </SC.FormContent>

      <div className="line" />

      <StyledButton>Submit for App Store Approval</StyledButton>
    </SC.Container>
  );
}
