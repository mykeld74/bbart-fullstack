import {ObjectInputMember, ObjectInputMembers, type ObjectInputProps} from 'sanity'

/**
 * Artwork form: image sticky on the left, fields on the right,
 * descriptions full-width underneath.
 */
export function ArtworkFormInput(props: ObjectInputProps) {
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

  const imageMember = members.find(
    (member) => member.kind === 'field' && member.name === 'mainImage',
  )
  const remainingMembers = members.filter(
    (member) => !(member.kind === 'field' && member.name === 'mainImage'),
  )

  const descriptionMembers = remainingMembers.filter(
    (member) => member.kind === 'fieldSet' && member.fieldSet?.name === 'descriptions',
  )
  const sidebarMembers = remainingMembers.filter(
    (member) => !(member.kind === 'fieldSet' && member.fieldSet?.name === 'descriptions'),
  )

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 42%) minmax(360px, 1fr)',
          gap: '2rem',
          alignItems: 'start',
          width: '100%',
        }}
        className="artworkFormGrid"
      >
        {imageMember && (
          <div style={{position: 'sticky', top: '1rem', minWidth: 0}}>
            <ObjectInputMember member={imageMember} {...memberProps} />
          </div>
        )}

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0}}>
          <ObjectInputMembers members={sidebarMembers} {...memberProps} />
        </div>
      </div>

      {descriptionMembers.length > 0 && (
        <ObjectInputMembers members={descriptionMembers} {...memberProps} />
      )}

      <style>{`
        @media (max-width: 900px) {
          .artworkFormGrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
