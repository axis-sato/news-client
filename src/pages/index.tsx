import { NextPage } from "next";
import useSWR from "swr";
import axios from "axios";

interface Tag {
  id: number;
  name: string;
}

interface Site {
  id: number;
  name: string;
}

interface Article {
  id: number;
  title: string;
  url: string;
  image?: string;
  crawledAt: string;
  tags: Tag[];
  sites: Site[];
}

const fetchArticles = async (): Promise<Article[]> => {
  const resp = await axios.get("/api/v1/articles");
  return resp.data.articles as Article[];
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
