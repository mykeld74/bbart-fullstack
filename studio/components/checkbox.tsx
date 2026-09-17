// Important items to allow form fields to work properly and patch the dataset.
import {PatchEvent, set} from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'

// Import the TextInput from UI
import {Checkbox} from '@sanity/ui'

const Checkboxcomponent = React.forwardRef((props, ref) => {
  const {type, onChange} = props
  return (
    <FormField label={type.title} description={type.description}>
      <Checkbox
        ref={ref}
        placeholder={type.placeholder}
        value={props.value}
        onChange={(event) => {
          console.log(event, 'event')
          // onChange(PatchEvent.from(set(event.target.value)));
        }}
      />
    </FormField>
  )
})

export default Checkboxcomponent
