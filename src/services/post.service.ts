import prisma from "../config/prisma.js";

export const createPostService = async (userId: string, payload: any) => {
  const { title, content, mediaUrl, category, tags } = payload;

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      mediaUrl,
      category,
      tags: tags || [],
      authorId: userId,
    },
    include: {
      author: { select: { id: true, name: true, email: true, role: true } },
    },
  });

  return newPost;
};

export const getAllPostsService = async (query: any) => {
  const { search, category } = query;

  let filters: any = {};

  if (search) {
    filters.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  if (category) {
    filters.category = category;
  }

  const posts = await prisma.post.findMany({
    where: filters,
    include: {
      author: { select: { id: true, name: true, email: true } },
      _count: { select: { comments: true, reactions: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return posts;
};

export const getTrendingPostsService = async () => {
  // Top 6 posts based on comments and reactions count
  const posts = await prisma.post.findMany({
    include: {
      author: { select: { id: true, name: true } },
      _count: { select: { comments: true, reactions: true } },
    },
    take: 6,
    orderBy: {
      reactions: { _count: "desc" },
    },
  });

  return posts;
};

export const getPostByIdService = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, email: true } },
      comments: {
        include: { author: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
      },
      reactions: true,
    },
  });

  if (!post) {
    throw new Error("Post not found!");
  }

  return post;
};
