import {FC} from "react";
import CreateWarehouseAdmin from "./components/CreateWarehouseAdmin";
import UsersTable from "./components/UsersTable";


const UsersDashboardPage: FC = () => {
    return (
    <>
    <div className="p-10 flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">User List Dashboard</h1>
                <CreateWarehouseAdmin />
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-lg "></div>
            <div>
                <UsersTable />
            </div>
        </div>
    </>
    )
}

export default UsersDashboardPage