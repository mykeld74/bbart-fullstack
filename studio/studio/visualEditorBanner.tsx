import {useCallback, useContext} from 'react'
import {getPublishedId, IntentButton, useFormValue} from 'sanity'
import {PresentationContext} from 'sanity/_singletons'
import {useRouterState} from 'sanity/router'
import {getPreviewPath} from '../presentation/resolve'

type VisualEditorBannerProps = {
  documentType: string
}

function useIsPresentationTool() {
  // Set only while the Presentation *tool* is active (not Structure locations UI)
  const presentation = useContext(PresentationContext)
  const activeToolName = useRouterState(
    useCallback(
      (routerState: {tool?: unknown}) =>
        typeof routerState.tool === 'string' ? routerState.tool : undefined,
      [],
    ),
  )

  return Boolean(presentation) || activeToolName === 'presentation'
}

/**
 * Opens Presentation for the current document on its front-end route.
 * Hidden while the Presentation tool is active.
 */
export function VisualEditorBanner({documentType}: VisualEditorBannerProps) {
  const isPresentationTool = useIsPresentationTool()
  const rawId = useFormValue(['_id']) as string | undefined
  const slug = useFormValue(['slug', 'current']) as string | undefined
  const preview = getPreviewPath(documentType, slug)
  const documentId = rawId ? getPublishedId(rawId) : undefined

  if (isPresentationTool || !preview || !documentId) return null

  return (
    <div className="visualEditorBtn" style={{width: 200, height: 60}}>
      <IntentButton
        intent="edit"
        params={{
          id: documentId,
          type: documentType,
          mode: 'presentation',
          presentation: 'presentation',
          preview,
        }}
        text="Visual Editor"
        tone="primary"
        mode="ghost"
      />
      <style>{`
        .visualEditorBtn > a,
        .visualEditorBtn > button {
          width: 200px !important;
          height: 60px !important;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
