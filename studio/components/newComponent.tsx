import React from 'react'

import {PatchEvent, set} from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'

import {Tooltip, Text, Box, TextInput} from '@sanity/ui'

const HoverInput = React.forwardRef((props, ref) => {
  const {type, onChange} = props
  return (
    <FormField label={type.title} description={type.description}>
      <Tooltip
        content={
          <Box padding={2}>
            <Text>Important Text</Text>
          </Box>
        }
        placement="top"
      >
        <TextInput
          type="text"
          ref={ref}
          placeholder={type.placeholder}
          value={props.value}
          onChange={(event) => {
            onChange(PatchEvent.from(set(event.target.value)))
          }}
        />
      </Tooltip>
    </FormField>
  )
})
