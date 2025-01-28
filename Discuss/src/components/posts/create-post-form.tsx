"use client";

import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions/index";
import FormButton from "../common/form-button";
import { useFormState } from "react-dom";

interface PostCreateFormProps {
  slug: string;
}

const PostCreateForm: FC<PostCreateFormProps> = ({ slug }) => {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              placeholder="Title"
              label="Title"
              labelPlacement="outside"
              name="title"
              isInvalid={!!formState.errors?.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              placeholder="Content"
              label="Content"
              labelPlacement="outside"
              name="content"
              isInvalid={!!formState.errors?.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400 rounded">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <FormButton>Create post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default PostCreateForm;
