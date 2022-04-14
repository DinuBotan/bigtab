import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useArrowKeyNavigationHook from 'react-arrow-key-navigation-hook';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { DEFAULT_CONTEXT } from '../background/context';
import { getStorage } from '../background/storage';
import { BackgroundMachineContext, Tab } from '../background/types';
import { contextStream } from '../common/messages';
import { search } from '../common/search';
import CommandOption from '../components/CommandOption';
import styles from './styles/CommandPalette.module.css';

const CommandPalette: React.FC = () => {
  const [context, setContext] = useState(
    DEFAULT_CONTEXT as BackgroundMachineContext,
  );

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

  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.currentTarget.value);
  };

  const filteredResults = search(context, searchQuery);

  const parentRef = useArrowKeyNavigationHook({ selectors: 'a,input' });

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setSearchQuery('');
    setOpen((_open) => !_open);
  };

  useEffect(() => {
    document.addEventListener(
      'keydown',
      (e) => (e.metaKey || e.ctrlKey) && e.code === 'KeyJ' && toggle(),
    );
  }, []);

  useEffect(() => {
    if (open) {
      inputRef?.current?.focus();
    }
  }, [open]);

  const boundary = useDetectClickOutside({ onTriggered: toggle });

  const getGroup = (group: string) => {
    if (group) {
      return context.groups.find((_group) => _group.id === group);
    }
    return undefined;
  };

  const getColors = (groupId: string) => {
    const group = getGroup(groupId);
    if (!group) {
      return {
        color: '#79797C',
        backgroundColor: '#E0E0E1',
      };
    }
    switch (group.color) {
      case 'orange':
        return {
          color: '#FF621F',
          backgroundColor: '#FF9B70',
        };
      case 'grey':
        return {
          color: '#79797C',
          backgroundColor: '#E0E0E1',
        };
      case 'blue':
        return {
          color: '#0A2463',
          backgroundColor: '#5885EE',
        };
      case 'red':
        return {
          color: '#F00511',
          backgroundColor: '#FC5F67',
        };
      case 'yellow':
        return {
          color: '#E8B321',
          backgroundColor: '#F7E5B6',
        };
      case 'green':
        return {
          color: '#037758',
          backgroundColor: '#06D6A0',
        };
      case 'pink':
        return {
          color: '#FF3370',
          backgroundColor: '#FFE1EA',
        };
      case 'purple':
        return {
          color: '#662E9B',
          backgroundColor: '#AF81D9',
        };
      case 'cyan':
        return {
          color: '#118AB2',
          backgroundColor: '#6ACFF1',
        };
      default:
        return {
          color: '#79797C',
          backgroundColor: '#E0E0E1',
        };
    }
  };

  const getName = (groupId: string) => getGroup(groupId)?.title ?? 'None';

  return (
    <>
      {open && (
        <div className={styles.palette} role="dialog" aria-modal="true">
          <div className={styles.overlay} />
          <div className={styles.wrapper} ref={parentRef}>
            <div className={styles.contents} ref={boundary}>
              <div className={styles.search}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 256 256"
                  width={25}
                  height={25}
                >
                  <g transform="matrix(10.666666666666666,0,0,10.666666666666666,0,0)">
                    <path
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.779 21.3129C19.2803 21.3129 21.308 19.2852 21.308 16.7839C21.308 14.2826 19.2803 12.2549 16.779 12.2549C14.2777 12.2549 12.25 14.2826 12.25 16.7839C12.25 19.2852 14.2777 21.3129 16.779 21.3129Z"
                    ></path>
                    <path
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M23.249 23.2551L20.002 20.0071"
                    ></path>
                    <path
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M0.515999 4.50391H20.5"
                    ></path>
                    <path
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.5 16.5H2.5C1.96957 16.5 1.46086 16.2893 1.08579 15.9142C0.710714 15.5391 0.5 15.0304 0.5 14.5V2.5C0.5 1.96957 0.710714 1.46086 1.08579 1.08579C1.46086 0.710714 1.96957 0.5 2.5 0.5H18.5C19.0304 0.5 19.5391 0.710714 19.9142 1.08579C20.2893 1.46086 20.5 1.96957 20.5 2.5V8.5"
                    ></path>
                    <path
                      stroke="#000000"
                      d="M3.516 2.75391C3.37793 2.75391 3.266 2.64198 3.266 2.50391C3.266 2.36584 3.37793 2.25391 3.516 2.25391"
                    ></path>
                    <path
                      stroke="#000000"
                      d="M3.516 2.75391C3.65407 2.75391 3.766 2.64198 3.766 2.50391C3.766 2.36584 3.65407 2.25391 3.516 2.25391"
                    ></path>
                    <g>
                      <path
                        stroke="#000000"
                        d="M5.516 2.75391C5.37793 2.75391 5.266 2.64198 5.266 2.50391C5.266 2.36584 5.37793 2.25391 5.516 2.25391"
                      ></path>
                      <path
                        stroke="#000000"
                        d="M5.516 2.75391C5.65407 2.75391 5.766 2.64198 5.766 2.50391C5.766 2.36584 5.65407 2.25391 5.516 2.25391"
                      ></path>
                    </g>
                    <g>
                      <path
                        stroke="#000000"
                        d="M7.516 2.75391C7.37793 2.75391 7.266 2.64198 7.266 2.50391C7.266 2.36584 7.37793 2.25391 7.516 2.25391"
                      ></path>
                      <path
                        stroke="#000000"
                        d="M7.516 2.75391C7.65407 2.75391 7.766 2.64198 7.766 2.50391C7.766 2.36584 7.65407 2.25391 7.516 2.25391"
                      ></path>
                    </g>
                  </g>
                </svg>
                <input
                  type="text"
                  placeholder="Search your Saved Tabs..."
                  spellCheck="false"
                  className={styles.input}
                  ref={inputRef}
                  onChange={changeHandler}
                />
              </div>
              <div className={styles.options}>
                {filteredResults.tabs.map((option: Tab, index: number) => (
                  <CommandOption
                    option={option}
                    colors={getColors(option.group)}
                    key={index}
                    groupName={option.group ? getName(option.group) : 'None'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandPalette;
