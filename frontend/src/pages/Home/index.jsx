import React, { Fragment } from "react";
import Banner from "../../components/Banner";
import About from "../../components/About";
import Servicos from "../../components/Servicos/Servicos";

const Home = () => {
  return (
    <Fragment>
      <section id="inicio">
        <Banner />
      </section>

      <section id="sobre-nos">
        <About />
      </section>

      <section id="servicos">
        <Servicos />
      </section>
    </Fragment>
  );
};

export default Home;
