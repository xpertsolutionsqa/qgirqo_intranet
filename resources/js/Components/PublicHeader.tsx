declare var route: any;


import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import LoginModal from './LoginModal';
import EmployeeProfileModal from './EmployeeProfileModal';
import WishModal from './WishModal';
import Modal from './Modal';
import GlobalSearch from './GlobalSearch';
import { User } from '@/interfaces/EmployeeProfile';

export default function PublicHeader() {
    const { auth } = usePage().props;

    const [currentTime, setCurrentTime] = useState(new Date());
    const [showLogin, setShowLogin] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [selectedNotif, setSelectedNotif] = useState<any>(null);
    const [showWishModal, setShowWishModal] = useState(false);
    const [wishUser, setWishUser] = useState<any>(null);
    const [wishType, setWishType] = useState<'birthday' | 'anniversary' | 'eom'>('birthday');
    const [wishTitle, setWishTitle] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const isAdmin = auth.role && ['super-admin', 'admin', 'hr'].includes(auth.role);

    const [weatherData, setWeatherData] = useState<any>(null);
    const [weatherLoading, setWeatherLoading] = useState(true);

    const weatherIcons: Record<number, { icon: string; label: string; color: string }> = {
        0: { icon: 'fa-sun', label: 'Clear Sky', color: 'text-yellow-400' },
        1: { icon: 'fa-cloud-sun', label: 'Mainly Clear', color: 'text-yellow-300' },
        2: { icon: 'fa-cloud-sun', label: 'Partly Cloudy', color: 'text-gray-300' },
        3: { icon: 'fa-cloud', label: 'Overcast', color: 'text-gray-400' },
        45: { icon: 'fa-smog', label: 'Foggy', color: 'text-gray-300' },
        48: { icon: 'fa-smog', label: 'Foggy', color: 'text-gray-300' },
        51: { icon: 'fa-cloud-rain', label: 'Light Drizzle', color: 'text-blue-300' },
        61: { icon: 'fa-cloud-showers-heavy', label: 'Rainy', color: 'text-blue-400' },
        80: { icon: 'fa-cloud-showers-heavy', label: 'Showers', color: 'text-blue-500' },
        95: { icon: 'fa-cloud-bolt', label: 'Thunderstorm', color: 'text-purple-500' },
    };

    const getWeatherIcon = (code: number) => weatherIcons[code] || { icon: 'fa-cloud-sun', label: 'Cloudy', color: 'text-[#f4b000]' };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const url = 'https://api.open-meteo.com/v1/forecast?latitude=25.2854&longitude=51.5310&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto';
                const response = await fetch(url);
                const data = await response.json();
                setWeatherData(data);
                setWeatherLoading(false);
            } catch (error) {
                console.error('Weather fetch error:', error);
                setWeatherLoading(false);
            }
        };

        fetchWeather();
        const fetchNotifications = async () => {
            try {
                const response = await fetch('/api/notifications/today');
                const data = await response.json();
                setNotifications(data.notifications);

                // Check localStorage for last read date
                const lastReadDate = localStorage.getItem('last_notifications_read_at');
                const todayStr = new Date().toISOString().split('T')[0];

                let count = data.personal_count;
                if (lastReadDate !== todayStr) {
                    count += data.general_count;
                }
                setUnreadCount(count);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);


    const markAsRead = async () => {
        const todayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem('last_notifications_read_at', todayStr);
        setUnreadCount(0);

        try {
            await fetch('/api/notifications/mark-read', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                }
            });
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    const handleNotificationClick = (notif: any) => {
        if (notif.type === 'birthday' || notif.type === 'anniversary') {
            setWishUser(notif.meta.target_user);
            setWishType(notif.type);
            setShowWishModal(true);
        } else {
            setSelectedNotif(notif);
            setShowDetailModal(true);
        }
    };


    const handleSearchAction = (type: string, data: any) => {
        if (!auth.user) {
            setShowSearch(false);
            setShowLogin(true);
            return;
        }

        if (type === 'wish') {
            setWishUser(data.user);
            setWishType('birthday');
            setWishTitle('');
            setShowWishModal(true);
        } else if (type === 'congratulate') {
            setWishUser(data.user);
            setWishType('eom');
            setWishTitle(data.title);
            setShowWishModal(true);
        }
        setShowSearch(false);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <header className="bg-primary shadow-qa relative z-999 text-white">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-[84px] items-center justify-between">
                    {/* Left: Brand + Greeting */}
                    <div className="flex items-center gap-6">
                        <div className="flex shrink-0 items-center justify-center">
                            <Link href="/">
                                {/* <ApplicationLogo className="h-[50px] w-[50px]" /> */}
                                <img
                                    src="assets/img/qgirco-logo-white.svg"
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center gap-[30px]">
                            <div className="relative text-[28px] font-bold after:absolute after:top-1/2 after:right-[-15px] after:inline-block after:h-8 after:w-px after:translate-y-[-50%] after:bg-white after:content-['']">
                                Hello{' '}
                                <span className="font-bold">
                                    {auth.user != null
                                        ? auth.user.name
                                        : 'Guest'}
                                </span>
                            </div>
                            <div className="hidden text-[90%] opacity-90 md:block">
                                {formatDate(currentTime)}
                            </div>
                        </div>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-2">
                        {/* WEATHER DROPDOWN (ICON + PANEL) */}
                        <div className="weather_dropdown">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10 outline-none">
                                        <img
                                            src="/assets/img/weather.svg"
                                            alt="Weather icon"
                                            className="max-h-7 max-w-7"
                                        />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="w-[520px]" contentClasses="p-0 bg-transparent shadow-none border-0">
                                    <div className="weather_card">
                                        {weatherLoading ? (
                                            <div className="py-12 text-center text-gray-500 font-bold">
                                                <i className="fa-solid fa-spinner fa-spin me-2"></i>
                                                Loading Doha Weather...
                                            </div>
                                        ) : weatherData ? (
                                            <>
                                                {/* Top: title + status */}
                                                <div className="weather_top">
                                                    <div className="weather_title">
                                                        <span>Today in</span> <strong>Doha</strong>
                                                    </div>
                                                    <div className="weather_status text-primary">
                                                        {getWeatherIcon(weatherData.current.weather_code).label}
                                                    </div>
                                                </div>

                                                {/* Middle: icon + temps + stats */}
                                                <div className="weather_mid">
                                                    <div className="weather_icon">
                                                        <i className={`weather_main_icon fa-solid ${getWeatherIcon(weatherData.current.weather_code).icon} ${getWeatherIcon(weatherData.current.weather_code).color} text-[60px]`}></i>
                                                    </div>
                                                    <div className="weather_temp">
                                                        <div className="weather_temp_value text-primary font-extrabold text-[54px] leading-none">
                                                            <span>{Math.round(weatherData.current.temperature_2m)}</span><span className="deg text-[34px] align-top">°</span> <span className="unit text-[22px] font-bold">C</span>
                                                        </div>
                                                        <div className="weather_feels text-gray-900 mt-1.5 text-base font-medium">
                                                            Feels like <span>{Math.round(weatherData.current.apparent_temperature)}</span>°C
                                                        </div>
                                                    </div>
                                                    <div className="weather_stats border-l border-gray-200 pl-4 text-sm leading-relaxed text-gray-600">
                                                        <div className="stat flex justify-between gap-2">
                                                            <span className="k text-gray-400">Precipitation:</span>
                                                            <span className="v font-semibold text-gray-700">{weatherData.current.precipitation}mm</span>
                                                        </div>
                                                        <div className="stat flex justify-between gap-2">
                                                            <span className="k text-gray-400">Humidity:</span>
                                                            <span className="v font-semibold text-gray-700">{weatherData.current.relative_humidity_2m}%</span>
                                                        </div>
                                                        <div className="stat flex justify-between gap-2">
                                                            <span className="k text-gray-400">Wind:</span>
                                                            <span className="v font-semibold text-gray-700">{weatherData.current.wind_speed_10m} km/h</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Bottom: 7-day forecast */}
                                                <div className="weather_days grid grid-cols-7 gap-2.5 pt-3">
                                                    {weatherData.daily.time.map((date: string, i: number) => (
                                                        <div key={i} className={`w_day text-center border-gray-100 ${i === 6 ? '' : 'border-r pr-2'}`}>
                                                            <div className="d text-sm text-gray-600 mb-1.5">
                                                                {i === 0 ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                                                            </div>
                                                            <div className="icon mb-1">
                                                                <i className={`weather_day_icon fa-solid ${getWeatherIcon(weatherData.daily.weather_code[i]).icon} ${getWeatherIcon(weatherData.daily.weather_code[i]).color} text-xl`}></i>
                                                            </div>
                                                            <div className="t flex justify-center gap-2 text-[13px]">
                                                                <span className="hi font-semibold text-gray-900">{Math.round(weatherData.daily.temperature_2m_max[i])}°</span>
                                                                <span className="lo font-medium text-gray-400">{Math.round(weatherData.daily.temperature_2m_min[i])}°</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="py-12 text-center text-red-500">
                                                Failed to load weather data.
                                            </div>
                                        )}
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <button
                            onClick={() => setShowSearch(true)}
                            className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10"
                        >
                            <img
                                src="/assets/img/search.svg"
                                alt="Search"
                                className="max-h-7 max-w-7"
                            />
                        </button>

                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        onClick={markAsRead}
                                        className="rounded-qa relative flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10"
                                    >
                                        <img
                                            src="/assets/img/notification.svg"
                                            alt="Notifications"
                                            className="max-h-7 max-w-7"
                                        />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right" width="48" contentClasses="py-0 bg-white dark:bg-gray-800 overflow-hidden min-w-[320px]">
                                    <div className="border-b border-gray-100 p-3 dark:border-gray-700">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                    </div>
                                    <div className="max-h-[400px] overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map((notif) => (
                                                <button
                                                    key={notif.id}
                                                    onClick={() => handleNotificationClick(notif)}
                                                    className={`w-full flex items-start gap-3 border-b border-gray-50 p-3 last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50 transition-colors ${notif.type === 'wish' && !notif.is_read ? 'bg-primary/5' : ''}`}
                                                >
                                                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 overflow-hidden">
                                                        {notif.image ? (
                                                            <img src={notif.image} alt="" className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className={`flex h-full w-full items-center justify-center text-[10px] font-bold text-white ${notif.type === 'birthday' ? 'bg-pink-500' :
                                                                notif.type === 'anniversary' ? 'bg-orange-500' : 'bg-blue-500'
                                                                }`}>
                                                                {notif.type === 'birthday' ? 'BD' :
                                                                    notif.type === 'anniversary' ? 'WA' : 'EV'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 text-start">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className="text-xs font-bold text-primary">{notif.title}</p>
                                                            {notif.type === 'wish' && !notif.is_read && (
                                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" title="New message"></span>
                                                            )}
                                                        </div>
                                                        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{notif.message}</p>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center">
                                                <p className="text-sm text-gray-500">No notifications today</p>
                                            </div>
                                        )}
                                    </div>
                                    {notifications.length > 0 && (
                                        <div className="bg-gray-50 p-2 text-center dark:bg-gray-700/50">
                                            <Link href={route('celebrations.index')} className="text-[11px] font-medium text-primary hover:underline">
                                                View all celebrations
                                            </Link>
                                        </div>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>


                        {/* <button className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10">
                            <img
                                src="/assets/img/lang-switch.svg"
                                alt="Language Switch"
                                className="max-h-7 max-w-7"
                            />
                        </button> */}

                        {auth.user ? (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10">
                                        <img
                                            src="/assets/img/my-profile.svg"
                                            alt="Profile"
                                            className="max-h-7 max-w-7"
                                        />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {isAdmin ? (
                                        <Dropdown.Link href={route('dashboard')}>
                                            Dashboard
                                        </Dropdown.Link>
                                    ) : (
                                        <button
                                            type="button"
                                            className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setShowProfileModal(true);
                                            }}
                                        >
                                            View Profile
                                        </button>
                                    )}
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <button
                                onClick={() => setShowLogin(true)}
                                className="rounded-qa flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10"
                            >
                                <img
                                    src="/assets/img/my-profile.svg"
                                    alt="Profile"
                                    className="max-h-7 max-w-7"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
            <EmployeeProfileModal
                show={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                user={auth.user}
            />

            <GlobalSearch
                show={showSearch}
                onClose={() => setShowSearch(false)}
                onAction={handleSearchAction}
            />

            <WishModal
                show={showWishModal}
                onClose={() => setShowWishModal(false)}
                user={wishUser}
                type={wishType}
                customTitle={wishTitle}
            />

            <Modal show={showDetailModal} onClose={() => setShowDetailModal(false)} maxWidth="md">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                {selectedNotif?.title}
                            </h2>
                            {selectedNotif?.meta?.wish_type && (
                                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 w-max px-2 py-0.5 rounded">
                                    {selectedNotif.meta.wish_type === 'birthday' ? 'Birthday Wish' :
                                        selectedNotif.meta.wish_type === 'anniversary' ? 'Anniversary Wish' :
                                            'Achievement Congratulations'}
                                </span>
                            )}
                        </div>
                        <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 dark:bg-gray-700/50 dark:border-gray-600">
                        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                            {selectedNotif?.message}
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => setShowDetailModal(false)}
                            className="bg-primary hover:bg-black text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </header>
    );
}
