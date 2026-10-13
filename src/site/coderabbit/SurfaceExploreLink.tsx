type SurfaceExploreLinkProps = {
  href: string;
};

const SurfaceExploreLink = ({ href }: SurfaceExploreLinkProps) => (
  <a className="cr-reviews-surfaces__tertiary" href={href}>
    Explore Now
  </a>
);

export default SurfaceExploreLink;
