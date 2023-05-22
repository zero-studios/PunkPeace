/**
 * @typedef {import("@prismicio/client").Content.OneColumnRichtextSlice} OneColumnRichtextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<OneColumnRichtextSlice>} OneColumnRichtextProps
 * @param {OneColumnRichtextProps}
 */
const OneColumnRichtext = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for one_column_richtext (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default OneColumnRichtext;
