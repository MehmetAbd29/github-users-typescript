type FollowerProps = {
  avatar_url: string;
  html_url: string;
  login: string;
};

function Follower({ avatar_url, html_url, login }: FollowerProps) {
  return (
    <article>
      <img src={avatar_url} alt={login} />
      <div>
        <h4>{login}</h4>
        <a href={html_url}>{html_url}</a>
      </div>
    </article>
  );
}

export default Follower;
