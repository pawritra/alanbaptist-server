const S = require("fluent-json-schema");

const blogSchemaRequest = S.object()
  .prop("date", S.string())
  .prop("title", S.string())
  .prop(
    "headerImage",
    S.array().items(
      S.object().prop("title", S.string()).prop("image", S.string())
    )
  )
  .prop("slug", S.string())
  .prop("author", S.string())
  .prop("sequence", S.number())
  .prop("transformation_story", S.boolean())
  .prop("transformation_image", S.string())
  .prop("summary", S.string())
  .prop('coaches', S.array().items(S.string()))
  .prop(
    "body",
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("heading", S.string())
        .prop("paragraph", S.string())
    )
  )
  .prop("brands", S.string())
  .prop(
    "coach",
    S.array().items(
      S.object()
        .prop("name", S.string())
        .prop("image", S.string())
        .prop("designation", S.string())
    )
  )
  .prop("category", S.string())
  .prop("subcategory", S.string())
  .prop("target", S.string())
  .prop("client", S.string())
  .prop(
    "content",
    S.array().items(S.object().prop("id", S.string()).prop("title", S.string()))
  )
  .prop(
    "gallery",
    S.array().items(
      S.object().prop("image", S.string()).prop("title", S.string())
    )
  );

const getBlogsSchema = {
  tags: ["Blogs"],
  summary: "Get Blogs",
  querystring: S.object()
    .prop("index", S.number())
    .prop("limit", S.number())
    .prop("searchQuery", S.string())
    .prop("category", S.string())
    .prop("coach", S.string())
    .prop("subcategory", S.string())
    .prop("minimal", S.boolean())
    .prop("isStory", S.boolean()),
};

const getAuthorSchema = {
  tags: ["Blogs"],
  summary: "Get Author Blogs",
  params: S.object().prop("author", S.string()),
  querystring: S.object().prop("index", S.number()).prop("limit", S.number()),
};

const getFeaturedBlogsSchema = {
  tags: ["Blogs"],
  summary: "Get Featured Blogs",
  querystring: S.object().prop("index", S.number()).prop("limit", S.number()), // (or) query: queryStringJsonSchema
};

const getBlogSchema = {
  summary: "Get Blog",
  tags: ["Blogs"],
  params: S.object().prop("slug", S.string()),
};

const addBlogSchema = {
  tags: ["Blogs"],
  summary: "Add Blog",
  body: blogSchemaRequest,
  security: [
    {
      apiKey: [],
    },
  ],
};

const deleteBlogSchema = {
  tags: ["Blogs"],
  summary: "Delete Blog",
  params: S.object().prop("id", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

const updateBlogSchema = {
  tags: ["Blogs"],
  summary: "Update Blog",
  params: S.object().prop("id", S.string()),
  body: blogSchemaRequest,
  security: [
    {
      apiKey: [],
    },
  ],
};

const dataIntervalSchema = {
  tags: ["Blogs"],
  summary: "Update Date Interval",
  body: S.object().prop("data_interval", S.number()),
  security: [
    {
      apiKey: [],
    },
  ],
};


const swapBlogSequence = {
  tags: ["Blogs"],
  summary: "Swap Blogs",
  body: S.object().prop("firstSequence", S.number()).prop("secondSequence", S.number()),
  security: [
    {
      apiKey: [],
    },
  ],
};

const featuredBlogSchema = {
  tags: ["Featured Blog"],
  summary: "Add/Remove Featured Blog",
  params: S.object().prop("id", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

module.exports = {
  getBlogsSchema,
  getBlogSchema,
  getFeaturedBlogsSchema,
  addBlogSchema,
  updateBlogSchema,
  getAuthorSchema,
  dataIntervalSchema,
  deleteBlogSchema,
  swapBlogSequence,
  featuredBlogSchema,
};
