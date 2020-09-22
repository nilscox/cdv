import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';

import { SortType } from 'src/types/SortType';

type SortMenuProps = {
  sort: SortType;
  onSortChange: (sort: SortType) => void;
};

const SortMenu: React.FC<SortMenuProps> = ({ sort: currentSort, onSortChange }) => {
  const [buttonRef, setButtonRef] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setButtonRef(e.currentTarget);
  const setSort = (sort: SortType) => () => {
    onSortChange(sort);
    setButtonRef(null);
  };

  const menuText = {
    [SortType.DATE_DESC]: 'Les plus récents en premier',
    [SortType.DATE_ASC]: 'Les plus anciens en premier',
    [SortType.RELEVANCE]: 'Les plus pertinents en premier',
  };

  return (
    <>

      <IconButton
        onClick={handleClick}
        style={{ background: 'transparent', marginLeft: -12 }}
        title="Tri"
      >
        <SortIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={buttonRef}
        keepMounted
        open={Boolean(buttonRef)}
        onClose={() => setButtonRef(null)}
      >
        { [SortType.DATE_DESC, SortType.DATE_ASC, SortType.RELEVANCE].map(sort => (
          <MenuItem
            key={sort}
            disabled={sort === currentSort}
            onClick={setSort(sort)}
          >
            { menuText[sort] }
          </MenuItem>
        )) }
      </Menu>

    </>
  );
};

export default SortMenu;
