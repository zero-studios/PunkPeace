/**
 * @typedef {import("@prismicio/client").Content.ModuleGroupSlice} ModuleGroupSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ModuleGroupSlice>} ModuleGroupProps
 * @param {ModuleGroupProps}
 */
const ModuleGroup = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for module_group (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ModuleGroup;
