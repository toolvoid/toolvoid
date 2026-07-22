import VideoClient from './VideoClient'
import { createToolMetadata } from '../../lib/toolMetadata'

export const metadata = {
  title: "Free Online Video Converter — ToolVoid",
  description: "Convert video files between MP4, WebM, AVI, MOV, and more formats online for free. Compress, resize, and extract audio from videos in your browser. No uploads.",
  keywords: ["free online video converter", "video converter", "convert video to MP4", "video format converter", "online video tool"],
  openGraph: {
    title: "Free Online Video Converter | ToolVoid",
    description: "Convert video files between MP4, WebM, AVI, MOV formats online for free. No uploads needed.",
    url: "https://toolvoid.com/video",
  },
  ...createToolMetadata('video'),
}

export default function Page() {
  return (
    <>
      <div style={{maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem'}}>Free Online Video Converter</h1>
        <p style={{color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem'}}>
          Convert video files between popular formats online for free with our powerful video converter. Whether you need to convert a video from MOV to MP4 for universal playback, compress a large video file for email or messaging, resize a video for social media stories and reels, or extract the audio track as MP3, our tool handles it all directly in your browser with no uploads to any server. Simply select your video file, choose the output format from MP4, WebM, AVI, or MOV, adjust quality and resolution settings, and start the conversion. The tool uses advanced client-side processing to handle video files efficiently while preserving quality. You can trim videos by setting start and end times, resize to specific dimensions or aspect ratios optimized for YouTube, Instagram, TikTok, and Twitter, and adjust the output quality to balance file size versus visual fidelity. Perfect for content creators, marketers, educators, and anyone who works with video. Completely free, unlimited usage, and 100% private — your videos never leave your device.
        </p>
      </div>
      <VideoClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this video converter free to use?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with no limits on file size or number of conversions. No sign-up required." }
          },
          {
            "@type": "Question",
            "name": "What video formats are supported?",
            "acceptedAnswer": { "@type": "Answer", "text": "Our converter supports MP4, WebM, AVI, and MOV formats with adjustable quality and resolution settings." }
          },
          {
            "@type": "Question",
            "name": "Are my video files uploaded to a server?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Everything runs entirely in your browser. Your video files never leave your device, ensuring complete privacy." }
          }
        ]
      })}} />
    </>
  )
}
