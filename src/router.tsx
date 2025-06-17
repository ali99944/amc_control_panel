import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./pages/dashboard-layout";
import HomePage from "./pages/home/home";
import ArtistsPage from "./pages/artists/artists-page";
import GenresPage from './pages/genres/genres-page';
import SongsPage from './pages/songs/songs-page';
import UsersPage from './pages/users/users-page';
// import SettingsPage from './pages/settings/settings-page';
import PlaylistsPage from './pages/playlists/playlists-page';
import AnalyticsPage from "./pages/analytics-page";
import AlbumsPage from "./pages/albums";
import ManagersPage from "./pages/managers";
import EditUserPage from "./pages/users/edit-user-page";
import PermissionsPage from "./pages/manager_permissions";
import LoginPage from "./pages/login_page";
import ReportsPage from "./pages/reports";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/dashboard/artists',
                element: <ArtistsPage />
            },
            {
                path: '/dashboard/genres',
                element: <GenresPage />
            },
            { path: '/dashboard/songs', element: <SongsPage /> },
            { path: '/dashboard/users', element: <UsersPage /> },
            { path: '/dashboard/users/:id/edit', element: <EditUserPage /> },
            // { path: '/dashboard/settings', element: <SettingsPage /> },
            { path: '/dashboard/playlists', element: <PlaylistsPage /> },
            { path: '/dashboard/analytics', element: <AnalyticsPage /> },
            { path: '/dashboard/reports', element: <ReportsPage /> },
            { path: '/dashboard/albums', element: <AlbumsPage /> },
            { path: '/dashboard/managers', element: <ManagersPage /> },
            { path: '/dashboard/managers/:id/permissions', element: <PermissionsPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])


export default router