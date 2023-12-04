type Props = {
  username: string;
};

function Avatar({ username }: Props) {
  return (
    <img
      alt={username}
      className="h-full w-full"
      src={`https://api.multiavatar.com/${username}.png?apikey=exrhKFOop3YHsa`}
    />
  );
}

export default Avatar;
