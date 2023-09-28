import React, { useState } from 'react';
import s from './Filters.module.scss';
import Button from '../../UI/Button/Button';
import { GiSettingsKnobs } from 'react-icons/gi';
import filters from './filtersData.json';
import FilterItem from './FilterItem/FilterItem';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { off } from 'process';

const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={s.filters}>
      <button onClick={() => setIsOpen((prev) => !prev)} className={s.filters_toggleButton}>
        <GiSettingsKnobs
          className={s.filters_filterImg}
          color={isOpen ? 'black' : 'rgb(78, 78, 78)'}
        />
        Фильтры
      </button>
      <div className={cn(s.filters_selector, { [s.filters_selector_closed]: !isOpen })}>
        {filters.map((filter, idx) => (
          <FilterItem key={idx} filter={filter} />
        ))}
      </div>
    </div>
  );
};

export default Filters;
