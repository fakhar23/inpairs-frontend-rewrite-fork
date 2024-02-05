import { Button, Link, IButtonProps } from "@/components";

interface ILinkButtonProps extends IButtonProps {
  path?: string;
}

export default function LinkButton({ path, ...props }: ILinkButtonProps) {
  return (
    <Link href={path ? path : ""}>
      <Button {...props} />
    </Link>
  );
}
