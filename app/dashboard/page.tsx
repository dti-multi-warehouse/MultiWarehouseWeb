import {FC} from "react";
import DashboardCard from "@/components/DashboardCard";

const Dashboard: FC = () => {

    const props = {
        image: "/frost.jpg",
        imageAlt: "FrostNova",
        children: <p>FrostNova</p>
    }

    return <div>
        <DashboardCard image={props.image} imageAlt={props.imageAlt}>{props.children}</DashboardCard>
    </div>
}

export default Dashboard
