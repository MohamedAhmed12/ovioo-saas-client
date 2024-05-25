import { useAppSelector } from "@/hooks/redux";
import { TaskTypeInterface } from "@/interfaces";
import "@/styles/components/dashboard/task-type-dropdown.scss";
import { gql, useQuery } from "@apollo/client";
import { Icon, Tooltip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import { MdWarning } from "react-icons/md";
import OviooDropDownWrapper from "./OviooDropDownWrapper";

const LIST_TASK_TYPES = gql`
    query listTaskTypes {
        listTaskTypes {
            id
            title
            info
            extraInfo
            plan {
                title
            }
        }
    }
`;

export default function TaskTypeDropDown({
    onSelected,
    initialVal,
    disabled,
}: {
    onSelected: (selectedVal: string) => void;
    initialVal?: string | number;
    disabled?: boolean;
}) {
    const { loading: graphQLloading, error, data } = useQuery(LIST_TASK_TYPES);
    const authUser = useAppSelector((state) => state.userReducer.user);
    const authUserCurrentPlan = authUser.teams[0].subscriptions[0].plan.title;

    const infoComponent = (info: string[], extraInfo: string | null) => {
        return (
            <span>
                {info.map((elm: string) => (
                    <span key={elm} className="flex flex-wrap text-xl py-[2px]">
                        <Image
                            src={`/svg/star.svg`}
                            width={20}
                            height={20}
                            alt="star bullet-point icon"
                        />
                        {elm}
                    </span>
                ))}
                {extraInfo && (
                    <span className="flex mt-4 mb-3 text-[13px]">
                        <MdWarning className="mr-2" size="30" />
                        {extraInfo}
                    </span>
                )}
            </span>
        );
    };

    return (
        !graphQLloading &&
        !error &&
        data.listTaskTypes && (
            <OviooDropDownWrapper
                inputLabel="Type"
                initialVal={initialVal}
                onSelected={onSelected}
                className="task-type__dropdown !my-4 mx-0 lg:!mx-4"
                disabled={disabled}
            >
                {data.listTaskTypes.map(
                    ({
                        id,
                        title,
                        info,
                        extraInfo,
                        plan,
                    }: TaskTypeInterface) => (
                        <MenuItem
                            value={id}
                            key={title}
                            disabled={
                                authUserCurrentPlan == "standard" &&
                                plan.title != "standard"
                            }
                            className="task-type__option flex items-center !py-2"
                            aria-label="fff"
                        >
                            <span className="basis-[90%] flex items-center">
                                <Tooltip
                                    title={plan.title}
                                    className="task-type__option-text mr-2"
                                >
                                    <Image
                                        src={`/svg/${plan.title}.svg`}
                                        width={20}
                                        height={20}
                                        alt="pro icon"
                                    />
                                </Tooltip>
                                {title}
                            </span>

                            <span className="task-type__option-text basis-[10%] ml-2">
                                <Tooltip title={infoComponent(info, extraInfo)}>
                                    <Icon>
                                        <BsInfoCircleFill size="20" />
                                    </Icon>
                                </Tooltip>
                            </span>
                        </MenuItem>
                    )
                )}
            </OviooDropDownWrapper>
        )
    );
}
