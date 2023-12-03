type Props = {
  userName: string;
};

function Avatar({ userName }: Props) {
  return (
    <img
      alt={userName}
      className="h-full w-full"
      src={`https://api.multiavatar.com/${userName}.png?apikey=exrhKFOop3YHsa`}
    />
  );
}

export default Avatar;
