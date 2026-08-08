import * as runtime from "react/jsx-runtime";

const sharedComponents = {};

function useMdxComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MdxContent({ code }: { code: string }) {
  const Component = useMdxComponent(code);
  // eslint-disable-next-line react-hooks/static-components -- component is compiled from MDX source, not defined inline per render
  return <Component components={sharedComponents} />;
}
