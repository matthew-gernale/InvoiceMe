import { GetBranchOrderDTO } from "../../../@types/branchorder.type";
import dayjs from 'dayjs';

interface HeaderProps {
    branchOrder: GetBranchOrderDTO;
}

function BODetails({ branchOrder }: HeaderProps) {
    return (
        <>
            <div className="flex justify-between align-center mb-2">
                <p className="text-gray-500 text-sm">ORDER DATE</p>
                <p className="text-gray-700 font-semibold">{dayjs(branchOrder.DateCreated).format("MMMM D, YYYY")}</p>
            </div>

            <div className="flex-grow bg-gray-200 h-[1px] w-full my-5" />

            <p className="text-gray-500 text-sm mb-2">DELIVERY ADDRESS</p>
            <div className="flex flex-col gap-2 border border-gray-200 p-5 rounded-lg mb-5 text-sm">
                <p className="text-gray-700 font-semibold">{branchOrder.Deliveryaddress}</p>
            </div>

            <div className="flex-grow bg-gray-200 h-[1px] w-full my-5" />

            <p className="text-gray-500 text-sm mb-2">DESCRIPTION</p>
            <div className="flex flex-col gap-2 border border-gray-200 p-5 rounded-lg mb-5 text-sm">
                <p className="text-gray-700 font-semibold">{ branchOrder.Description}</p>
            </div>

            <div className="flex-grow bg-gray-200 h-[1px] w-full my-5" />

            <p className="text-gray-700 font-semibold mb-2">BRANCH DETAILS</p>

            <div className="flex justify-between align-center mb-2">
                <p className="text-gray-500 text-sm pl-5">BRANCH ID</p>
                <p className="text-gray-700 text-sm font-semibold">{branchOrder.BranchId}</p>
            </div>
            <div className="flex justify-between align-center mb-2">
                <p className="text-gray-500 text-sm pl-5">BRANCH NAME</p>
                <p className="text-gray-700 text-sm font-semibold">{branchOrder.BranchName}</p>
            </div>
            <div className="flex justify-between align-center mb-2">
                <p className="text-gray-500 text-sm pl-5">BRANCH ADDRESS</p>
                <p className="text-gray-700 text-sm font-semibold">{branchOrder.BranchAddress}</p>
            </div>

            <div className="flex-grow bg-gray-200 h-[1px] w-full my-5" />

            <p className="text-gray-700 font-semibold mb-2">BUYER DETAILS</p>

            <div className="flex justify-between align-center mb-2">
                <p className="text-gray-500 text-sm pl-5">BUYER NAME</p>
                <p className="text-gray-700 text-sm font-semibold">{branchOrder.FullName}</p>
            </div>
            <div className="flex justify-between align-center mb-2">
                <p className="text-gray-500 text-sm pl-5">CONTACT</p>
                <p className="text-gray-700 text-sm font-semibold">{branchOrder.PhoneNumber}</p>
            </div>
            <div className="flex justify-between align-center mb-2">
                <p className="text-gray-500 text-sm pl-5">ADDRESS</p>
                <p className="text-gray-700 text-sm font-semibold">{branchOrder.Address}</p>
            </div>
        </>
    );
}

export default BODetails;