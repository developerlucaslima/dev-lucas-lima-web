export type ContactFieldName = 'email' | 'message' | 'name'

export interface ContactUiCopy {
  readonly title: string
  readonly form: {
    readonly formTitle: string
    readonly formSubtitle: string
    readonly inputs: readonly {
      readonly name: string
      readonly placeholder: string
      readonly type: string
      readonly register: 'email' | 'name'
    }[]
    readonly textArea: {
      readonly name: string
      readonly placeholder: string
      readonly register: 'message'
    }
    readonly buttonTexts: {
      readonly isSubmitting: string
      readonly isNotSubmitting: string
    }
  }
  readonly formErrorMessages: Record<ContactFieldName, string>
  readonly submitToastMessages: {
    readonly success: { readonly title: string; readonly description: string }
    readonly error: { readonly title: string; readonly description: string }
  }
}
