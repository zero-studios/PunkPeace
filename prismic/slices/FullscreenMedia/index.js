/**
 * @typedef {import("@prismicio/client").Content.FullscreenMediaSlice} FullscreenMediaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FullscreenMediaSlice>} FullscreenMediaProps
 * @param {FullscreenMediaProps}
 */
const FullscreenMedia = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for fullscreen_media (variation: {slice.variation})
      Slices
    </section>
  );
};

export default FullscreenMedia;
