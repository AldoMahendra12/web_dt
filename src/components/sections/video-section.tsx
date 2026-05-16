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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-[-2px] text-text-heading mx-auto max-w-[900px]">
            Simak video kajian terbaru di kanal{" "}
            <span className="text-primary italic font-medium">YouTube</span> kami
          </h2>
        </div>

        {/* Video */}
        <div className="max-w-[700px] mx-auto">
          <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-video bg-black">
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
