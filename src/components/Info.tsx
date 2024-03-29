import React, { useContext } from "react";
import { GithubContext } from "../context/context";
import styled from "styled-components";
import { GoRepo, GoGist } from "react-icons/go";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import Item from "./inner-components/Item";

const UserInfo = () => {
  const { githubUser } = useContext(GithubContext);
  const { public_repos, followers, following, public_gists } = githubUser;

  const items = [
    {
      icon: <GoRepo className="icon" />,
      label: "repos",
      value: public_repos,
      color: "pink",
    },
    {
      icon: <FiUsers className="icon" />,
      label: "followers",
      value: followers,
      color: "green",
    },
    {
      icon: <FiUserPlus className="icon" />,
      label: "following",
      value: following,
      color: "purple",
    },
    {
      icon: <GoGist className="icon" />,
      label: "gits",
      value: public_gists,
      color: "yellow",
    },
  ];

  const renderedContent = items.map((item, index) => {
    return <Item key={index} {...item}></Item>;
  });

  return (
    <section className="section">
      <Wrapper className="section-center">{renderedContent}</Wrapper>
    </section>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;

export default UserInfo;
