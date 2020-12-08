import { graphql, useStaticQuery } from "gatsby";

import { MenuItem } from "@types";

export const generateMenu = (): MenuItem[] => {
  const {
    allMarkdownRemark,
  } = useStaticQuery<GatsbyTypes.MenuQueryQuery>(graphql`
    query MenuQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);
  const generatedArray: MenuItem[] = allMarkdownRemark.edges
    .map((node) => {
      return {
        name: node.node.frontmatter.slug,
        link: `/${node.node.frontmatter.slug}`,
      };
    })
    .sort((a: MenuItem, b: MenuItem) => b.name.length - a.name.length);

  return [
    {
      name: "index",
      link: "/",
    },
    ...generatedArray,
    {
      name: "blog",
      link: "https://medium.com/@romamore",
    },
  ];
};
