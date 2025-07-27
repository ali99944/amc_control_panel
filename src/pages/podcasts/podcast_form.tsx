"use client"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import LabeledSwitch from "../../components/ui/labeled-switch"
import Select from "../../components/ui/select"
import Textarea from "../../components/ui/textarea"
import { Podcast } from "../../types/podcast"
import { PodcastFormValues, podcastFormSchema } from "./podcast_form_schema"

interface PodcastFormProps {
  initialData?: Podcast
  onSubmit: (data: PodcastFormValues) => void
  loading?: boolean // Changed from isLoading to loading
  submitText?: string
  cancelText?: string
  onCancel?: () => void
}

export function PodcastForm({
  initialData,
  onSubmit,
  loading = false,
  submitText = "Save",
  cancelText = "Cancel",
  onCancel,
}: PodcastFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PodcastFormValues>({
    resolver: zodResolver(podcastFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      language: initialData?.language || "",
      imageUrl: initialData?.imageUrl || "",
      status: initialData?.status || "draft",
    },
  })

  const handleFormSubmit: SubmitHandler<PodcastFormValues> = (data) => {
    onSubmit(data)
  }

  const categoryOptions = [
    { label: "Technology", value: "Technology" },
    { label: "News", value: "News" },
    { label: "Comedy", value: "Comedy" },
    { label: "Education", value: "Education" },
    { label: "Health & Fitness", value: "Health & Fitness" },
  ]

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Spanish", value: "Spanish" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
  ]

  const statusOptions = [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" },
  ]

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Podcast Information</h4>

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Podcast Title"
              placeholder="e.g., The Daily Grind"
              error={errors.title?.message}
              required
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Description"
              rows={4}
              placeholder="A brief description of the podcast..."
              error={errors.description?.message}
              required
            />
          )}
        />

        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Image URL"
              placeholder="https://example.com/podcast-cover.jpg"
              error={errors.imageUrl?.message}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <Select {...field} options={categoryOptions} placeholder="Select a category" />
              {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
            </div>
          )}
        />

        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <Select {...field} options={languageOptions} placeholder="Select a language" />
              {errors.language && <p className="text-sm text-red-600">{errors.language.message}</p>}
            </div>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <LabeledSwitch
              checked={field.value === "published"} // Assuming 'published' means active for the switch
              onChange={(checked) => field.onChange(checked ? "published" : "draft")}
              label="Publish Podcast"
              description="Set the podcast status to published or draft."
            />
          )}
        />
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-200">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={loading} className="flex-1">
            {cancelText}
          </Button>
        )}
        <Button type="submit" variant="primary" loading={loading} className="flex-1">
          {submitText}
        </Button>
      </div>
    </form>
  )
}
