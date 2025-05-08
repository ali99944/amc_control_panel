import { Link } from "react-router-dom"
import { useGetQuery } from "../../hooks/queries-actions"
import { ChartBarIcon, MusicIcon, PlayIcon, UsersIcon } from "lucide-react"
import React from "react"
import { OverviewStatistics } from "../../types/statistics"
import Song from "../../types/song"
import User from "../../types/user"

interface StateCardItem {
  title: string
  value: string | null | undefined
  icon: React.ReactNode
  color: string
}
const StatCard = ({ title, value, icon, color }: StateCardItem) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      <div className="ml-5">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  </div>
)

// Chart Card Component
const ChartCard = ({ title, children }: {
  title: string,
  children: React.ReactNode
}) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
)

const Dashboard = () => {
  // Using the provided hook for data fetching
  const { data: stats, isLoading: statsLoading } = useGetQuery<OverviewStatistics>({
    key: ["statistics/overview"],
    url: "statistics/overview",
    // Mock data since we're using fake data
    options: {
      enabled: true,
      initialData: {
        total_users: 12458,
        total_songs: 3254,
        total_playlists: 876,
        total_listens: 1245789,
        total_albums: 6167,
        total_artists: 100
      },
    },
  })

  const { data: topSongs, isLoading: songsLoading } = useGetQuery<Song[]>({
    key: ["statistics/top-songs"],
    url: "statistics/top-songs",
    options: {
      enabled: true,
      initialData: [],
    },
  })

  const { data: recentUsers, isLoading: usersLoading } = useGetQuery<User[]>({
    key: ["statistics/recent-users"],
    url: "statistics/recent-users",
    options: {
      enabled: true,
      initialData: [],
    },
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to Ali Media Center admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={statsLoading ? "Loading..." : stats?.total_users.toLocaleString()}
          icon={<UsersIcon className="w-6 h-6 text-white" />}
          color="bg-[#FF1742]"
        />
        <StatCard
          title="Total Songs"
          value={statsLoading ? "Loading..." : stats?.total_songs.toLocaleString()}
          icon={<MusicIcon className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Playlists"
          value={statsLoading ? "Loading..." : stats?.total_playlists.toLocaleString()}
          icon={<PlayIcon className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
        <StatCard
          title="Total Listens"
          value={statsLoading ? "Loading..." : stats?.total_listens.toLocaleString()}
          icon={<ChartBarIcon className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Top Songs">
          {songsLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artist
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plays
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topSongs?.map((song) => (
                    <tr key={song.id} className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-900">{song.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{song.artist.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{song.total_plays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4">
            <Link to="/songs" className="text-[#FF1742] text-sm font-medium hover:underline">
              View all songs →
            </Link>
          </div>
        </ChartCard>

        <ChartCard title="Recent Users">
          {usersLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers?.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(user.joined_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4">
            <Link to="/users" className="text-[#FF1742] text-sm font-medium hover:underline">
              View all users →
            </Link>
          </div>
        </ChartCard>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/users/new"
            className="flex items-center justify-center p-4 bg-[#EEF4F7] rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            <span className="font-medium">Add New User</span>
          </Link>
          <Link
            to="/songs/new"
            className="flex items-center justify-center p-4 bg-[#EEF4F7] rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            <span className="font-medium">Add New Song</span>
          </Link>
          <Link
            to="/playlists/new"
            className="flex items-center justify-center p-4 bg-[#EEF4F7] rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            <span className="font-medium">Create Playlist</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

