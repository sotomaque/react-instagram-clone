import React from "react";
import Helment from 'react-helmet';

function SEO({ title }) {
  const titleText = title ? `${title} · Finstagram` : "Finstagram";

  return (
    <Helment>
      <title>{titleText}</title>
    </Helment>
  )
}

export default SEO;
