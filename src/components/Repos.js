import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import PieChart from "./Chart";

const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  //const {  } = repos;

  const chartData = {
    chart: {
      caption: "Used Languages",
      subCaption: "Some Kind Of Text Here",
      //xAxisName: "Country",
      //yAxisName: "Reserves (MMbbl)",
      numberSuffix: "%",
      theme: "fusion"
    },
    data: [
      {
        label: "HTML",
        value: "10"
      },
      {
        label: "CSS",
        value: "10"
      },
      {
        label: "Javascript",
        value: "80"
      }
    ]
  }

  return (
    <section className="section">
      <Wrapper className="section-center">
        <PieChart data={chartData} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
