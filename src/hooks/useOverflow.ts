import { MutableRefObject, useLayoutEffect, useState } from 'react';

export const useIsOverflow = (
  ref: MutableRefObject<unknown>,
  callback?: (hasOverflow: boolean) => unknown,
) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  useLayoutEffect(() => {
    const { current } = ref as {
      current: { scrollWidth: number; clientWidth: number };
    };

    const trigger = () => {
      const hasOverflow =
        (current && current?.scrollWidth > current?.clientWidth) ?? false;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
