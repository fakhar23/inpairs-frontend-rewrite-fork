import { Link } from "@/components";

const UserLink = ({
  user,
}: {
  user: { first_name?: string; last_name?: string; id?: string };
}) => {
  const href = `/ranking/${user?.id}`;

  return user ? (
    <Link
      href={href}
      target="blank"
      className="text-blue-500 underline underline-offset-2"
    >{`${user?.first_name} ${user?.last_name}`}</Link>
  ) : (
    <></>
  );
};

export default UserLink;
