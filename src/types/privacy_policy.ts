export interface PrivacyPolicySection {
    id: string
    title: string
    description: string
    points: string[]
    policy_id: number
  }
  
  export interface PrivacyPolicy {
    id: number
    title: string
    updated_at: string
    sections: PrivacyPolicySection[]
  }
  
  export interface UpdatePrivacyPolicyData {
    title: string
    sections: Omit<PrivacyPolicySection, "policy_id">[]
  }
  