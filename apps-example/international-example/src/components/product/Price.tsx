import { classNames } from '@marulloc/components-library/utils';

type Props = {
  currencyCode: string;
  amount: string;
} & Omit<React.ComponentPropsWithoutRef<'p'>, 'children'>;

/**
 * @TODO Discount : Compare Price
 * @param param0
 * @returns
 */
const Price = ({ currencyCode, amount, ...rest }: Props) => {
  if (!currencyCode || !amount) return <span>-</span>;

  return (
    <span suppressHydrationWarning={true} {...rest}>
      {`${new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol',
      }).format(parseFloat(amount as string))}`}
      <span className={classNames('ml-2 inline')}>{`${currencyCode}`}</span>
    </span>
  );
};

export default Price;
