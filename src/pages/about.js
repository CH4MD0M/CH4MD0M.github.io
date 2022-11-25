import React from "react";

import Layout from "../layout";
import Seo from "../components/Seo";
import PageTitle from "../components/PageTitle";
import Bio from "../components/Bio";
import Divider from "../components/Divider";

const AboutPage = () => {
  return (
    <Layout>
      <Seo title="About" />
      <PageTitle>About.</PageTitle>
      <Divider mt="4rem" />
      <Bio />
      <Divider />
    </Layout>
  );
};

export default AboutPage;
