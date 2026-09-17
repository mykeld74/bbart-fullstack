import type {LayoutProps} from 'sanity'

/**
 * FormContainerRoot caps width at theme.container[1].
 * Keep an explicit CSS fallback so the form fills the document pane.
 * Portable Text blocks are centered by default — pin them left.
 */
const studioStyles = `
  [data-testid="document-panel-scroller"] div[data-gutter] {
    max-width: none !important;
  }

  [data-testid="document-panel-scroller"] > div {
    max-width: none !important;
  }

  [data-testid="document-panel-scroller"] [data-pt-block],
  [data-testid="document-panel-scroller"] [data-pt-block='container'] {
    margin-inline: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
  }
`

export function StudioLayout(props: LayoutProps) {
  return (
    <>
      <style>{studioStyles}</style>
      {props.renderDefault(props)}
    </>
  )
}
