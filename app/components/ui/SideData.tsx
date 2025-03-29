interface SideDataProps {
  children: React.ReactNode;
  dataName: string;
  dataPage: string;
}

export function SideData({ children, dataName, dataPage }: SideDataProps) {
  return (
    <div className="flex">
      <div className="border-2">{dataName}</div>
      {children}
      <div className="border-2">{dataPage}</div>
    </div>
  );
}
