
import { IEquatable } from '@core';
import { Button, ButtonGroup, Text } from '@geist-ui/core';
import { XCircleFill } from '@geist-ui/icons';
import { Filter, IFilterOption } from '@hooks';

export default function FilterRecap({ filters, onChange }: { filters: Filter[], onChange: (filter: Filter, values: IEquatable[]) => void }) {

  const onRemove = (filter: Filter, option: IFilterOption) => {
    let values = [...filter.values];
    const index = values.indexOf(option.id);
    if (index !== -1) {
      values.splice(index, 1);
      // console.log('onRemove', filter.id, option.id, values);
      onChange(filter, values);
    }
  }

  return (
    <div style={{ padding: '0 10px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      {filters && filters.filter(x => x.hasAny()).map((filter, i) => (
        <div key={filter.id} style={{ display: 'flex', alignItems: 'center', padding: '0 10px 0 0' }}>
          <Text paddingRight="10px">{filter.title}</Text>

          {false && filter.options && filter.options.filter(x => filter.has(x)).map((option) => (
            <Button key={option.id} type="abort" icon={<XCircleFill />} auto padding={0} scale={0.5} onClick={() => onRemove(filter, option)}>{option.title}</Button>
          ))}

          <ButtonGroup scale={1 / 3}>
            {filter.options && filter.options.filter(x => filter.has(x)).map((option) => (
              <Button key={option.id} scale={1 / 3} icon={<XCircleFill />} onClick={() => onRemove(filter, option)}>{option.title}</Button>
            ))}
          </ButtonGroup>

        </div>
      ))}
    </div>
  )
}
