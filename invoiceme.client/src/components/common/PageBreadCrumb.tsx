import { Link } from "react-router";

import Button from '../ui/button/Button'

interface BreadcrumbProps {
    pageTitle: string;
    titleClassName?: string;
    currentPage?: string;
    previousPage?: string;
    previousPageIcon?: React.ReactNode;
    previousPageLink?: string;
    buttonName?: string;
    onBtnclick?: () => void;
    btnClass?: string;
}

const PageBreadcrumb = (props: BreadcrumbProps) => {
    return (
        <>
            <div className='flex flex-col sm:flex-row pb-[20px] justify-between'>
                <div className="flex flex-col items-start justify-between mb-6">
                    <h2
                        className="text-xl font-semibold text-whiten-primary dark:text-white/90"
                        x-text="pageName"
                    >
                        {props.pageTitle}
                    </h2>
                    <nav>
                        <ol className="flex items-center gap-1.5">
                            <li>
                                <Link
                                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                    to={`${props.previousPageLink}`}
                                >
                                    {props.previousPage}
                                    <svg
                                        className="stroke-current"
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                                            stroke=""
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Link>
                            </li>
                            <li className="text-sm text-gray-800 dark:text-white/90">
                                {props.currentPage}
                            </li>
                        </ol>
                    </nav>
                </div>

                {props.buttonName &&
                    <Button children={props.buttonName} onClick={props.onBtnclick}
                        className={`h-full ${props.btnClass}`} />
                }
            </div>
        </>
    );
};

export default PageBreadcrumb;