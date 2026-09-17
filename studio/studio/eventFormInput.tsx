import {ObjectInputMember, ObjectInputMembers, type ObjectInputProps} from 'sanity'

/**
 * Event form: details on top, then image + description side by side.
 */
export function EventFormInput(props: ObjectInputProps) {
  const {
    members,
    renderAnnotation,
    renderBlock,
    renderField,
    renderInlineBlock,
    renderInput,
    renderItem,
    renderPreview,
  } = props

  const memberProps = {
    renderAnnotation,
    renderBlock,
    renderField,
    renderInlineBlock,
    renderInput,
    renderItem,
    renderPreview,
  }

  const imageMember = members.find((member) => member.kind === 'field' && member.name === 'image')
  const descriptionMember = members.find(
    (member) => member.kind === 'field' && member.name === 'description',
  )
  const detailMembers = members.filter(
    (member) =>
      !(member.kind === 'field' && (member.name === 'image' || member.name === 'description')),
  )

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <ObjectInputMembers members={detailMembers} {...memberProps} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 40%) minmax(320px, 1fr)',
          gap: '2rem',
          alignItems: 'start',
          width: '100%',
        }}
        className="eventFormGrid"
      >
        {imageMember && (
          <div style={{minWidth: 0}}>
            <ObjectInputMember member={imageMember} {...memberProps} />
          </div>
        )}

        {descriptionMember && (
          <div style={{minWidth: 0}}>
            <ObjectInputMember member={descriptionMember} {...memberProps} />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .eventFormGrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
