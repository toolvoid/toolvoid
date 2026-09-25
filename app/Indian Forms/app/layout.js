import "./globals.css";

export const metadata = {
  title: "Indian Form Photo Compressor | Resize Photos for NEET, SSC, PAN & More",
  description: "Free online Indian form photo compressor for NEET, JEE, SSC, UPSC, banking, PAN, passport and job applications. Resize, compress and download JPEG files privately in your browser.",
  keywords: ["Indian form photo compressor", "NEET photo resize", "SSC photo size", "PAN card photo resize", "passport photo compressor", "signature resize"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Indian Form Photo Compressor",
    description: "Create upload-ready photos and signatures for Indian forms in your browser.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
