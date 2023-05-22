/**
 * @typedef {import("@prismicio/client").Content.CollectionSlice} CollectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CollectionSlice>} CollectionProps
 * @param {CollectionProps}
 */
const Collection = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for collection (variation: {slice.variation}) Slices
    </section>
  );
};

export default Collection;
