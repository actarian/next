
import { IEquatable } from '@core/entity/entity';
import { Badge, Checkbox, Collapse, Spacer, Text } from '@geist-ui/core';
import { Filter, IFilterOption } from '@hooks/useFilters/filter';
import styles from './filter-sidebar.module.scss';

export default function FilterSidebar({ filters, onChange }: { filters: Filter[], onChange: (filter: Filter, values: IEquatable[]) => void }) {

  // console.log('FilterSidebar', filters.filter(x => x.values.length).map(x => x.values.join(', ')));

  function onOptionChange(filter: Filter, option: IFilterOption) {
    filter.toggle(option);
    onChange(filter, filter.values);
  }

  return (
    <div style={{ padding: '0 10px' }}>
      <Collapse.Group>
        {filters && filters.map((filter, i) => (
          <Collapse key={filter.id} title={filter.title} font="11px">
            {filter.options && filter.options.map((option) => (
              option.title && <Checkbox className={styles.checkbox} key={option.id} checked={filter.has(option)} onChange={() => onOptionChange(filter, option)} marginBottom="10px" disabled={option.count === 0}>
                <span style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text span font="13px">{option.title}</Text> <Spacer style={{ flex: 1 }}></Spacer> {option.count ? <Badge type="success" scale={0.7}>{option.count}</Badge> : null}
                </span>
              </Checkbox>
            ))}
          </Collapse>
        ))}
      </Collapse.Group>
    </div>
  )
}
