
import { Checkbox, Collapse } from '@geist-ui/core';

export function FilterSidebar({ filters, onChange }) {

  const onFeatureDidChange = (filter, values) => {
    console.log('onFeatureDidChange', filter, values);
    onChange(filter, values);
  }

  return (
    <div style={{ padding: '0 10px' }}>
      <Collapse.Group>
        {filters && filters.map((filter, i) => (
          <Collapse key={filter.id} title={filter.title}>
            {filter.options &&
              <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} value={filter.values} onChange={(values) => onFeatureDidChange(filter, values)}>
                {filter.options.map((option) => (
                  option.title && <Checkbox key={option.id} value={option.id} marginBottom="10px">{option.title}</Checkbox>
                ))}
              </Checkbox.Group>
            }
          </Collapse>
        ))}
      </Collapse.Group>
    </div>
  )
}
