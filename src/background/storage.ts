import { getBucket } from '@extend-chrome/storage';
import { BackgroundMachineContext } from './types';

const store = getBucket<BackgroundMachineContext>('bigtab-background');

export const getWithKey = async <T>(
  key: keyof BackgroundMachineContext,
  def?: T,
) => {
  let localValue = def;
  const obj = await store.get(key);
  if (obj && obj[key]) {
    localValue = obj[key] as T;
  }
  return localValue;
};

export const updateStorage = store.set;

export const getStorage = async () => {
  const keys = (await store.getKeys()) as Array<keyof BackgroundMachineContext>;

  const getPromises = keys.map((key: keyof BackgroundMachineContext) =>
    getWithKey(key),
  );

  const allResults = await Promise.all(getPromises);

  return keys.reduce(
    (context, key, index) => ({
      ...context,
      [key]: allResults[index],
    }),
    {},
  );
};
