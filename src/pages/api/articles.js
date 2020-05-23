// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  const articles = {
    articles: [...Array(30).keys()].map((i) => {
      return {
        id: i,
        title: "lakjdsf alsjdf aksdfj ád faljsdfa fasd f",
        url:
          "https://dev.to/tbm98/lakjdsf-alsjdf-aksdfj-ad-faljsdfa-fasd-f-51kf",
        image: "https://dev.to/social_previews/article/334256.png",
        crawledAt: "2020-05-17T21:48:38+09:00",
        tags: [
          {
            id: 2,
            name: "flutter",
          },
        ],
        site: {
          id: 2,
          name: "Dev.to",
          url: "https://dev.to/",
        },
      };
    }),
  };
  res.json(articles);
};
