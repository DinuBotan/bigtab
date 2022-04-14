import React, {
  createRef,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import useArrowKeyNavigationHook from 'react-arrow-key-navigation-hook';
import { search } from '../../common/search';
import { Tab } from '../../common/types';
import { checkIntersection } from '../../common/utils';
import { useMachineContext } from '../../hooks/useMachineContext';
import { CommandPaletteOption } from '../CommandPaletteOption';
import { TabSearchIcon } from '../TabSearchIcon';
import styles from './CommandPalette.module.css';

type CommandPaletteProps = {
  onClickedOutside: () => void | Promise<void>;
  onEscPressed: () => void | Promise<void>;
  open: boolean;
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  onClickedOutside,
  onEscPressed,
  open,
}) => {
  // Context + State
  const context = useMachineContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [boundingBox, setBoundingBox] = useState<DOMRect>({} as DOMRect);
  const filteredTabs = search(context, searchQuery, selectedGroup);

  const onSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.currentTarget.value);
    // TODO: Make Escape Work
    // TODO: Open All Results on Enter
    // TODO: Open Nth Result on Command/Ctrl+#
    // TODO: Write Replacement for useArrowKeyNavigation, which supports alt+command navigation
  };

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const parentRef = useArrowKeyNavigationHook({ selectors: 'a,input' });
  const boundaryRef = createRef<HTMLDivElement>();

  const groupSelected = (groupId: string) => {
    const box = boundaryRef?.current?.getBoundingClientRect();
    if (box) {
      setBoundingBox(box);
    }
    setSelectedGroup(groupId);
  };

  // Hooks
  useEffect(() => {
    const clickedOutside = () => {
      setSearchQuery('');
      setSelectedGroup('');
      onClickedOutside();
    };

    const listener = (e: unknown) => {
      const isIntersectingRef = checkIntersection(
        (e as MouseEvent).clientX,
        (e as MouseEvent).clientY,
        boundingBox,
      );
      if (!isIntersectingRef) {
        console.log('Clicked outside');
        clickedOutside();
      }
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [boundingBox, onClickedOutside]);

  useEffect(() => {
    const escPressed = () => {
      setSearchQuery('');
      setSelectedGroup('');
      onEscPressed();
    };

    const keyPressListener = (e: any) => {
      console.log('Pressed esc');
      if ((e as KeyboardEvent<HTMLImageElement>).key === 'Escape') {
        escPressed();
      }
    };

    window.addEventListener('keydown', keyPressListener);

    return () => {
      window.removeEventListener('keydown', keyPressListener);
    };
  }, [onEscPressed]);

  useEffect(() => {
    if (open) {
      inputRef?.current?.focus();
    } else {
      setSearchQuery('');
      setSelectedGroup('');
    }
  }, [open]);

  useEffect(() => {
    const box = boundaryRef?.current?.getBoundingClientRect();
    if (box) {
      setBoundingBox(box);
    }
  }, [selectedGroup, boundaryRef]);

  // Component
  return (
    <>
      <div className={styles.palette} role="dialog" aria-modal="true">
        <div className={styles.overlay} />
        <div className={styles.wrapper} ref={parentRef}>
          <div className={styles.contents} ref={boundaryRef}>
            <div className={styles.search}>
              <TabSearchIcon />
              <input
                type="text"
                placeholder="Search your Saved Tabs..."
                spellCheck="false"
                className={styles.input}
                ref={inputRef}
                onChange={onSearchChange}
              />
            </div>
            <div className={styles.options}>
              {filteredTabs.tabs.map((option: Tab, index: number) => (
                <CommandPaletteOption
                  key={index}
                  option={option}
                  onGroupSelected={groupSelected}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
