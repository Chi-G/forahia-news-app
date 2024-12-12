import '../css/app.css';
import './bootstrap';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);

        // Toastr configuration
        toastr.options = {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: '5000',
        };

        // Display Toastr notifications based on session messages
        const flash = props.initialPage.props.flash || {};
        if (flash.success) {
            toastr.success(flash.success);
        }
        if (flash.error) {
            toastr.error(flash.error);
        }
    },
    progress: {
        color: '#4B5563',
    },
});
