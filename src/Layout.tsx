import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export function Layout() {
	const options: {label: string; link: string} [] = [
        // { label: 'Inicio', link: '/' },
        // { label: 'Servicios', link: '/servicios' },
        // { label: 'Acerca de', link: '/acerca-de' },
    ];

	return (
		<div>
			<Navbar options={options} />

			<main>
				<Outlet />
			</main>
		</div>
	);
}
