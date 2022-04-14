import React, { forwardRef } from 'react';
import { Tab } from '../../common/types';
import { useMachineContext } from '../../hooks/useMachineContext';
import styles from './GroupTag.module.css';

type GroupTagProps = {
  option: Tab;
};

const GroupTag = forwardRef<HTMLDivElement, GroupTagProps>(
  ({ option }, ref) => {
    const context = useMachineContext();

    const getGroup = (group: string) => {
      if (group) {
        return context.groups.find((_group) => _group.id === group);
      }
      return undefined;
    };

    const getGroupName = (tab: Tab) => getGroup(tab.group)?.title ?? 'None';

    const getColors = (tab: Tab) => {
      const group = getGroup(tab.group);
      // TODO: Better Colors WCAG AAA Contrast
      // SOURCE: https://webaim.org/resources/contrastchecker/
      // SOURCE: https://coolors.co/
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

    return (
      <div
        className={styles.groupTagContainer}
        style={getColors(option)}
        ref={ref}
      >
        <span className={styles.groupTagText}>{getGroupName(option)}</span>
      </div>
    );
  },
);

GroupTag.displayName = 'GroupTag';

export { GroupTag };
