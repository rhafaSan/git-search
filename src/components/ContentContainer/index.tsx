export const ContentContainer = ({
  children,
  orientation,
  className,
}: {
  children: React.ReactNode;
  orientation: "row" | "col";
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-${orientation} bg-white shadow-xl rounded-xl items-start p-10 max-w-96 w-96 max-h-56 overflow-y-auto h-64 scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200  mx-auto gap-2 ${className} `}
    >
      {children}
    </div>
  );
};
