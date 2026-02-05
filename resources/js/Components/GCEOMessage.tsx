export default function GCEOMessage({ message }: { message?: any }) {
    if (!message) return null;

    const handlePlay = () => {
        if (message.video_url) {
            window.open(message.video_url, '_blank');
        }
    };

    return (
        <div
            className="qa-card gceo_mesg rounded-qa shadow-qa border-qa-border h-full overflow-hidden border"
            onClick={handlePlay}
        >
            <div className="qa-media group relative h-full cursor-pointer bg-slate-900">
                <img
                    src={
                        message.cover_image || '/assets/img/Rectangle-1383.jpg'
                    }
                    alt={message.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />

                {/* Play Button */}
                {message.video_url && (
                    <div className="qa-play absolute inset-0 flex items-center justify-center">
                        <div className="qa-play-btn flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white opacity-50 shadow-lg transition-all duration-400 group-hover:scale-112 group-hover:opacity-100">
                            <i className="fa-solid fa-play text-[20px] text-black"></i>
                        </div>
                    </div>
                )}

                {/* Caption */}
                <div className="qa-media-caption absolute inset-x-0 bottom-5 z-10 px-4 text-center">
                    <div className="caption-text text-[16px] font-medium text-white drop-shadow-md">
                        {message.title}
                    </div>
                </div>
            </div>
        </div>
    );
}
