import { Home, Music, PlayCircle, Album, Mic, Radio, TagsIcon, Headphones, Shield, Users, FileText, ShieldAlertIcon, Settings } from "lucide-react"
import { useSongs } from "../../hooks/use-songs"
import { useAlbums } from "../../hooks/use-albums"
import { useArtists } from "../../hooks/use-artists"
import { useGenres } from "../../hooks/use_artist_profile"
import { useTags } from "../../hooks/use-tags"
import { usePlaylists } from "../../hooks/use-playlists"
import { useUsers } from "../../hooks/use-users"
import { useManagers } from "../../hooks/use-managers"

export interface MenuItem {
    id: string
    title: string
    icon: React.ComponentType<{ className?: string }>
    path?: string
    children?: MenuItem[]
    badge?: number
}


export const useMenuItems = () => {
    const { data: songs } = useSongs()
    const { data: albums } = useAlbums()
    const { data: artists } = useArtists()
    const { data: genres } = useGenres()
    const { data: tags } = useTags()
    const { data: playlists } = usePlaylists()
    const { data: users } = useUsers()
    const { managers } = useManagers()

    const menuItems: MenuItem[] = [
        {
            id: "dashboard",
            title: "لوحة التحكم",
            icon: Home,
            path: "/",
        },
        {
            id: "music",
            title: "إدارة الموسيقى",
            icon: Music,
            children: [
                {
                    id: "songs",
                    title: "الأغاني",
                    icon: PlayCircle,
                    path: "/songs",
                    badge: songs?.length,
                },
                {
                    id: "albums",
                    title: "الألبومات",
                    icon: Album,
                    path: "/albums",
                    badge: albums?.length,
                },
                {
                    id: "artists",
                    title: "الفنانين",
                    icon: Mic,
                    path: "/artists",
                    badge: artists?.length
                },
                {
                    id: "genres",
                    title: "الأنواع الموسيقية",
                    icon: Radio,
                    path: "/genres",
                    badge: genres.length,
                },
                {
                    id: "tags",
                    title: "الكلمات المفتاحية",
                    icon: TagsIcon,
                    path: "/tags",
                    badge: tags?.length,
                },
            ],
        },
        {
            id: "playlists",
            title: "قوائم التشغيل",
            icon: Headphones,
            path: "/playlists",
            badge: playlists?.length
        },
        {
            id: "management",
            title: "إدارة النظام",
            icon: Shield,
            children: [
                {
                    id: "users",
                    title: "المستخدمين",
                    icon: Users,
                    path: "/users",
                    badge: users?.length,
                },
                {
                    id: "managers",
                    title: "المديرين",
                    icon: Shield,
                    path: "/managers",
                    badge: managers.length,
                },
            ],
        },
        {
            id: "reports",
            title: "التقارير",
            icon: FileText,
            path: "/reports",
        },
        {
            id: "legal",
            title: "القانونية",
            icon: ShieldAlertIcon,
            children: [
                {
                    id: "privacy",
                    title: "سياسة الخصوصية",
                    icon: ShieldAlertIcon,
                    path: "/privacy-policy",
                },
                {
                    id: "terms",
                    title: "الشروط والأحكام",
                    icon: ShieldAlertIcon,
                    path: "/terms-conditions",
                },
            ],
        },
        {
            id: "settings",
            title: "الإعدادات",
            icon: Settings,
            path: "/settings",
        },
    ];

    return menuItems;
};
