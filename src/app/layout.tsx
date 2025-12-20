import "./globals.css"
import QueryProvider from "@/providers/query-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
