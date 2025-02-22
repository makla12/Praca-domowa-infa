import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Import danych",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ThemeModeScript />
			</head>

			<body className="dark"> {children} </body>
		</html>
	);
}
