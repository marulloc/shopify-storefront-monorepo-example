import { TDictionary } from '@/dictionaries';
import { classNames } from '@marulloc/components-library/utils';
import Skeleton from '../../loading/Skeleton';
import Typography from '../../Typography';
import SemanticBox from '../../SemanticBox';
import { ToolkitProduct } from '@marulloc/shopify-next-api/v24.01/@toolkit-types';

type TProps = {
  product: ToolkitProduct;
  dict: TDictionary['product'];
};

const Description = async ({ product, dict }: TProps) => {
  const dictionary = dict?.Description;

  return (
    <div>
      <Typography as="h3" size="lg" className={classNames('pb-2 sm:pb-4 md:pb-6', 'font-bold')}>
        {dictionary.title}
      </Typography>

      {/* Real Shopify Description */}
      {/* {product.descriptionHtml && <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>} */}

      <div>
        <aside className={classNames('mb-6  space-y-2')}>
          {dictionary.mock.warning.map((contents, index) => (
            <SemanticBox
              as="article"
              fill="primary-muted"
              p={{ dir: 'xy', size: 'md' }}
              key={`${product.title}-info-${index}`}
              className=" bg-opacity-30 rounded-lg"
            >
              <Typography className=" " size="sm" noWarn color="primary-accent">
                {contents}
              </Typography>
            </SemanticBox>
          ))}
        </aside>

        <section className=" border-0 p-6 space-y-10 ">
          <div>
            <Typography as="h2" size="2xl" color="default-accent" className={classNames('font-bold mb-2')}>
              {product.title}
            </Typography>
            <Typography className="mb-4">{dictionary.mock.summary.intro}</Typography>
          </div>

          <div>
            <Typography as="h4" size="lg" color="default-accent" className={classNames('font-semibold mb-2')}>
              {dictionary.mock.features.title}
            </Typography>
            <ul className="list-disc pl-5 mb-4 text-default-base">
              {dictionary.mock.features.li.map((contents, index) => (
                <li key={`${product.title}-feature-${index}`}>
                  <Typography className="">{contents}</Typography>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography as="h4" size="lg" color="default-accent" className={classNames('font-semibold mb-2')}>
              {dictionary.mock.specifications.title}
            </Typography>
            <ul className="list-disc pl-5 text-default-base">
              {dictionary.mock.specifications.li.map((contents, index) => (
                <li key={`${product.title}-spec-${index}`}>
                  <Typography className="">{contents}</Typography>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography className="mb-4">{dictionary.mock.summary.outro}</Typography>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Description;

export const DescriptionSkeleton = () => {
  return (
    <div className={classNames('p-4 sm:p-6 md:p-8', ' min-h-[300px] lg:min-h-[600px] space-y-10')}>
      <div className="space-y-2">
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-1/2 h-8 ">
          <Skeleton />
        </div>
      </div>

      <div className="space-y-2">
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-full h-8 ">
          <Skeleton />
        </div>
        <div className="w-1/2 h-8 ">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};
