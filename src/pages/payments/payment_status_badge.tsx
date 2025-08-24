// import { Badge } from "@/components/ui/badge"
// import { PaymentStatus } from "@/types/payment"

// interface PaymentStatusBadgeProps {
//   status: PaymentStatus
// }

// export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
//   let variant: "default" | "secondary" | "destructive" | "outline" = "default"
//   let text = status

//   switch (status) {
//     case PaymentStatus.Completed:
//       variant = "default"
//       text = "Completed"
//       break
//     case PaymentStatus.Pending:
//       variant = "secondary"
//       text = "Pending"
//       break
//     case PaymentStatus.Failed:
//       variant = "destructive"
//       text = "Failed"
//       break
//     case PaymentStatus.Refunded:
//       variant = "outline"
//       text = "Refunded"
//       break
//     default:
//       variant = "secondary"
//       text = "Unknown"
//   }

//   return <Badge variant={variant}>{text}</Badge>
// }
