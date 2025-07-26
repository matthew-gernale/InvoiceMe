export interface IconButtonProps {
    className: string;
    icon: React.ReactNode;
    disabled?: boolean;
    tooltip: string;
    onClick: () => void;
}

function IconButton(props: IconButtonProps) {
  return (
    <>
          <div className={`relative inline-block group ${props.className} ${(props.disabled ? 'cursor-not-allowed' : 'cursor-pointer')}`}
              onClick={props.onClick}>
              {props.icon}
              {
                  !props.disabled &&
                  <div className="invisible absolute left-1/2 top-full mt-2.5 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100 z-[2]">
                      <div className="relative">
                          <div className="whitespace-nowrap rounded-lg bg-slate-300 px-3 py-2 text-xs font-medium text-slate-700 drop-shadow-4xl dark:bg-white dark:text-slate-700">
                              {props.tooltip}
                          </div>
                          <div className="absolute -top-1 left-1/2 h-3 w-4 -translate-x-1/2 rotate-45 bg-slate-300 dark:bg-white"></div>
                      </div>
                  </div>
              }
          </div>
    </>
  );
}

export default IconButton;