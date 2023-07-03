import React from "react";
import { useSetRecoilState } from "recoil";
import { StepOptionsAtom } from "../../../../../atoms/TestDriveAtom";
import StyledButton from "../../../../global/StyledButton";
import * as SC from "./TermsOfServiceStyledComponents";

export default function TermsOfService() {
  const setTestDriveStep = useSetRecoilState(StepOptionsAtom);

  return (
    <SC.Container>
      <SC.TermsOfServiceWrapper>
        <h1 className="title">Terms of Service</h1>
        <p>
          Date Effective: May, 2020
          <br />
          <br />
          This website (the “Site”) is owned and operated by Learnistic, LLC
          (“COMPANY” “we” or “us”). By using the Site, you agree to be bound by
          these Terms of Service and to use the Site in accordance with these
          Terms of Service, our EULA, our Privacy Policy, our Shipping Policy,
          our Return Policy and any additional terms and conditions that may
          apply to specific sections of the Site or to products and services
          available through the Site or from COMPANY. Accessing the Site, in any
          manner, whether automated or otherwise, constitutes use of the Site
          and your agreement to be bound by these Terms of Service. <br />
          <br />
          We reserve the right to change these Terms of Service or to impose new
          conditions on use of the Site, from time to time, in which case we
          will post the revised Terms of Service on this website. By continuing
          to use the Site after we post any such changes, you accept the Terms
          of Service, as modified.
          <br />
          <br />
        </p>
        <h1 className="title">Intellectual Property Rights</h1>
        <p>
          Our Limited License to You. This Site and all the materials available
          on the Site are the property of us and/or our affiliates or licensors,
          and are protected by copyright, trademark, and other intellectual
          property laws. The Site is provided solely for your personal
          noncommercial use. You may not use the Site or the materials available
          on the Site in a manner that constitutes an infringement of our rights
          or that has not been authorized by us. More specifically, unless
          explicitly authorized in these Terms of Service or by the owner of the
          materials, you may not modify, copy, reproduce, republish, upload,
          post, transmit, translate, sell, create derivative works, exploit, or
          distribute in any manner or medium (including by email or other
          electronic means) any material from the Site. You may, however, from
          time to time, download and/or print one copy of individual pages of
          the Site for your personal, non-commercial use, provided that you keep
          intact all copyright and other proprietary notices.
          <br />
          <br />
          Our service includes the licensing of SaaS to enable you to create
          your own apps. You understand and agree that our license to you to use
          such services is also contingent upon your assent to the terms of our
          End User License Agreement, without limitation, and your
          representations to us that you own all of the rights to any content
          you provide to us in order to enable features of that service on your
          behalf, and that you grant to us a limited license to use such content
          for the purpose of providing the service to you. <br />
          <br />
          Your License to Us. By posting or submitting any material (including,
          without limitation, comments, blog entries, Facebook postings, photos
          and videos) to us via the Site, internet groups, social media venues,
          or to any of our staff via email, text or otherwise (the “Postings”),
          as well as by providing any information or content in order to enable
          features of our service, including but not limited to your CRM,
          digital content, training and courses (collectively, the “Course
          Content”), you are representing: (i) that you are the owner of the
          material, or are making your posting or submission with the express
          consent of the owner of the material; and (ii) that you are thirteen
          years of age or older. In addition, when you submit, email, text or
          deliver or post any Postings material, you are granting us, and anyone
          authorized by us, a royalty-free, perpetual, irrevocable,
          non-exclusive, unrestricted, worldwide license to use, transmit, and
          display such material, in whole or in part, in any manner or medium,
          now known or hereafter developed, for the purpose of fulfilling our
          obligations to you. In addition, when you submit, email, text or
          deliver or post any Course Content material, you are granting us, and
          anyone authorized by us, a royalty-free, perpetual, non-exclusive,
          unrestricted, worldwide license to transmit, and display such
          material, in whole or in part, in connection with our provision of our
          service to you. The foregoing grants shall include the right to
          exploit any proprietary rights in such posting or submission,
          including, but not limited to, rights under copyright, trademark,
          service mark or patent laws under any relevant jurisdiction. Also, in
          connection with the exercise of such rights, you grant us, and anyone
          authorized by us, the right to identify you as the author of any of
          your Postings or Course Content by name, email address or screen name,
          as we deem appropriate. You can end the license to your Course Content
          at any time by contacting us at help@learnistic.com.
          <br />
          <br />
          Your License to Us. By posting or submitting any material (including,
          without limitation, comments, blog entries, Facebook postings, photos
          and videos) to us via the Site, internet groups, social media venues,
          or to any of our staff via email, text or otherwise (the “Postings”),
          as well as by providing any information or content in order to enable
          features of our service, including but not limited to your CRM,
          digital content, training and courses (collectively, the “Course
          Content”), you are representing: (i) that you are the owner of the
          material, or are making your posting or submission with the express
          consent of the owner of the material; and (ii) that you are thirteen
          years of age or older. In addition, when you submit, email, text or
          deliver or post any Postings material, you are granting us, and anyone
          authorized by us, a royalty-free, perpetual, irrevocable,
          non-exclusive, unrestricted, worldwide license to use, transmit, and
          display such material, in whole or in part, in any manner or medium,
          now known or hereafter developed, for the purpose of fulfilling our
          obligations to you. In addition, when you submit, email, text or
          deliver or post any Course Content material, you are granting us, and
          anyone authorized by us, a royalty-free, perpetual, non-exclusive,
          unrestricted, worldwide license to transmit, and display such
          material, in whole or in part, in connection with our provision of our
          service to you. The foregoing grants shall include the right to
          exploit any proprietary rights in such posting or submission,
          including, but not limited to, rights under copyright, trademark,
          service mark or patent laws under any relevant jurisdiction. Also, in
          connection with the exercise of such rights, you grant us, and anyone
          authorized by us, the right to identify you as the author of any of
          your Postings or Course Content by name, email address or screen name,
          as we deem appropriate. You can end the license to your Course Content
          at any time by contacting us at help@learnistic.com. <br />
          <br /> You acknowledge and agree that any contributions originally
          created by you for us shall be deemed a “work made for hire” when the
          work performed is within the scope of the definition of a work made
          for hire in Section 101 of the United States Copyright Law, as
          amended. As such, the copyrights in those works shall belong to
          COMPANY from their creation. Thus, COMPANY shall be deemed the author
          and exclusive owner thereof and shall have the right to exploit any or
          all of the results and proceeds in any and all media, now known or
          hereafter devised, throughout the universe, in perpetuity, in all
          languages, as COMPANY determines. In the event that any of the results
          and proceeds of your submissions hereunder are not deemed a “work made
          for hire” under Section 101 of the Copyright Act, as amended, you
          hereby, without additional compensation, irrevocably assign, convey
          and transfer to COMPANY all proprietary rights, including without
          limitation, all copyrights and trademarks throughout the universe, in
          perpetuity in every medium, whether now known or hereafter devised, to
          such material and any and all right, title and interest in and to all
          such proprietary rights in every medium, whether now known or
          hereafter devised, throughout the universe, in perpetuity. Any posted
          material which are reproductions of prior works by you shall be
          co-owned by us.
        </p>
        <SC.ButtonsWrapper>
          <StyledButton
            onClick={() => setTestDriveStep("NEW_PASSCODE")}
            variant="outlined"
          >
            Back
          </StyledButton>
          <StyledButton onClick={() => setTestDriveStep("APP_SETUP")}>
            Accept Terms
          </StyledButton>
        </SC.ButtonsWrapper>
      </SC.TermsOfServiceWrapper>
    </SC.Container>
  );
}
