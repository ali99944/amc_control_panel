export interface TermsConditionsSection {
    id: string
    title: string
    description: string
    points: string[]
    terms_id: number
  }
  
  export interface TermsConditions {
    id: number
    title: string
    updated_at: string
    sections: TermsConditionsSection[]
  }
  
  export interface UpdateTermsConditionsData {
    title: string
    sections: Omit<TermsConditionsSection, "terms_id">[]
  }
  