import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Forahia News App" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                // src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img src="logo.png" alt="App Logo" className="h-12 w-auto" />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Home
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-1 lg:gap-8">
                                <a
                                    href="#"
                                    id="docs-card"
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-black p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >

                                    <div className="relative flex items-center gap-6 lg:items-end">
                                        <div
                                            id="docs-card-content"
                                            className="flex items-start gap-6 lg:flex-col"
                                        >

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                                    Forahia News
                                                </h2>

                                                <p className="mt-4 text-sm/relaxed">
                                                    Welcome to Forahia News, a showcase of cutting-edge FullStack development.
                                                    This website brings you a curated selection of articles from diverse sources,
                                                    ensuring you stay informed with the latest news in a clean and easy-to-read format. Key features include:
                                                </p>
                                                <ul style={{ listStyleType: 'disc', margin: '20px 0', paddingLeft: '20px' }}>
                                                    <li style={{ margin: '10px 0' }}>
                                                        <span style={{ fontWeight: 'bold' }}>User Authentication and Registration:</span> Securely sign in and create your personalized news experience.
                                                    </li>
                                                    <li style={{ margin: '10px 0' }}>
                                                        <span style={{ fontWeight: 'bold' }}>Article Search and Filtering:</span> Easily find articles on topics that matter to you.
                                                    </li>
                                                    <li style={{ margin: '10px 0' }}>
                                                        <span style={{ fontWeight: 'bold' }}>Personalized News Feed:</span> Tailored news updates based on your interests and preferences.
                                                    </li>
                                                    <li style={{ margin: '10px 0' }}>
                                                        <span style={{ fontWeight: 'bold' }}>Mobile-Responsive Design:</span> Enjoy a seamless reading experience on any device.
                                                    </li>
                                                </ul>
                                                <p>
                                                    Explore the full potential of our platform.
                                                    Thank you for choosing our Forahia News, where innovation meets usability.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Forahia News (Version 1.0.0)
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
