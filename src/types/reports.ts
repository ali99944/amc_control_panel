export interface Report {
  id: number
  report_name: string
  description: string | null
  report_type: 'user_report' | 'content_report' | 'engagement_report'
  created_at: string
  
  start_date: string
  end_date: string

  generated_report_url: string
  generated_report_size: number
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
  report_name: string
  description?: string
  report_type: Report['report_type']
}
