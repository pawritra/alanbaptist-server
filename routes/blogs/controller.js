const { Blog } = require("../../models/blog");
const { Employee } = require("../../models/employee");
const {
  compressImage
} = require('./utils');


const getOneBlog = async (request, reply) => {
  try {
    const { slug } = request.params;
    let blog;
    blog = await Blog.findOne({ slug: slug });
    if (!blog) {
      blog = await Blog.findById(slug);
      if (!blog) {
        throw new Error("Blog not Found");
      }
    }

    return blog;
  } catch (err) {
    reply.status(404).send({ error: "Blog not found" });
    return;
  }
};

const getAuthorBlogs = async (request, reply) => {
  try {
    let blogs = [];
    const defaultLimit = 10;
    const defaultIndex = 0;

    const author = request.params.author;
    const limit = request.query.limit ? request.query.limit : defaultLimit;
    let index = request.query.index ? request.query.index : defaultIndex;

    blogs = await Blog.find({ author: author }).skip(index).limit(limit).sort({ sequence: 1 });

    return blogs;
  } catch (err) {
    reply.status(400).send({ error: "Some error occured" });
    return;
  }
};

const getBlogs = async (request, reply) => {
  try {
    let blogs = [];
    const defaultLimit = 10;
    const defaultIndex = 0;

    const limit = request.query.limit ? request.query.limit : defaultLimit;
    let index = request.query.index ? request.query.index : defaultIndex;
    const category = request.query.category;
    const subcategory = request.query.subcategory;
    const coach = request.query.coach;
    const searchQuery = request.query.searchQuery;

    if (category != null || subcategory != null || coach != null) {
      const query = {};
      if(category) query['category'] = category;
      if(subcategory) query['subcategory'] = subcategory;
      if(coach) query['coach'] = {$elemMatch: {"name": coach }};

      blogs = await Blog.find(query)
        .skip(index)
        .limit(limit)
        .sort({ sequence: 1 });
    } else if (searchQuery) {
      blogs = await Blog.find({ $text: { $search: searchQuery } }, {score: { "$meta": "textScore" }})
        .skip(index)
        .limit(limit)
        .sort({ sequence: 1, score: { "$meta": "textScore" } });
    } else {
      blogs = await Blog.find({}).skip(index).limit(limit).sort({ sequence: 1 });
    }

    return blogs;
  } catch (err) {
    reply.status(400).send({ error: "Some error occured" });
    return;
  }
};

const getTransformationStories = async (request, reply) => {
  try {
    let blogs = [];
    const defaultLimit = 10;
    const defaultIndex = 0;

    const limit = request.query.limit ? request.query.limit : defaultLimit;
    let index = request.query.index ? request.query.index : defaultIndex;
    const category = request.query.category;
    const subcategory = request.query.subcategory;
    const coach = request.query.coach;
    const searchQuery = request.query.searchQuery;

    if (category != null || subcategory != null || coach != null) {
      const query = {
        transformation_story: true,
      };
      if(category) query['category'] = category;
      if(subcategory) query['subcategory'] = subcategory;
      if(coach) query['coach'] = {$elemMatch: {"name": coach }};

      blogs = await Blog.find(query)
        .skip(index)
        .limit(limit)
        .sort({ sequence: 1 });
    } else if (searchQuery) {
      blogs = await Blog.find({ $text: { $search: searchQuery }, transformation_story: true }, {score: { "$meta": "textScore" }})
        .skip(index)
        .limit(limit)
        .sort({ sequence: 1, score: { "$meta": "textScore" } });
    } else {
      blogs = await Blog.find({ transformation_story: true }).skip(index).limit(limit).sort({ sequence: 1 });
    }

    return blogs;
  } catch (err) {
    reply.status(400).send({ error: "Some error occured" });
    return;
  }
};

const getFeaturedBlogs = async (request, reply) => {
  try {
    const defaultLimit = 6;
    const defaultIndex = 0;

    const limit = request.query.limit ? request.query.limit : defaultLimit;
    let index = request.query.index ? request.query.index : defaultIndex;

    const blogs = await Blog.find({
      featured: true,
      skip: index,
      limit: limit,
    }).sort({ sequence: 1 });
    return blogs;
  } catch (err) {
    reply.status(400).send({ error: "Some error occured" });
    return;
  }
};

const addBlog = async (req, reply) => {
  try {
    if (req.body.sequence) {
      const blog = await Blog.findOne({ sequence: req.body.sequence })
      if (blog) {
        return reply.status(401).send({ error: "Two Blogs cannot have same sequence" });
      }
    }

    if (req.body.sequence <= 0) {
      return reply.status(401).send({ error: "Sequence must be greater than 0" });
    }

    const blog = new Blog({ ...req.body });

    await compressImage(req.body.headerImage[0].image);
    await blog.save();
    return { response: blog, message: "Blog has been added" };
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: err.message });
    return;
  }
};

const updateBlog = async (req, reply) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      reply.status(400).send({ error: "Blog not found" });
      return;
    }
    if (req.body.sequence) {
      const temp = await Blog.findOne({ sequence: req.body.sequence })
      if (temp) {
        return reply.status(401).send({ error: "Two Blogs cannot have same sequence" });
      }
    }

    if (req.body.sequence <= 0) {
      return reply.status(401).send({ error: "Sequence must be greater than 0" });
    }

    if (req.body.gallery && req.body.gallery.length > 1) {
      await blog.update({ "$set": { gallery: req.body.gallery } })
    }

    if (req.body.headerImage && req.body.headerImage.length > 0) {
      await blog.update({ "$set": { headerImage: req.body.gallery } })
      await compressImage(req.body.headerImage[0].image);
    }

    await blog.update({ ...req.body });

    return { response: blog, message: "Blog has been Updated" };
  } catch (err) {
    reply.status(400).send({ error: err.message });
    return;
  }
};

const updateDataInterval = async (request, reply) => {
  try {
    const { data_interval } = request.body;

    await Blog.updateMany({}, { data_interval: data_interval });
    return { message: "Data Interval Updated" };
  } catch (err) {
    reply.status(400).send({ error: "Some error occured" });
    return;
  }
};

const deleteBlog = async (request, reply) => {
  try {
    const { id } = request.params;
    await Blog.findByIdAndDelete(id);
    return { message: "Blog has been deleted" };
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: "Some error occured" });
    return;
  }
};

const swapBlogSequence = async (req, reply) => {
  try {
    if (req.body.firstSequence == req.body.secondSequence) {
      return reply.status(401).send({ error: "Cannot Swap the Same Blogs" })
    }

    if (req.body.firstSequence <= 0 || req.body.secondSequence <= 0) {
      return reply.status(401).send({ error: "Sequence must be greater than 0" });
    }

    await Blog.updateOne({ sequence: req.body.firstSequence }, { sequence: -1 })
    await Blog.updateOne({ sequence: req.body.secondSequence }, { sequence: req.body.firstSequence })
    await Blog.updateOne({ sequence: -1 }, { sequence: req.body.secondSequence })

    reply.send({ message: "Blogs Sequence Swapped." })
  } catch (err) {
    console.log(err)
    reply.status(400).send({ error: "Try Again Later." })
  }
}

const addFeaturedBlogHandler = async (request, reply) => {
  try {
    const { id } = request.params;
    await Blog.findOneAndUpdate({ _id: id }, { featured: true });

    return { message: "Blog added to Featured" };
  } catch (err) {
    reply.status(400).send({ error: "Blog not found" });
    return;
  }
};


const removeFeaturedBlogHandler = async (request, reply) => {
  try {
    const { id } = request.params;
    const blog = await Blog.findOneAndUpdate({ _id: id }, { featured: false });

    return { message: "Blog removed from Featured" };
  } catch (err) {
    reply.status(400).send({ error: "Blog not found" });
    return;
  }
};

module.exports = {
  updateBlog,
  getTransformationStories,
  getBlogs,
  getOneBlog,
  deleteBlog,
  swapBlogSequence,
  deleteBlog,
  updateDataInterval,
  addBlog,
  getFeaturedBlogs,
  getAuthorBlogs,
  addFeaturedBlogHandler,
  removeFeaturedBlogHandler
}

