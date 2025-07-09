// "use client"

// import React, { useState } from "react"
// import { useForm, Controller } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Music, Save } from "lucide-react"

// import Button from "../../components/ui/button"
// import Card from "../../components/ui/card"
// import AudioPicker from "../../components/ui/audio-picker"
// import LyricsEditor from "../../components/ui/lyrics-editor"

// // Form schema
// const lyricsFormSchema = z.object({
//   lyrics: z.string().max(10000, "كلمات الأغنية يجب أن تكون أقل من 10000 حرف").optional(),
//   lrc_content: z.string().optional(),
// })

// type LyricsFormData = z.infer<typeof lyricsFormSchema>

// export default function LyricsEditorDemo() {
//   const [audioFile, setAudioFile] = useState<File | null>(null)
//   const [audioUrl, setAudioUrl] = useState<string>("") 
  
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<LyricsFormData>({
//     resolver: zodResolver(lyricsFormSchema),
//     defaultValues: {
//       lyrics: "",
//       lrc_content: "",
//     },
//   })
  
//   const watchLyrics = watch("lyrics")
//   const watchLrcContent = watch("lrc_content")
  
//   const onSubmit = async (data: LyricsFormData) => {
//     // Simulate API call
//     console.log("Form data:", data)
//     alert("تم حفظ كلمات الأغنية بنجاح!")
//   }
  
//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-6">محرر كلمات الأغاني</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2">
//           <Card>
//             <Card.Header>
//               <Card.Title>إضافة كلمات الأغنية</Card.Title>
//               <Card.Description>
//                 يمكنك إضافة كلمات الأغنية بشكل مباشر أو تحميل ملف LRC أو إنشاء جدول زمني للكلمات
//               </Card.Description>
//             </Card.Header>
            
//             <Card.Content>
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 {/* Audio File Picker */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     الملف الصوتي <span className="text-sm text-gray-500">(اختياري)</span>
//                   </label>
//                   <AudioPicker
//                     onChange={(file) => {
//                       setAudioFile(file as File)
//                       if (file) {
//                         setAudioUrl(URL.createObjectURL(file as File))
//                       } else {
//                         setAudioUrl("")
//                       }
//                     }}
//                     multiple={false}
//                     maxSize={100}
//                     placeholder="اختر الملف الصوتي للأغنية"
//                     showPreview
//                     showFileInfo
//                   />
//                 </div>
                
//                 {/* Lyrics Editor */}
//                 <Controller
//                   name="lyrics"
//                   control={control}
//                   render={({ field }) => (
//                     <LyricsEditor
//                       initialLyrics={field.value}
//                       audioFile={audioFile}
//                       audioUrl={audioUrl}
//                       onChange={(lyrics) => {
//                         field.onChange(lyrics)
//                       }}
//                       onLrcChange={(lrcContent) => {
//                         setValue("lrc_content", lrcContent)
//                       }}
//                       error={errors.lyrics?.message}
//                     />
//                   )}
//                 />
                
//                 {/* Submit Button */}
//                 <div className="flex justify-end">
//                   <Button
//                     type="submit"
//                     variant="primary"
//                     loading={isSubmitting}
//                     className="flex items-center gap-2"
//                   >
//                     <Save className="w-4 h-4" />
//                     حفظ كلمات الأغنية
//                   </Button>
//                 </div>
//               </form>
//             </Card.Content>
//           </Card>
//         </div>
        
//         <div>
//           <Card>
//             <Card.Header>
//               <Card.Title>معاينة</Card.Title>
//               <Card.Description>
//                 معاينة كلمات الأغنية والمحتوى المنسق
//               </Card.Description>
//             </Card.Header>
            
//             <Card.Content>
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-700 mb-2">كلمات الأغنية:</h3>
//                   <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm font-mono max-h-[200px] overflow-y-auto">
//                     {watchLyrics || "لا توجد كلمات بعد"}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-700 mb-2">محتوى ملف LRC:</h3>
//                   <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm font-mono max-h-[200px] overflow-y-auto">
//                     {watchLrcContent || "لا يوجد محتوى LRC بعد"}
//                   </div>
//                 </div>
//               </div>
//             </Card.Content>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }