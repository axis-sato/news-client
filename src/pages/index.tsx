import { NextPage } from "next";
import useSWR from "swr";
import { ArticleApi, Configuration, Article } from "~/data/api";

const fetchArticles = async (): Promise<Article[]> => {
  const conf: Configuration = {
    baseOptions: {
      headers: {
        Accept: "application/json",
      },
    },
  };
  const api = new ArticleApi(conf, "/api/v1");
  const resp = await api.getArticle();
  return resp.data.articles;
};

const Home: NextPage = () => {
  const { data, error } = useSWR("articles", fetchArticles);
  if (error) {
    return <span>Error {error}</span>;
  }
  if (!data) {
    return <span>Loading...</span>;
  }

  return (
    <ul>
      {data.map((a) => {
        return (
          <li key={a.id}>
            <a target="_blank" href={a.url}>
              {a.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Home;
