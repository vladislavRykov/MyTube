import React from 'react';
import s from './FilterItem.module.scss';
import { Filter } from '../../../../types/Common';
import cn from 'classnames';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';

interface FilterItemProps {
  filter: Filter;
}

const FilterItem: React.FC<FilterItemProps> = ({ filter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const setQueryParams = (
    key: string,
    value: any,
    config: { replace: boolean; operation?: 'remove' | 'add' } = { replace: true },
  ) => {
    setSearchParams((sParams) => {
      if (config.replace) {
        if (value) sParams.set(key, value);
        else sParams.delete(key);
        return sParams;
      }
      const valuesString = sParams.get(key);
      if (config.operation === 'add') {
        sParams.set(key, valuesString ? `${valuesString},${value}` : value);
      } else {
        if (!valuesString) return sParams;
        const valuesMassive = valuesString.split(',');
        const valueIndex = valuesMassive.indexOf(value);
        if (valueIndex !== -1) {
          valuesMassive.splice(valueIndex, 1);
        }
        valuesMassive.length === 0
          ? sParams.delete(key)
          : sParams.set(key, valuesMassive.join(','));
      }
      return sParams;
    });
  };
  return (
    <div className={s.filter}>
      <h2 className={s.filter_title}>{filter.title}</h2>
      <ul className={s.filter_options}>
        {filter.options.map((opt, idx) => {
          const isSelected = filter.canChoseMany
            ? searchParams.has(opt.key) &&
              opt.value &&
              searchParams.get(opt.key)?.includes(opt.value)
            : (searchParams.has(opt.key) && searchParams.get(opt.key) === opt.value) ||
              (!searchParams.has(opt.key) && !opt.value);
          const setKey = () =>
            setQueryParams(opt.key, opt.value, { replace: !filter.canChoseMany, operation: 'add' });
          const deleteKey = () => {
            setQueryParams(opt.key, filter.canChoseMany ? opt.value : null, {
              replace: !filter.canChoseMany,
              operation: 'remove',
            });
          };
          return (
            <li
              onClick={
                isSelected ? (!filter.oneOptionMustBeSelected ? deleteKey : undefined) : setKey
              }
              className={cn(s.filter_option, { [s.filter_option_selected]: isSelected })}>
              {opt.title}
              {!filter.oneOptionMustBeSelected && isSelected && (
                <GrClose className={s.filter_option_close} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterItem;
