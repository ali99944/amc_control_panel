"use client"

import { useState } from "react"
import { useMutationAction } from "../../hooks/queries-actions"
import { CogIcon } from "lucide-react"

const Settings = () => {
  const [formData, setFormData] = useState({
    // Playback settings
    autoplay: true,
    shuffle: false,
    repeat: "off", // off, one, all
    crossfade: 2, // seconds
    audioQuality: "high", // low, medium, high

    // Ads and notifications
    showAds: true,
    pushNotifications: true,
    emailNotifications: true,
    newReleaseNotifications: true,
    marketingEmails: false,

    // Other settings
    downloadOverWifi: true,
    cacheSize: 1024, // MB
    language: "ar", // ar, en
    theme: "light", // light, dark, system
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Update settings mutation
  const updateMutation = useMutationAction({
    method: "put",
    url: "/api/settings",
    onSuccessCallback: () => {
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    },
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleRangeChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number.parseInt(value),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    updateMutation.mutate(formData, {
      onSettled: () => {
        setIsSaving(false)
      },
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">App Settings</h1>
        <p className="text-gray-600">Configure application settings and preferences</p>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Playback Settings */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <CogIcon className="w-5 h-5 text-[#FF1742] mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Playback Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="autoplay" className="text-sm font-medium text-gray-700">
                  Autoplay
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="autoplay"
                    id="autoplay"
                    checked={formData.autoplay}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block h-6 rounded-full w-12 ${formData.autoplay ? "bg-[#FF1742]" : "bg-gray-300"}`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${formData.autoplay ? "transform translate-x-6 border-[#FF1742]" : "border-gray-300"}`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="shuffle" className="text-sm font-medium text-gray-700">
                  Shuffle
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="shuffle"
                    id="shuffle"
                    checked={formData.shuffle}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block h-6 rounded-full w-12 ${formData.shuffle ? "bg-[#FF1742]" : "bg-gray-300"}`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${formData.shuffle ? "transform translate-x-6 border-[#FF1742]" : "border-gray-300"}`}
                  ></div>
                </div>
              </div>

              <div>
                <label htmlFor="repeat" className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat
                </label>
                <select
                  id="repeat"
                  name="repeat"
                  value={formData.repeat}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
                >
                  <option value="off">Off</option>
                  <option value="one">Repeat One</option>
                  <option value="all">Repeat All</option>
                </select>
              </div>

              <div>
                <label htmlFor="crossfade" className="block text-sm font-medium text-gray-700 mb-1">
                  Crossfade ({formData.crossfade} seconds)
                </label>
                <input
                  type="range"
                  id="crossfade"
                  name="crossfade"
                  min="0"
                  max="12"
                  step="1"
                  value={formData.crossfade}
                  onChange={handleRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF1742]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0s</span>
                  <span>12s</span>
                </div>
              </div>

              <div>
                <label htmlFor="audioQuality" className="block text-sm font-medium text-gray-700 mb-1">
                  Audio Quality
                </label>
                <select
                  id="audioQuality"
                  name="audioQuality"
                  value={formData.audioQuality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
                >
                  <option value="low">Low (64 kbps)</option>
                  <option value="medium">Medium (128 kbps)</option>
                  <option value="high">High (320 kbps)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ads and Notifications */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <CogIcon className="w-5 h-5 text-[#FF1742] mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Ads and Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="showAds" className="text-sm font-medium text-gray-700">
                  Show Ads
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="showAds"
                    id="showAds"
                    checked={formData.showAds}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block h-6 rounded-full w-12 ${formData.showAds ? "bg-[#FF1742]" : "bg-gray-300"}`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${formData.showAds ? "transform translate-x-6 border-[#FF1742]" : "border-gray-300"}`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="pushNotifications" className="text-sm font-medium text-gray-700">
                  Push Notifications
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    id="pushNotifications"
                    checked={formData.pushNotifications}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block h-6 rounded-full w-12 ${formData.pushNotifications ? "bg-[#FF1742]" : "bg-gray-300"}`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${formData.pushNotifications ? "transform translate-x-6 border-[#FF1742]" : "border-gray-300"}`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    id="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block h-6 rounded-full w-12 ${formData.emailNotifications ? "bg-[#FF1742]" : "bg-gray-300"}`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${formData.emailNotifications ? "transform translate-x-6 border-[#FF1742]" : "border-gray-300"}`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="newReleaseNotifications" className="text-sm font-medium text-gray-700">
                  New Release Notifications
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="newReleaseNotifications"
                    id="newReleaseNotifications"
                    checked={formData.newReleaseNotifications}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block h-6 rounded-full w-12 ${formData.newReleaseNotifications ? "bg-[#FF1742]" : "bg-gray-300"}`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${formData.newReleaseNotifications ? "transform translate-x-6 border-[#FF1742]" : "border-gray-300"}`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="marketingEmails" className="text-sm font-medium text-gray-700">
                  Marketing Emails
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="marketingEmails"
                    id="marketingEmails"
                    checked={formData.marketingEmails}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block h-6 rounded-full w-12 ${formData.marketingEmails ? "bg-[#FF1742]" : "bg-gray-300"}`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${formData.marketingEmails ? "transform translate-x-6 border-[#FF1742]" : "border-gray-300"}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Settings */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <CogIcon className="w-5 h-5 text-[#FF1742] mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Other Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="downloadOverWifi" className="text-sm font-medium text-gray-700">
                  Download Over WiFi Only
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="downloadOverWifi"
                    id="downloadOverWifi"
                    checked={formData.downloadOverWifi}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block h-6 rounded-full w-12 ${formData.downloadOverWifi ? "bg-[#FF1742]" : "bg-gray-300"}`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${formData.downloadOverWifi ? "transform translate-x-6 border-[#FF1742]" : "border-gray-300"}`}
                  ></div>
                </div>
              </div>

              <div>
                <label htmlFor="cacheSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Cache Size ({formData.cacheSize} MB)
                </label>
                <input
                  type="range"
                  id="cacheSize"
                  name="cacheSize"
                  min="512"
                  max="4096"
                  step="512"
                  value={formData.cacheSize}
                  onChange={handleRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF1742]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>512 MB</span>
                  <span>4 GB</span>
                </div>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1742] focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-2 bg-[#FF1742] text-white rounded-lg hover:bg-[#e0142d] ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Settings

