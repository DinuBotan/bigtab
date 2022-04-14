import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { DEFAULT_CONTEXT } from '../common/context';
import { contextStream } from '../common/messages';
import { getStorage } from '../common/storage';
import { BackgroundMachineContext } from '../common/types';

const MachineContext = createContext<BackgroundMachineContext>(DEFAULT_CONTEXT);

export const MachineContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [context, setContext] = useState(DEFAULT_CONTEXT);

  useEffect(() => {
    const getFromStorage = async () => {
      const localContext = (await getStorage()) as BackgroundMachineContext;
      setContext(localContext);
    };
    getFromStorage();
  }, []);

  useLayoutEffect(() => {
    contextStream.subscribe((newContext: BackgroundMachineContext) => {
      setContext(newContext);
    });
  }, []);

  return (
    <MachineContext.Provider value={context}>
      {children}
    </MachineContext.Provider>
  );
};

export const useMachineContext = () => {
  const context = useContext(MachineContext);
  return context;
};
