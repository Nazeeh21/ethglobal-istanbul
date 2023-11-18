// Meta Data
// ========================================================
export const metadata = {
    title: "ApeFit",
    description: "Get fit, get ape, get paid.",
    icons: {
        icon: "/favicon.ico"
    }
};

// Main Layout
// ========================================================
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
