import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AI Use Case Discovery Tool",
	description:
		"Discover the highest-value AI opportunities for your business — scored by impact and effort, with a 90-day starter plan.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={geist.className}>{children}</body>
		</html>
	);
}
