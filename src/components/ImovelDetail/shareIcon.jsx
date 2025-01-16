import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";

const ShareIcon = ({ link, title, description, image }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginLeft: "10px" }}>
      <FacebookShareButton
        url={link}
        quote={title}
        hashtag="#Imoveis"
        description={description}
        media={image}
      >
        <FaFacebook size={24} color="#3b5998" />
      </FacebookShareButton>

      <WhatsappShareButton
        url={link}
        title={`${title} - ${description}`}
        separator=":: "
      >
        <FaWhatsapp size={24} color="#25d366" />
      </WhatsappShareButton>

      <TwitterShareButton
        url={link}
        title={title}
        via="MWConsultoria"
        hashtags={["Imoveis", "Consultoria"]}
        image={image}
      >
        <FaTwitter size={24} color="#1da1f2" />
      </TwitterShareButton>
    </div>
  );
};

export default ShareIcon;
