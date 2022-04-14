import React from 'react';
import { Tab } from '../background/types';
import styles from '../content/styles/CommandPalette.module.css';

type CommandOptionProps = {
  option: Tab;
  colors: { color: string; backgroundColor: string };
  groupName: string;
};

const CommandOption: React.FC<CommandOptionProps> = ({
  option,
  colors,
  groupName,
}) => (
  <a
    className={styles.option}
    href={option.url}
    rel="noreferrer"
    target="_blank"
    draggable="false"
  >
    <div className={styles.optionGroupContainer} style={colors}>
      <span>{groupName}</span>
    </div>
    <img src={option.icon} alt="Icon" />
    <div className={styles.optionWrapper}>
      <p>{option.title}</p>
    </div>
  </a>
);

export default CommandOption;
