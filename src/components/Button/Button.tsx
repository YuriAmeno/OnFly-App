import classNames from 'classnames';

type Props = {
  variant?: 'default' | 'primary' | 'light';
  children: React.ReactNode;
};

export function Button({ variant, children }: Props) {
  let bgColor = 'text-white';
  if (variant === 'primary') bgColor = 'bg-primary hover:bg-primaryLight active: bg-primaryDark text-white ';
  if (variant === 'light') bgColor = 'bg-primaryLight text-white';

  return <button className={classNames('py-2 px-4 rounded-md font-bold', bgColor)}>{children}</button>;
}
