import { db } from "@/db/index";

export type PostWithData = Awaited<
  ReturnType<typeof fetchPostsByTopicSlug>
>[number];

export const fetchPostsBySearchTerm = (term: string): Promise<PostWithData[]> =>{
 return db.post.findMany({
    include: {
      topic: {
        select: {slug: true},
      },
      user: {
        select: {name: true},
      },
      _count: {
        select: {comments: true},
      },
    },
    where: {
      OR: [
        {title: {contains: term}},
        {content: {contains: term}},
      ]
    }
 });    
}

export const fetchPostsByTopicSlug = (slug: string) => {
  return db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
};

export const fetchTopPosts = async (): Promise<PostWithData[]> => {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: 'desc'
        }
      }
    ],
    include: {
      topic: { select: { slug: true}},
      user: { select: { name: true, image: true}},
      _count: { select: { comments: true}}
    },
    take: 5
  })
};

