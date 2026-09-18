import {type ObjectInputProps} from 'sanity'
import {VisualEditorBanner} from './visualEditorBanner'

/**
 * Page form with a Visual Editor entry point above the fields.
 */
export function PageFormInput(props: ObjectInputProps) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
      <VisualEditorBanner documentType="page" />
      {props.renderDefault(props)}
    </div>
  )
}
