import Link from "next/link";

const UserLink = ({ user }: any) => {
  const href = `/profile/${user?.sharable_id}`;

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
