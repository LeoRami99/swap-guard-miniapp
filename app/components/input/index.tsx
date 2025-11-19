type buttonNativeProps = React.ComponentProps<"input">;

const Input = ({ ...props }: buttonNativeProps) => {
  return <input {...props} />;
};
export { Input };
