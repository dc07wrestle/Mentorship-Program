import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  Search, 
  Flame, 
  HelpCircle, 
  Video, 
  Info,
  X
} from 'lucide-react';
import { 
  VIDEO_CATALOG, 
  VIDEO_CATEGORIES, 
  VIDEO_INSTRUCTIONAL_MEMBERSHIP_CONFIG, 
  VideoCategory, 
  VideoItem,
  isVideoPromotionActive
} from '../data/videoCatalog';

export default function InstructionalVideos() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewVideo, setPreviewVideo] = useState<VideoItem | null>(null);
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewVideo(null);
        setPlayingVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isModalPortrait = previewVideo
    ? previewVideo.aspectRatio === 'portrait' ||
      previewVideo.thumbnail.includes('shuck-by') ||
      previewVideo.promotion?.youtubeUrl?.includes('/shorts/')
    : false;

  const isPlayingPortrait = playingVideo
    ? playingVideo.aspectRatio === 'portrait' ||
      playingVideo.promotion?.youtubeUrl?.includes('/shorts/') ||
      playingVideo.thumbnail.includes('shuck-by')
    : false;

  const filteredVideos = VIDEO_CATALOG.filter((video) => {
    const matchesCategory =
      selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-blue text-white py-20 lg:py-28">
        {/* Subtle patterned backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-red/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-red bg-white font-bold text-xs uppercase tracking-wider mb-6 shadow-sm"
            >
              <Flame className="w-4 h-4 text-brand-red" />
              <span>Mat Mentors Instructional Videos</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight mb-6"
            >
              Learn From Division I Wrestlers.{' '}
              <span className="text-red-400">Master Your Technique.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Get access to detailed wrestling instructional videos covering takedowns, setups, finishes, defense, and more. Learn at your own pace with 3–5 new instructional videos added every month.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-blue-200"
            >
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Ivy League Division I Instructors</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>3–5 New Videos Monthly</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Instant Unlisted YouTube Access</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Options Section */}
      <section id="pricing-options" className="py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Option 1: Unlimited Membership */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-brand-red relative flex flex-col justify-between"
              >
                <div className="absolute -top-4 left-8 bg-brand-red text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Option 1 • Best Value</span>
                </div>

                <div>
                  <div className="mb-6 pt-2">
                    <h3 className="text-2xl font-bold text-brand-blue font-heading mb-1">
                      Unlimited Membership
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Unlimited access to our entire instructional video library.
                    </p>
                  </div>

                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-brand-blue tracking-tight">
                      {VIDEO_INSTRUCTIONAL_MEMBERSHIP_CONFIG.price}
                    </span>
                    <span className="text-gray-500 font-semibold">/ month</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {VIDEO_INSTRUCTIONAL_MEMBERSHIP_CONFIG.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <a
                    href={VIDEO_INSTRUCTIONAL_MEMBERSHIP_CONFIG.stripePaymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-base"
                  >
                    <span>Subscribe Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-xs text-center text-gray-400 mt-2.5">
                    Recurring monthly billing through Stripe. Cancel anytime.
                  </p>
                </div>
              </motion.div>

              {/* Option 2: Individual Videos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6">
                    <div className="inline-block text-brand-blue bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full mb-2">
                      Option 2 • Individual Videos
                    </div>
                    <h3 className="text-2xl font-bold text-brand-blue font-heading mb-1">
                      Individual Videos
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Target specific positions or moves without a monthly subscription.
                    </p>
                  </div>

                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-brand-blue tracking-tight">
                      $3.99
                    </span>
                    <span className="text-gray-500 font-semibold">each</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-snug">
                        One-time payment for one instructional video
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-snug">
                        Unlimited replays of that purchased video
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-snug">
                        No subscription required
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-snug">
                        Instant unlisted YouTube access after checkout
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href="#video-library"
                    className="w-full py-4 bg-brand-blue hover:bg-blue-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-base"
                  >
                    <span>Browse Available Videos</span>
                    <Video className="w-4 h-4" />
                  </a>
                  <p className="text-xs text-center text-gray-400 mt-2.5">
                    Click "Buy Video — $3.99" on any video card below
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Library Section */}
      <section id="video-library" className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-wider mb-2">
                  <Video className="w-4 h-4" />
                  <span>Instructional Videos</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-heading">
                  Available Videos
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-1">
                  Master techniques taught by University of Pennsylvania Division I wrestlers.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search techniques or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent shadow-sm"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
              {VIDEO_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-blue text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Video Cards Grid */}
            {filteredVideos.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {selectedCategory !== 'All' ? `More ${selectedCategory} videos coming soon!` : 'No videos found'}
                </h3>
                <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                  {selectedCategory !== 'All'
                    ? `We are currently releasing 3–5 new instructional videos every month. Check back soon or view our available videos in Takedowns.`
                    : `No instructional videos matched "${searchQuery}".`}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-bold shadow hover:bg-blue-900 transition-colors cursor-pointer"
                >
                  View All Videos
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredVideos.map((video) => {
                  const isPromo = isVideoPromotionActive(video);
                  const isPortrait =
                    video.aspectRatio === 'portrait' ||
                    video.thumbnail.includes('shuck-by') ||
                    video.promotion?.youtubeUrl?.includes('/shorts/');

                  return (
                    <motion.div
                      key={video.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border flex flex-col justify-between group ${
                        isPortrait ? 'max-w-md w-full' : ''
                      } ${
                        isPromo ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-gray-200'
                      }`}
                    >
                      {/* Thumbnail & Badges */}
                      <div>
                        <div
                          onClick={() => {
                            if (isPromo) {
                              setPlayingVideo(video);
                            } else {
                              setPreviewVideo(video);
                            }
                          }}
                          className={`relative ${
                            isPortrait ? 'aspect-[9/16]' : 'aspect-video'
                          } overflow-hidden bg-gray-950 cursor-pointer group/thumb`}
                          role="button"
                          tabIndex={0}
                          aria-label={isPromo ? `Watch ${video.title} free now` : `Preview ${video.title}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              if (isPromo) setPlayingVideo(video);
                              else setPreviewVideo(video);
                            }
                          }}
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 group-hover/thumb:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/shuck-by.jpg';
                            }}
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                          {/* Hover Play Icon Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/thumb:bg-black/40 transition-all pointer-events-none">
                            <div
                              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover/thumb:scale-110 ${
                                isPromo
                                  ? 'bg-emerald-600/95 text-white shadow-emerald-950/50'
                                  : 'bg-white/90 text-brand-blue'
                              }`}
                            >
                              <Play className="w-6 h-6 fill-current ml-0.5" />
                            </div>
                          </div>

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                            <span className="bg-brand-blue/90 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                              {video.category}
                            </span>
                            {isPromo ? (
                              <span className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded shadow flex items-center gap-1 animate-pulse">
                                <Sparkles className="w-3 h-3 text-emerald-200" />
                                <span>{video.promotion?.badge || 'FREE THIS MONTH'}</span>
                              </span>
                            ) : (
                              video.badge && (
                                <span className="bg-brand-red text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                                  {video.badge}
                                </span>
                              )
                            )}
                          </div>

                          {/* Duration pill */}
                          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/75 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded z-10">
                            <Clock className="w-3.5 h-3.5 text-gray-300" />
                            <span>{video.duration}</span>
                          </div>

                          {/* Watch pill */}
                          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-semibold text-white drop-shadow z-10">
                            <Play className={`w-3 h-3 ${isPromo ? 'text-emerald-400 fill-emerald-400' : 'text-red-500 fill-red-500'}`} />
                            <span>{isPromo ? 'Watch Free On-Site' : 'HD Video'}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="text-xs text-brand-red font-bold mb-1">
                            {video.instructor}
                          </div>
                          <h3
                            onClick={() => {
                              if (isPromo) setPlayingVideo(video);
                              else setPreviewVideo(video);
                            }}
                            className="text-xl font-bold text-brand-blue font-heading mb-2 line-clamp-2 group-hover:text-red-700 transition-colors cursor-pointer"
                          >
                            {video.title}
                          </h3>
                          <p className="text-gray-600 text-xs md:text-sm line-clamp-3 mb-4 leading-relaxed">
                            {video.description}
                          </p>

                          {/* Technique Highlights */}
                          <div className="space-y-1.5 mb-2 border-t border-gray-100 pt-3">
                            {video.keyPoints.slice(0, 2).map((point, idx) => (
                              <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                                <span className="line-clamp-1">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-6 pt-0 border-t border-gray-100 mt-2">
                        <div className="flex items-center justify-between pt-4 mb-3">
                          <div>
                            {isPromo ? (
                              <div>
                                <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mb-1">
                                  <Sparkles className="w-3 h-3 text-emerald-600" />
                                  <span>{video.promotion?.promotionalPriceLabel || 'FREE FOR A LIMITED TIME'}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                  <span className="line-through text-gray-400 text-base font-bold decoration-red-500 decoration-2">
                                    {video.promotion?.originalPrice || video.price}
                                  </span>
                                  <span className="text-2xl font-black text-emerald-600 font-heading">
                                    FREE
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="text-[11px] text-gray-400 uppercase font-semibold">
                                  One-time price
                                </div>
                                <div className="text-2xl font-black text-brand-blue font-heading">
                                  {video.price}
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setPreviewVideo(video)}
                            className="text-xs font-semibold text-gray-600 hover:text-brand-blue underline cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>

                        {isPromo ? (
                          <button
                            type="button"
                            onClick={() => setPlayingVideo(video)}
                            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-sm group/btn cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-white text-white group-hover/btn:scale-110 transition-transform" />
                            <span>{video.promotion?.buttonLabel || 'WATCH FREE NOW'}</span>
                          </button>
                        ) : (
                          <a
                            href={video.stripePaymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow transition-all text-sm group/btn"
                          >
                            <span>Buy Video — {video.price}</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How Video Delivery Works (Clear, Transparent Explainer) */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-blue font-heading mb-3">
              How Video Access Works
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Simple, secure, and hassle-free. No complicated accounts or apps to download.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
              <div className="w-12 h-12 bg-brand-blue text-white rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Select Your Option</h4>
              <p className="text-xs md:text-sm text-gray-600">
                Choose the $12.99/mo Unlimited Membership or buy any specific technique individually for $3.99.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
              <div className="w-12 h-12 bg-brand-red text-white rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Secure Stripe Checkout</h4>
              <p className="text-xs md:text-sm text-gray-600">
                Check out via Stripe with Apple Pay, Google Pay, or credit card. Enter the email address where you want to receive your video.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Instant YouTube Access</h4>
              <p className="text-xs md:text-sm text-gray-600">
                You immediately receive the private unlisted YouTube link. Watch unlimited replays on phone, computer, or TV.
              </p>
            </div>
          </div>

          {/* Quick FAQ / Note */}
          <div className="mt-10 bg-blue-50/60 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
            <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-gray-700 leading-relaxed">
              <strong>Need help with your purchase or link?</strong> All video purchases are backed by Mat Mentors. If you ever misplace your link or need help, contact Davis and Deven at{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dc07wrestle@gmail.com&su=Instructional Videos Access Question"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red font-bold hover:underline"
              >
                dc07wrestle@gmail.com
              </a>{' '}
              and we'll resend it right away.
            </div>
          </div>
        </div>
      </section>

      {/* Video Details Modal */}
      {previewVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setPreviewVideo(null)}
        >
          <div 
            className={`bg-white rounded-3xl ${
              isModalPortrait ? 'max-w-md' : 'max-w-lg'
            } w-full overflow-hidden shadow-2xl border border-gray-100 max-h-[92vh] flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
                <div
                  className={`relative ${
                    isModalPortrait ? 'aspect-[9/16] max-h-[48vh] mx-auto' : 'aspect-video'
                  } w-full bg-gray-950 group/modal-thumb shrink-0 overflow-hidden`}
                >
                  <img
                    src={previewVideo.thumbnail}
                    alt={previewVideo.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/shuck-by.jpg';
                    }}
                  />

              {isVideoPromotionActive(previewVideo) && (
                <div 
                  onClick={() => {
                    const vid = previewVideo;
                    setPreviewVideo(null);
                    setPlayingVideo(vid);
                  }}
                  className="absolute inset-0 bg-black/30 hover:bg-black/45 transition-colors flex items-center justify-center cursor-pointer"
                  title="Click to play video"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-white ml-0.5" />
                  </div>
                </div>
              )}

              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-black transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                <div className="bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded">
                  {previewVideo.category} • {previewVideo.duration}
                </div>
                {isVideoPromotionActive(previewVideo) && (
                  <div className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded flex items-center gap-1 shadow">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FREE THIS MONTH</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="text-xs font-bold text-brand-red mb-1">
                {previewVideo.instructor} • {previewVideo.instructorRole}
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-3">
                {previewVideo.title}
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {previewVideo.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                  What you will learn:
                </h4>
                <div className="space-y-2">
                  {previewVideo.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                {isVideoPromotionActive(previewVideo) ? (
                  <button
                    type="button"
                    onClick={() => {
                      const vid = previewVideo;
                      setPreviewVideo(null);
                      setPlayingVideo(vid);
                    }}
                    className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{previewVideo.promotion?.buttonLabel || 'WATCH FREE NOW'}</span>
                  </button>
                ) : (
                  <a
                    href={previewVideo.stripePaymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <span>Buy Video — {previewVideo.price}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setPreviewVideo(null)}
                  className="px-4 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direct YouTube Video Access Modal (Embedded Player) */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setPlayingVideo(null)}
        >
          <div
            className={`bg-gray-950 text-white rounded-3xl ${
              isPlayingPortrait ? 'max-w-md sm:max-w-lg' : 'max-w-4xl'
            } w-full overflow-hidden shadow-2xl border border-gray-800 flex flex-col max-h-[92vh]`}
            onClick={(e) => e.stopPropagation()}
          >
                {/* Player Top Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/90">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1.5 shadow">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                      <span>{playingVideo.promotion?.badge || 'FREE THIS MONTH'}</span>
                    </span>
                    <h3 className="font-bold text-white text-sm md:text-base truncate max-w-sm md:max-w-lg">
                      {playingVideo.title} • {playingVideo.instructor}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPlayingVideo(null)}
                    className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
                    aria-label="Close video player"
                  >
                    ✕
                  </button>
                </div>

                {/* Embedded YouTube Player */}
                <div
                  className={`relative ${
                    isPlayingPortrait ? 'aspect-[9/16] max-h-[66vh] mx-auto' : 'aspect-video'
                  } bg-black w-full overflow-hidden`}
                >
                  <iframe
                    src={`${playingVideo.promotion?.embedUrl || 'https://www.youtube.com/embed/ArY1nlwN9Vc'}?autoplay=1&rel=0`}
                    title={`${playingVideo.title} - ${playingVideo.instructor}`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

            {/* Video Details & Promotion Notice */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-red-400 mb-1">
                    {playingVideo.instructor} • {playingVideo.instructorRole}
                  </div>
                  <h2 className="text-2xl font-bold text-white font-heading">
                    {playingVideo.title}
                  </h2>
                  <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                    {playingVideo.description}
                  </p>
                </div>
                <div className="shrink-0 bg-emerald-950/80 border border-emerald-700/60 rounded-2xl p-4 text-left md:text-right">
                  <div className="text-[11px] font-extrabold uppercase text-emerald-400 tracking-wider">Limited-Time Promotion</div>
                  <div className="text-xl font-black text-white">100% Free Access</div>
                  <div className="text-xs text-gray-400 mt-1">Free until Nov 14, 2026 at 11:59 PM ET</div>
                </div>
              </div>

              {/* Technique Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Technique Highlights & Key Coaching Points:
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {playingVideo.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300 bg-gray-900/60 border border-gray-800 rounded-xl p-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upsell to Unlimited Membership */}
              <div className="bg-gradient-to-r from-brand-blue to-gray-900 rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase text-red-400 tracking-wider">Want More Techniques?</div>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    Unlock the Entire Video Library with Unlimited Membership
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    3–5 new instructional breakdowns released monthly by Penn Division I wrestlers for $12.99/mo.
                  </p>
                </div>
                <a
                  href={VIDEO_INSTRUCTIONAL_MEMBERSHIP_CONFIG.stripePaymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-5 py-3 bg-brand-red hover:bg-red-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Join Unlimited ($12.99/mo)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
