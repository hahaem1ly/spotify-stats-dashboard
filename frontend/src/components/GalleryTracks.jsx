import PropTypes from "prop-types";
import "./topTracksGallery.css";

function TopTracksGallery({ tracks }) {
    return (
        <div className="masonry">
            {tracks.map((track, index) => (
                <div className="masonry-item" key={`${track.id}-${index}`}>
                    <img
                        className="gallery-image"
                        src={track.album.images[0]?.url}
                        alt={`Track ${index}`}
                    />
                </div>
            ))}
        </div>
    );
}

TopTracksGallery.propTypes = {
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            album: PropTypes.shape({
                images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string.isRequired })),
            }),
        })
    ).isRequired,
};

export default TopTracksGallery;
