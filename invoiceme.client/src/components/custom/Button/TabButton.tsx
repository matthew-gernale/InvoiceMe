
export interface TabButtonProps {
    tab: string,
    currTab: string,
    onClick: () => void
}

function TabButton(props: TabButtonProps) {
  return (
      <>
          <button
              onClick={() => props.onClick()}
              className={`inline-flex items-center xl:justify-start justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md group hover:text-gray-900 dark:hover:text-white ${props.currTab === props.tab
                  ? "text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400"
                  }`}
          >
              {props.tab}
          </button>
      </>
  );
}

export default TabButton;