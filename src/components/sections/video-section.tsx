/* =========================================
   VideoSection — Section Component
   Matches homepage .video-section
   YouTube embed with rounded wrapper
   ========================================= */

export default function VideoSection() {
  return (
    <section className="py-[60px] sm:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-[50px]">
          <p className="text-lg text-text-light font-medium">
            Simak Video Dakwah &amp; Podcast Terbaru Dakwah Tulungagung Official
          </p>
        </div>

        {/* Video */}
        <div className="max-w-[800px] mx-auto">
          <div className="relative pb-[56.25%] h-0 rounded-2xl sm:rounded-2xl overflow-hidden shadow-video bg-black">
            <iframe
              src="https://www.youtube.com/embed/m0ePqo5EbCQ"
              title="Video Dakwah Tulungagung"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
