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
import AlbumsPage from "./pages/albums/albums";
import AlbumDetailsPage from "./pages/album-details/album-details-page";
// import PodcastsPage from "./pages/podcasts/podcasts_page";
// import PodcastDetailsPage from "./pages/podcasts/details/podcast_details_page";
// import PaymentsPage from "./pages/payments/payments_page";
// import PaymentDetailsPage from "./pages/payments/payment_details_page";
// import PaymentInvoicePage from "./pages/payments/payment_invoice_page";
// import SubscriptionsPage from "./pages/subscriptions/subscriptions_page";
// import ArtistProfilePage from "./pages/artist_profile/artist_profile";
import DeletedUsersPage from "./pages/users/deleted_users/deleted_users_page";

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
                path: '/users/trash',
                element: <DeletedUsersPage />
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
            // {
            //     path: '/artists/:id',
            //     element: <ArtistProfilePage />
            // },
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
            {
                path: '/albums',
                element: <AlbumsPage />
            },
            {
                path: '/albums/:id',
                element: <AlbumDetailsPage />
            },
            // {
            //     path: '/podcasts',
            //     element: <PodcastsPage />
            // },
            // {
            //     path: '/podcasts/:id',
            //     element: <PodcastDetailsPage />
            // },
            // {
            //     path: '/payments',
            //     element: <PaymentsPage />
            // },
            // {
            //     path: '/payments/:id',
            //     element: <PaymentDetailsPage />
            // },
            // {
            //     path: '/payments/:id/invoice',
            //     element: <PaymentInvoicePage />
            // },
            // {
            //     path: '/subscriptions',
            //     element: <SubscriptionsPage />
            // },
        ],
    },
    {
        path: '/login',
        element: <SpotifyLoginPage />
    }
])


export default router