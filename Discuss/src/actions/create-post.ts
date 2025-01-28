"use server";

import { z } from "zod";
import { auth } from "@/auth";
import type { Post, Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { db } from "@/db/index";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  fromData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: fromData.get("title"),
    content: fromData.get("content"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session?.user || !session) {
    return {
      errors: {
        _form: ["You must be sign in to do this."],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic."],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        topicId: topic.id,
        userId: session.user.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong!"],
        },
      };
    }
  }

  revalidatePath(paths.topicShowPath(topic.slug));
  redirect(paths.postShowPath(topic.slug, post.id));
}
