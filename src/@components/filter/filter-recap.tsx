
import { Button, Text } from '@geist-ui/core';
import { XCircleFill } from '@geist-ui/icons';

export function FilterRecap({ filters, onChange }) {

  const onRemove = (filter, option) => {
    let values = [...filter.values];
    const index = values.indexOf(option.id);
    if (index !== -1) {
      values.splice(index, 1);
      console.log('onRemove', filter.id, option.id, values);
      onChange(filter, values);
    }
  }

  return (
    <div style={{ padding: '0 10px' }}>
      {filters && filters.filter(x => x.hasAny()).map((filter, i) => (
        <div key={filter.id}>
          <Text>{filter.title}</Text>
          {filter.options && filter.options.filter(x => filter.has(x)).map((option) => (
            <Button key={option.id} type="abort" icon={<XCircleFill />} auto padding={0} scale={0.5} onClick={() => onRemove(filter, option)}>{option.title}</Button>
          ))}
        </div>
      ))}
    </div>
  )
}
