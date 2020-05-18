import { NextComponentType, NextPageContext } from "next";
import { Article } from "~/data/api";

const Thumbnail: NextComponentType<
  NextPageContext,
  {},
  { image: string | null }
> = ({ image }) => {
  return <img src={image} alt="article's image" width="300px" />;
};

const RightPane: NextComponentType<
  NextPageContext,
  {},
  { article: Article }
> = ({ article }) => {
  return (
    <div className="pane">
      <a rel="noopener noreferrer" target="_blank" href={article.url}>
        {article.title}
      </a>
      <div>
        タグ:&nbsp;
        {article.tags.map(
          (t, i, arr) => t.name + (arr.length - 1 === i ? "" : ", ")
        )}
      </div>
      <div>取得日: {article.crawledAt}</div>
      <div>
        from{" "}
        <a rel="noopener noreferrer" target="_blank" href={article.site.url}>
          {article.site.name}
        </a>
      </div>
      <style jsx>
        {`
          .pane {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
};

const ArticleCard: NextComponentType<
  NextPageContext,
  {},
  { article: Article }
> = ({ article }) => {
  return (
    <div className="article">
      <Thumbnail image={article.image} />
      <RightPane article={article} />
      <style jsx>
        {`
          .article {
            display: flex;
            padding: 0px, 100px;
          }
        `}
      </style>
    </div>
  );
};

export default ArticleCard;
