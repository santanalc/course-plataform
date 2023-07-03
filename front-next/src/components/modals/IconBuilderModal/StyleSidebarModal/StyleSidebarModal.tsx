import { FaImage } from "react-icons/fa";
import FormGradient from "./Forms/FormGradient";
import FormSolid from "./Forms/FormSolid";
import FormImage from "./Forms/FormImage";
import * as SC from "./StyleSidebarModalStyledComponents";
import { useRecoilState } from "recoil";
import { IconBuilderAtom } from "../../../../atoms/IconBuilderAtom";

export default function StyleSidebarModal() {
  const [iconBuilder, setIconBuilder] = useRecoilState(IconBuilderAtom);

  function returnBody(currentSelected: string) {
    if (currentSelected === "GRADIENT") return <FormGradient />;
    if (currentSelected === "SOLID") return <FormSolid />;
    if (currentSelected === "IMAGE") return <FormImage />;
    return <FormGradient />;
  }

  return (
    <SC.Container>
      <SC.FormContent>
        <h1 className="title">Background type</h1>
        <SC.BackgroundTypeWrapper>
          <SC.BackgroundTypeCard
            className={
              iconBuilder.background_type === "GRADIENT" ? "active" : ""
            }
            onClick={() =>
              setIconBuilder({ ...iconBuilder, background_type: "GRADIENT" })
            }
          >
            <div className="box-wrapper gradient" />
            <h1 className="card-title">Gradient</h1>
          </SC.BackgroundTypeCard>

          <SC.BackgroundTypeCard
            className={iconBuilder.background_type === "SOLID" ? "active" : ""}
            onClick={() =>
              setIconBuilder({ ...iconBuilder, background_type: "SOLID" })
            }
          >
            <div className="box-wrapper solid" />
            <h1 className="card-title">Solid</h1>
          </SC.BackgroundTypeCard>

          <SC.BackgroundTypeCard
            className={iconBuilder.background_type === "IMAGE" ? "active" : ""}
            onClick={() =>
              setIconBuilder({ ...iconBuilder, background_type: "IMAGE" })
            }
          >
            <div className="box-wrapper image">
              <FaImage />
            </div>
            <h1 className="card-title">Image</h1>
          </SC.BackgroundTypeCard>
        </SC.BackgroundTypeWrapper>

        {returnBody(iconBuilder.background_type)}
      </SC.FormContent>
    </SC.Container>
  );
}
