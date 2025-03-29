interface SideDataProps {
  children: React.ReactNode;
  dataName: string;
  dataPage: string;
}

export function SideData({ children, dataName, dataPage }: SideDataProps) {
  return (
    <div className="flex font-worksans font-semibold">
      <div className="border-[0.5px] border-l-0 content-center px-8">
        <p className="-rotate-90 ">{dataName}</p>
      </div>
      <div className="border-y-[0.5px] flex-grow">{children}</div>

      <div className="border-[0.5px] border-r-0 content-center px-8">
        <p className="rotate-90 ">{dataPage}</p>
      </div>
    </div>
  );
}
