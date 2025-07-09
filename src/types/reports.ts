export interface Report {
  id: number
  title: string
  description: string | null
  type: 'users' | 'content' | 'engagement' | 'revenue' | 'custom'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  completed_at: string | null
  created_by: string
  file_url: string | null
  file_size: number | null
  parameters: ReportParameters

  download_url: string
  filename: string
}

export interface ReportParameters {
  date_range: {
    start_date: string
    end_date: string
  }
  filters: {
    user_types?: string[]
    content_types?: string[]
    genres?: string[]
    artists?: string[]
  }
  metrics: string[]
  format: 'pdf' | 'excel' | 'csv'
  include_charts: boolean
}

export interface CreateReportData {
  title: string
  description?: string
  type: Report['type']
  parameters: ReportParameters
}
