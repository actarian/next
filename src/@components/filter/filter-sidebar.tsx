
import { Badge, Checkbox, Collapse, Spacer, Text } from '@geist-ui/core';
import styles from './filter-sidebar.module.scss';

export function FilterSidebar({ filters, onChange }) {

  const onFeatureDidChange = (filter, values) => {
    // console.log('onFeatureDidChange', filter, values);
    onChange(filter, values);
  }

  return (
    <div style={{ padding: '0 10px' }}>
      <Collapse.Group>
        {filters && filters.map((filter, i) => (
          <Collapse key={filter.id} title={filter.title} initialVisible={false} font="11px">
            {filter.options &&
              <Checkbox.Group value={filter.values} onChange={(values) => onFeatureDidChange(filter, values)}>
                {filter.options.map((option) => (
                  option.title && <Checkbox className={styles.checkbox} key={option.id} value={option.id} marginBottom="10px" disabled={option.count === 0}>
                    <span style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text span font="13px">{option.title}</Text> <Spacer style={{ flex: 1 }}></Spacer> {option.count ? <Badge type="success" scale={0.7}>{option.count}</Badge> : null}
                    </span>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            }
          </Collapse>
        ))}
      </Collapse.Group>
    </div>
  )
}
