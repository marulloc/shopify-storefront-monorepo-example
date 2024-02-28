import { classNames } from '@marulloc/components-library/utils';

const text = {
  color: {
    base: {
      main: classNames('text-gray-800'),
      muted: classNames('text-gray-600'),
      hover: classNames('hover:text-gray-950'),
      contrast: classNames('text-gray-100'),
      disabled: classNames('text-gray-500'),
    },
    primary: {
      main: classNames('text-indigo-600'),
      muted: classNames('text-indigo-400'),
      hover: classNames('hover:text-indigo-800'),
    },
    secondary: {
      main: classNames('text-green-600'),
      muted: classNames('text-green-400'),
      hover: classNames('hover:text-green-800'),
    },
  },
  size: {
    small: classNames('text-xs sm:text-sm'),
    medium: classNames('text-sm sm:text-base md:text-lg'),
    large: classNames('text-base sm:text-lg md:text-xl'),
    extraLarge: classNames('text-lg sm:text-xl md:text-2xl'),
  },
};

const fill = {
  base: {
    main: classNames('bg-gray-100'),
    muted: classNames('bg-gray-200'),
    hover: classNames('hover:bg-gray-300'),
    disabled: classNames('bg-gray-800  '),
  },
  primary: {
    main: classNames('bg-indigo-500'),
    muted: classNames('bg-indigo-400'),
    hover: classNames('hover:bg-indigo-600'),
  },
  secondary: {
    main: classNames('bg-rose-500'),
    muted: classNames('bg-rose-400'),
    hover: classNames('hover:bg-pink-600'),
  },
};

const border = {
  base: {
    main: classNames('border-gray-300'),
    muted: classNames('border-gray-200'),
    hover: classNames('hover:border-gray-400'),
    disabled: classNames('opacity-50'),
  },
  primary: {
    main: classNames('border-indigo-500'),
    muted: classNames('border-indigo-400'),
    hover: classNames('hover:border-indigo-600'),
    disabled: classNames('opacity-50'),
  },
  secondary: {
    main: classNames('border-green-500'),
    muted: classNames('border-green-400'),
    hover: classNames('hover:border-green-600'),
    disabled: classNames('opacity-50'),
  },
};

const spacing = {
  container: 'max-w-7xl mx-auto',
  margin: {
    xy: {
      small: classNames('m-2 sm:m-4 md:m-6'),
      medium: classNames('m-4 sm:m-6 md:m-8'),
      large: classNames('m-6 sm:m-8 md:m-10'),
    },
    x: {
      small: classNames('mx-2 sm:mx-4 md:mx-6'),
      medium: classNames('mx-4 sm:mx-6 md:mx-8'),
      large: classNames('mx-6 sm:mx-8 md:mx-10'),
    },
    y: {
      small: classNames('my-2 sm:my-4 md:my-6'),
      medium: classNames('my-4 sm:my-6 md:my-8'),
      large: classNames('my-6 sm:my-8 md:my-10'),
    },
  },
  padding: {
    xy: {
      extraSmall: classNames('p-1 sm:p-2 md:p-3'),
      small: classNames('p-2 sm:p-4 md:p-6'),
      medium: classNames('p-4 sm:p-6 md:p-8'),
      large: classNames('p-6 sm:p-8 md:p-10'),
    },
    x: {
      extraSmall: classNames('px-1 sm:px-2 md:px-3'),
      small: classNames('px-2 sm:px-4 md:px-6'),
      medium: classNames('px-4 sm:px-6 md:px-8'),
      large: classNames('px-6 sm:px-8 md:px-10'),
    },
    y: {
      extraSmall: classNames('py-1 sm:py-2 md:py-3'),
      small: classNames('py-2 sm:py-4 md:py-6'),
      medium: classNames('py-4 sm:py-6 md:py-8'),
      large: classNames('py-6 sm:py-8 md:py-10'),
    },
    r: {
      extraSmall: classNames('pr-1 sm:pr-2 md:pr-3'),
      small: classNames('pr-2 sm:pr-4 md:pr-6'),
      medium: classNames('pr-4 sm:pr-6 md:pr-8'),
      large: classNames('pr-6 sm:pr-8 md:pr-10'),
    },
    l: {
      extraSmall: classNames('pl-1 sm:pl-2 md:pl-3'),
      small: classNames('pl-2 sm:pl-4 md:pl-6'),
      medium: classNames('pl-4 sm:pl-6 md:pl-8'),
      large: classNames('pl-6 sm:pl-8 md:pl-10'),
    },
    t: {
      extraSmall: classNames('pt-1 sm:pt-2 md:pt-3'),
      small: classNames('pt-2 sm:pt-4 md:pt-6'),
      medium: classNames('pt-4 sm:pt-6 md:pt-8'),
      large: classNames('pt-6 sm:pt-8 md:pt-10'),
    },
    b: {
      extraSmall: classNames('pb-1 sm:pb-2 md:pb-3'),
      small: classNames('pb-2 sm:pb-4 md:pb-6'),
      medium: classNames('pb-4 sm:pb-6 md:pb-8'),
      large: classNames('pb-6 sm:pb-8 md:pb-10'),
    },
  },
  gap: {
    xy: {
      small: classNames('gap-2 sm:gap-4 md:gap-6'),
      medium: classNames('gap-4 sm:gap-6 md:gap-8'),
      large: classNames('gap-6 sm:gap-8 md:gap-10'),
    },
    x: {
      small: classNames('gap-x-2 sm:gap-x-4 md:gap-x-6'),
      medium: classNames('gap-x-4 sm:gap-x-6 md:gap-x-8'),
      large: classNames('gap-x-6 sm:gap-x-8 md:gap-x-10'),
    },
    y: {
      small: classNames('gap-y-2 sm:gap-y-4 md:gap-y-6'),
      medium: classNames('gap-y-4 sm:gap-y-6 md:gap-y-8'),
      large: classNames('gap-y-6 sm:gap-y-8 md:gap-y-10'),
    },
  },
};

export const localTheme = {
  text,
  fill,
  border,
  spacing,
};
