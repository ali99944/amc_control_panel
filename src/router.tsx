import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/layout/dashboard-layout";
import AnalyticsPage from "./pages/analytics-page";
import ReportsPage from "./pages/reports/reports";
import SettingsPage from "./pages/settings/settings-page";
import UsersPage from "./pages/users/users-page";
import PlaylistsPage from "./pages/playlists/playlists-page";
import ArtistsPage from "./pages/artists/artists-page";
import SongsPage from "./pages/songs/songs-page";
import SongDetailsPage from "./pages/songs/song-details.tsx/song-details";
import ManagersPage from "./pages/managers/managers";
import ManagerPermissionsPage from "./pages/managers/manager-permissions";
import NotificationsPage from "./pages/notifications/notifications-page";
import Dashboard from "./pages/dashboard/dashboard";
import GenresPage from "./pages/genres/genres-page";
import SpotifyLoginPage from "./pages/auth/login_page";
import PrivacyPolicyPage from "./pages/privacy-policy/privacy-policy";
import TermsConditionsPage from "./pages/terms-conditions/terms-conditions-page";
import TagsPage from "./pages/tags/tags-page";
import ContactMessagesPage from "./pages/contact-messages/contact-messages-page";
import { ContentReportExample, EngagementReportExample, UsersReportExample } from "./components/reports/report-usage-examples";

const router = createBrowserRouter([
    {
        path: '/',
        element: 
            <DashboardLayout />
        ,
        children: [
            {
                index: true,    
                element: <Dashboard />
            },
            {
                path: '/genres',
                element: <GenresPage />
            },
            {
                path: '/users',
                element: <UsersPage />
            },
            {
                path: '/playlists',
                element: <PlaylistsPage />
            },
            {
                path: '/songs',
                element: <SongsPage />
            },
            {
                path: '/songs/:id',
                element: <SongDetailsPage />
            },
            {
                path: '/songs',
                element: <SongsPage />
            },
            {
                path: '/artists',
                element: <ArtistsPage />
            },
            {
                path: '/analytics',
                element: <AnalyticsPage />
            },
            {
                path: '/reports',
                element: <ReportsPage />
            },
            {
                path: '/settings',
                element: <SettingsPage />
            },
            {
                path: '/managers',
                element: <ManagersPage />
            },
            {
                path: '/managers/:id/permissions',
                element: <ManagerPermissionsPage />
            },
            {
                path: '/notifications',
                element: <NotificationsPage />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicyPage />
            },
            {
                path: '/terms-conditions',
                element: <TermsConditionsPage />
            },
            {
                path: '/tags',
                element: <TagsPage />
            },
            {
                path: '/contact-messages',
                element: <ContactMessagesPage />
            },
        ],
    },
    {
        path: '/dev',
        element: <>
            <EngagementReportExample />
            <ContentReportExample />
            <UsersReportExample />
        </>
    },
    {
        path: '/login',
        element: <SpotifyLoginPage />
    }
])


export default router