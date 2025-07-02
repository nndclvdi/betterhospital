import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "../globals.css";
import LayoutQuery from "@/shared/components/layout-query";

const lexend = Lexend_Deca({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Better Hospital",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${lexend.className} antialiased`}>
				<LayoutQuery>{children}</LayoutQuery>
			</body>
		</html>
	);
}
