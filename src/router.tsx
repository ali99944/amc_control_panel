import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./pages/dashboard-layout";
import DashboardHome from "./pages/home/home";
import Login from "./pages/auth/login";
import ArtistsManagement from "./pages/artists/artists-management";
import Settings from "./pages/settings/settings";
import PlaylistsManagement from "./pages/playlists/playlists-management";
import SongsManagement from "./pages/songs/songs-management";
import UsersManagement from "./pages/user/users-page";
import Analytics from "./pages/analytics/analytics";
import AlbumsManagement from "./pages/albums/albums";
import PodcastCategories from "./pages/podcast-categories/podcast_categories_management";
import Podcasts from "./pages/podcasts/podcasts";
import GenreManagement from "./pages/genres/genre_management";
import SongNew from "./pages/songs/song-new";
import SongEdit from "./pages/songs/song-edit";
import PlaylistNew from "./pages/playlists/playlist-new";
import PlaylistEdit from "./pages/playlists/playlist-edit";
import Managers from "./pages/managers/managers-page"

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '/',
                element: <DashboardHome />
            },
            {
                path: '/artists',
                element: <ArtistsManagement />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/playlists',
                element: <PlaylistsManagement />
            },
            {
                path: '/playlists/new',
                element: <PlaylistNew />
            },
            {
                path: '/playlists/:id/edit',
                element: <PlaylistEdit />
            },
            {
                path: '/songs',
                element: <SongsManagement />
            },
            {
                path: '/songs/new',
                element: <SongNew />
            },
            {
                path: '/songs/:id/edit',
                element: <SongEdit />
            },
            {
                path: '/users',
                element: <UsersManagement />
            },
            {
                path: '/analytics',
                element: <Analytics />
            },
            {
                path: '/albums',
                element: <AlbumsManagement />
            },
            {
                path: '/podcast-categories',
                element: <PodcastCategories />
            },
            {
                path: '/podcasts',
                element: <Podcasts />
            },
            {
                path: '/genres',
                element: <GenreManagement />
            },
            {
                path: '/managers',
                element: <Managers />
            }
        ]
    },

    {
        path: '/login',
        element: <Login />
    }
])


export default router