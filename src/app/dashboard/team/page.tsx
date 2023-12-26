import AddTeamMemberCard from "@/components/Dashboard/Team/AddTeamMemberCard";
import TeamMembersCard from "@/components/Dashboard/Team/TeamMembersCard";
import { authOptions } from "@/constants/authOptions";
import { getClient } from "@/utils/getClient";
import { ApolloClient, gql } from "@apollo/client";
import { getServerSession } from "next-auth";

const GET_TEAM = gql`
    query {
        getTeam {
            id
            owner_id
            members {
                id
                fullname
                avatar
            }
        }
    }
`;

export default async function Team() {
    const session = await getServerSession(authOptions);
    const client: ApolloClient<any> | undefined = getClient(session);

    const {
        loading: graphQLloading,
        error,
        data: team,
    } = await client?.query({
        query: GET_TEAM,
        fetchPolicy: "no-cache",
    });

    if (error) throw new Error();

    return (
        session &&
        !graphQLloading &&
        !error &&
        team.getTeam && (
            <div className="team-card flex flex-col lg:flex-row w-full justify-between flex-wrap max-w-full">
                <AddTeamMemberCard
                    team={team.getTeam}
                    headerTitle="Add new member"
                    session={session}
                />
                {team.getTeam.members.length > 1 && (
                    <TeamMembersCard
                        headerTitle="your team"
                        team={team.getTeam}
                    />
                )}
            </div>
        )
    );
}
