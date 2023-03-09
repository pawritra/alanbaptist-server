const BlogSchema = require("./schema");
const {
  updateBlog,
  getBlogs,
  getTransformationStories,
  getOneBlog,
  deleteBlog,
  swapBlogSequence,
  updateDataInterval,
  addBlog,
  getFeaturedBlogs,
  getAuthorBlogs,
  addFeaturedBlogHandler,
  removeFeaturedBlogHandler
} = require('./controller');
const schema = require('./schema')

module.exports = (fastify, _, done) => {
  fastify.get("/transformation_stories", { schema: BlogSchema.getBlogsSchema }, getTransformationStories );
  fastify.get("/featured", { schema: BlogSchema.getFeaturedBlogsSchema }, getFeaturedBlogs);
  fastify.get("/:slug", { schema: BlogSchema.getBlogSchema }, getOneBlog);
  fastify.get("/author/:author", { schema: BlogSchema.getAuthorSchema }, getAuthorBlogs);
  fastify.delete("/:id", { schema: BlogSchema.deleteBlogSchema, preHandler: fastify.auth([fastify.verify]) }, deleteBlog);
  fastify.patch("/updateDataInterval", { schema: BlogSchema.dataIntervalSchema, preHandler: fastify.auth([fastify.verify]) }, updateDataInterval);
  fastify.post("/", { schema: BlogSchema.addBlogSchema, preHandler: fastify.auth([fastify.verify]) }, addBlog);
  fastify.patch("/:id", { schema: BlogSchema.updateBlogSchema, preHandler: fastify.auth([fastify.verify]) }, updateBlog);
  fastify.patch("/swapBlogs", { schema: BlogSchema.swapBlogSequence, preHandler: fastify.auth([fastify.verify]) }, swapBlogSequence)
  fastify.patch("/featuredBlog/:id", { schema: schema.featuredBlogSchema, preHandler: fastify.auth([fastify.verify]) }, addFeaturedBlogHandler);
  fastify.delete("/featuredBlog/:id", { schema: schema.featuredBlogSchema, preHandler: fastify.auth([fastify.verify]) }, removeFeaturedBlogHandler);

  fastify.get("/", { schema: BlogSchema.getBlogsSchema }, getBlogs);
  done();
};
