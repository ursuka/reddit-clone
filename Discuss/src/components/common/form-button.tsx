"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";
import { FC, ReactNode } from "react";

interface FormButtonProps {
  children: ReactNode;
}

const FormButton: FC<FormButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      {children}
    </Button>
  );
};

export default FormButton;
