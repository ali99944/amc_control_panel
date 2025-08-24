"use client"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  User,
  LinkIcon,
  Music,
  BarChart3,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Save,
  Play,
  Heart,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react"
import { LineChart, BarChart } from "@mui/x-charts"
import Dialog from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Textarea from "../../components/ui/textarea"
import ImagePicker from "../../components/ui/image-picker"
import LabeledSwitch from "../../components/ui/labeled-switch"
import { useGenres } from "../../hooks/use-genres"
import { useMoods, useUpdateArtistProfile } from "../../hooks/use_artist_profile"
import { ArtistProfile, UpdateArtistProfileData } from "../../types/artist_profile"

// Form validation schema
const artistProfileSchema = z.object({
  name: z.string().min(1, "اسم الفنان مطلوب"),
  bio: z.string().max(1000, "السيرة الذاتية يجب أن تكون أقل من 1000 حرف"),
  social_links: z.object({
    instagram: z.string().url("رابط غير صحيح").optional().or(z.literal("")),
    twitter: z.string().url("رابط غير صحيح").optional().or(z.literal("")),
    youtube: z.string().url("رابط غير صحيح").optional().or(z.literal("")),
    spotify: z.string().url("رابط غير صحيح").optional().or(z.literal("")),
    apple_music: z.string().url("رابط غير صحيح").optional().or(z.literal("")),
  }),
  genres: z.array(z.string()).min(1, "يجب اختيار نوع واحد على الأقل"),
  moods: z.array(z.string()).min(1, "يجب اختيار مزاج واحد على الأقل"),
  verification_status: z.enum(["verified", "pending", "unverified"]),
  is_featured: z.boolean(),
  is_active: z.boolean(),
})

type FormData = z.infer<typeof artistProfileSchema>

interface ArtistProfileEditorProps {
  isOpen: boolean
  onClose: () => void
  artist: ArtistProfile
  onSuccess?: () => void
}

export default function ArtistProfileEditor({ isOpen, onClose, artist, onSuccess }: ArtistProfileEditorProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "discography" | "analytics">("profile")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const { data: availableGenres = [] } = useGenres()
  const { data: availableMoods = [] } = useMoods()
  const { mutate: updateProfile, isPending } = useUpdateArtistProfile(onSuccess)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(artistProfileSchema),
    defaultValues: {
      name: artist.name,
      bio: artist.bio,
      social_links: {
        instagram: artist.social_links.instagram || "",
        twitter: artist.social_links.twitter || "",
        youtube: artist.social_links.youtube || "",
        spotify: artist.social_links.spotify || "",
        apple_music: artist.social_links.apple_music || "",
      },
      genres: artist.genres,
      moods: artist.moods,
      verification_status: artist.verification_status,
      is_featured: artist.is_featured,
      is_active: artist.is_active,
    },
  })

  const watchedGenres = watch("genres")
  const watchedMoods = watch("moods")

  const handleGenreToggle = (genre: string) => {
    const currentGenres = watchedGenres || []
    if (currentGenres.includes(genre)) {
      setValue(
        "genres",
        currentGenres.filter((g) => g !== genre),
      )
    } else {
      setValue("genres", [...currentGenres, genre])
    }
  }

  const handleMoodToggle = (mood: string) => {
    const currentMoods = watchedMoods || []
    if (currentMoods.includes(mood)) {
      setValue(
        "moods",
        currentMoods.filter((m) => m !== mood),
      )
    } else {
      setValue("moods", [...currentMoods, mood])
    }
  }

  const onSubmit = (data: FormData) => {
    const updateData: UpdateArtistProfileData = {
      id: artist.id,
      ...data,
      ...(selectedImage && { image: selectedImage }),
    }
    updateProfile(updateData)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const tabs = [
    { id: "profile", label: "الملف الشخصي", icon: User },
    { id: "discography", label: "الأعمال الفنية", icon: Music },
    { id: "analytics", label: "التحليلات", icon: BarChart3 },
  ]

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={`إدارة ملف ${artist.name}`} size="xl">
      <div className="flex flex-col h-[80vh]">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as unknown as "profile" | "discography" | "analytics")}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "profile" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="اسم الفنان"
                        placeholder="اسم الفنان"
                        error={errors.name?.message}
                        required
                      />
                    )}
                  />

                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="السيرة الذاتية"
                        rows={4}
                        placeholder="نبذة عن الفنان..."
                        error={errors.bio?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">صورة الفنان</label>
                  <ImagePicker
                    onChange={(file) => setSelectedImage(file as File)}
                    multiple={false}
                    maxSize={5}
                    placeholder="اختر صورة للفنان"
                    showPreview
                  />
                  {artist.image && !selectedImage && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">الصورة الحالية:</p>
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={artist.image || "/placeholder.svg"}
                          alt="Current artist"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  الروابط الاجتماعية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="social_links.instagram"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Instagram"
                        placeholder="https://instagram.com/username"
                        icon={Instagram}
                        error={errors.social_links?.instagram?.message}
                      />
                    )}
                  />
                  <Controller
                    name="social_links.twitter"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Twitter"
                        placeholder="https://twitter.com/username"
                        icon={Twitter}
                        error={errors.social_links?.twitter?.message}
                      />
                    )}
                  />
                  <Controller
                    name="social_links.youtube"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="YouTube"
                        placeholder="https://youtube.com/channel/..."
                        icon={Youtube}
                        error={errors.social_links?.youtube?.message}
                      />
                    )}
                  />
                  <Controller
                    name="social_links.spotify"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Spotify"
                        placeholder="https://spotify.com/artist/..."
                        icon={Globe}
                        error={errors.social_links?.spotify?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Genres */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">الأنواع الموسيقية</h3>
                <div className="flex flex-wrap gap-2">
                  {availableGenres.map((genre) => (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => handleGenreToggle(genre.name)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        watchedGenres?.includes(genre.name)
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
                {errors.genres && <p className="text-red-500 text-sm mt-1">{errors.genres.message}</p>}
              </div>

              {/* Moods */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">المزاج الموسيقي</h3>
                <div className="flex flex-wrap gap-2">
                  {availableMoods.map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => handleMoodToggle(mood)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        watchedMoods?.includes(mood)
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
                {errors.moods && <p className="text-red-500 text-sm mt-1">{errors.moods.message}</p>}
              </div>

              {/* Status Controls */}
              <div className="space-y-4">
                <Controller
                  name="verification_status"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">حالة التوثيق</label>
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="unverified">غير موثق</option>
                        <option value="pending">في انتظار التوثيق</option>
                        <option value="verified">موثق</option>
                      </select>
                    </div>
                  )}
                />

                <Controller
                  name="is_featured"
                  control={control}
                  render={({ field }) => (
                    <LabeledSwitch
                      checked={field.value}
                      onChange={field.onChange}
                      title="فنان مميز"
                      description="عرض الفنان في القسم المميز"
                    />
                  )}
                />

                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <LabeledSwitch
                      checked={field.value}
                      onChange={field.onChange}
                      title="تفعيل الفنان"
                      description="هل تريد تفعيل هذا الفنان؟"
                    />
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <Button type="button" variant="secondary" onClick={onClose} disabled={isPending} className="flex-1">
                  إلغاء
                </Button>
                <Button type="submit" variant="primary" loading={isPending} className="flex-1" icon={Save}>
                  حفظ التغييرات
                </Button>
              </div>
            </form>
          )}

          {activeTab === "discography" && (
            <div className="space-y-6">
              {/* Albums */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  الألبومات ({artist.discography.albums.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {artist.discography.albums.map((album) => (
                    <Card key={album.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={album.cover_image || "/placeholder.svg"}
                            alt={album.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{album.title}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(album.release_date).getFullYear()}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span>{album.tracks_count} أغنية</span>
                            <span className="flex items-center gap-1">
                              <Play className="w-3 h-3" />
                              {formatNumber(album.total_streams)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Singles */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  الأغاني المنفردة ({artist.discography.singles.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {artist.discography.singles.map((single) => (
                    <Card key={single.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={single.cover_image || "/placeholder.svg"}
                            alt={single.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{single.title}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(single.release_date).getFullYear()}
                          </p>
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                            <Play className="w-3 h-3" />
                            {formatNumber(single.streams)} تشغيل
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">إجمالي التشغيلات</p>
                      <p className="text-lg font-bold text-primary">{formatNumber(artist.total_streams)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">المتابعين</p>
                      <p className="text-lg font-bold text-purple-500">{formatNumber(artist.followers_count)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">المستمعين الشهريين</p>
                      <p className="text-lg font-bold text-orange-500">{formatNumber(artist.monthly_listeners)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">معدل النمو</p>
                      <p className="text-lg font-bold text-green-500">+12.5%</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Follower Growth */}
                <Card className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">نمو المتابعين</h3>
                  <div className="h-[300px]">
                    <LineChart
                      height={280}
                      series={[
                        {
                          data: artist.analytics.follower_growth.map((d) => d.followers),
                          color: "var(--primary)",
                          curve: "catmullRom",
                        },
                      ]}
                      xAxis={[
                        {
                          data: artist.analytics.follower_growth.map((d) => new Date(d.date)),
                          scaleType: "time",
                        },
                      ]}
                      grid={{ vertical: true, horizontal: true }}
                      direction="ltr"
                    />
                  </div>
                </Card>

                {/* Monthly Streams */}
                <Card className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">التشغيلات الشهرية</h3>
                  <div className="h-[300px]">
                    <BarChart
                      height={280}
                      series={[
                        {
                          data: artist.analytics.monthly_streams.map((d) => d.streams),
                          color: "var(--primary)",
                        },
                      ]}
                      xAxis={[
                        {
                          data: artist.analytics.monthly_streams.map((d) => d.month),
                          scaleType: "band",
                        },
                      ]}
                      grid={{ vertical: true, horizontal: true }}
                      direction="ltr"
                    />
                  </div>
                </Card>
              </div>

              {/* Top Tracks Performance */}
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">أداء أهم الأغاني</h3>
                <div className="space-y-3">
                  {artist.analytics.streams_per_track.map((track, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{track.track_name}</p>
                          <p className="text-sm text-gray-600">{formatNumber(track.streams)} تشغيل</p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          track.growth >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <TrendingUp className={`w-4 h-4 ${track.growth < 0 ? "rotate-180" : ""}`} />
                        {Math.abs(track.growth)}%
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Countries */}
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">أهم البلدان</h3>
                <div className="space-y-3">
                  {artist.top_countries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{formatNumber(country.listeners)}</span>
                        <span className="text-xs text-gray-500">({country.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}
