import { NextPage } from "next";
import useSWR from "swr";
import { ArticleApi, Configuration, Article } from "~/data/api";
import ArticleCard from "~/components/Article";

const fetchArticles = async (): Promise<Article[]> => {
  const conf: Configuration = {
    baseOptions: {
      headers: {
        Accept: "application/json",
      },
    },
  };
  const api = new ArticleApi(conf, "/api/v1");
  const resp = await api.getArticles();
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
    <div>
      {data.map((a) => {
        return <ArticleCard key={a.id} article={a} />;
      })}
    </div>
  );
};

export default Home;
