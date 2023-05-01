import React, { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
import ChartDataType from "../types/ChartDataType";

function Repos(): JSX.Element {
  const { repos } = useContext(GithubContext);
  const languages = repos.reduce(
    (
      total: { [key: string]: { label: string; value: number; stars: number } },
      item
    ) => {
      const { language, stargazers_count } = item;
      if (!language) return total;
      if (!total[language]) {
        total[language] = {
          label: language,
          value: 1,
          stars: stargazers_count,
        };
      } else {
        total[language] = {
          ...total[language],
          value: total[language].value + 1,
          stars: total[language].stars + 1,
        };
      }
      return total;
    },
    {}
  );

  const mostUsedLanguages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostPopluarLanguages = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  type NestedObjectType = {
    [key: string]: {
      label: string;
      value: number;
    };
  };

  const { stars, forks }: { stars: NestedObjectType; forks: NestedObjectType } =
    repos.reduce(
      (total: any, item) => {
        const { stargazers_count, name, forks } = item;
        total.stars[stargazers_count] = {
          label: name,
          value: stargazers_count,
        };
        total.forks[forks] = {
          label: name,
          value: forks,
        };
        return total;
      },
      {
        stars: {},
        forks: {},
      }
    );

  const starsData: ChartDataType = Object.values(stars).slice(-5).reverse();
  const forksData = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsedLanguages} />
        <Column3D data={starsData} />
        <Doughnut2D data={mostPopluarLanguages} />
        <Bar3D data={forksData} />
      </Wrapper>
    </section>
  );
}

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
