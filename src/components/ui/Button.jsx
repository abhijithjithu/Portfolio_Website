import { Link } from 'react-router-dom';

/**
 * Replaces six separately hand-rolled button styles.
 *
 * Polymorphic so a link that looks like a button and a button that looks
 * like a link both stay semantically correct — `as="a"` for external,
 * `as={Link}` for routes, default `button` for actions.
 */

const BASE =
  'u-focus inline-flex items-center justify-center gap-2 font-sans font-semibold ' +
  'transition-colors duration-fast ease-smooth disabled:cursor-not-allowed disabled:opacity-45';

const VARIANTS = {
  solid:
    'rounded-md bg-accent text-accent-on shadow-sm hover:bg-accent-hover hover:shadow-md ' +
    'disabled:hover:bg-accent disabled:hover:shadow-sm',
  quiet:
    'rounded-md border border-line bg-surface text-ink shadow-xs hover:border-line-strong hover:bg-sunken',
  link: 'text-accent underline decoration-accent/35 underline-offset-4 hover:decoration-accent',
};

const SIZES = {
  sm: 'px-3.5 py-2 text-meta',
  md: 'px-5 py-2.5 text-small',
  lg: 'px-6 py-3 text-body',
};

const Button = ({
  as = 'button',
  variant = 'solid',
  size = 'md',
  className = '',
  children,
  ...rest
}) => {
  const Tag = as === 'link' ? Link : as;
  const sizing = variant === 'link' ? '' : SIZES[size];

  return (
    <Tag className={`${BASE} ${VARIANTS[variant]} ${sizing} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Button;
