import { NextPage } from "next";
import useSWR, { useSWRPages } from "swr";
import { ArticleApi, Configuration, Article } from "~/data/api";
import ArticleCard from "~/components/Article";

const fetchArticles = async (
  limit: number,
  after: number | null
): Promise<Article[]> => {
  const conf: Configuration = {
    baseOptions: {
      headers: {
        Accept: "application/json",
      },
    },
  };
  const api = new ArticleApi(conf, "/api/v1");
  const resp = await api.getArticles(limit, "", after);
  console.log(resp.data.articles);
  return resp.data.articles;
};

const Home: NextPage = () => {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages<
    number | null,
    Article[]
  >(
    "index",
    ({ offset: after, withSWR }) => {
      console.log("after:", after);
      let key = "/articles";
      if (after) {
        key += `?after=${after}`;
      }
      const { data: articles } = withSWR(
        useSWR(key, () => fetchArticles(3, after))
      );
      if (!articles) {
        return <p>loading...</p>;
      }

      return articles.map((a) => {
        return <ArticleCard key={a.id} article={a} />;
      });
    },
    ({ data: articles }) => {
      if (articles && articles.length === 0) return null;
      return articles[articles.length - 1].id;
    }
  );

  return (
    <div>
      {pages}
      <button onClick={loadMore} disabled={isReachingEnd || isLoadingMore}>
        {isLoadingMore ? ". . ." : isReachingEnd ? "no more data" : "load more"}
      </button>
    </div>
  );
};

export default Home;
