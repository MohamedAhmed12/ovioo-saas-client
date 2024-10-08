"use client";

import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setProjects } from "@/store/features/project";
import "@/styles/app/dashboard/asset.scss";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const LIST_PROJECTS = gql`
    query {
        listProjects {
            id
            title
            description
        }
    }
`;

export default function AssetProjects() {
    const dispatch = useAppDispatch();
    const projects = useAppSelector((state) => state.projectReducer.projects);
    const { loading: graphQLloading, error, data } = useQuery(LIST_PROJECTS);

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (!graphQLloading && data?.listProjects && projects.length == 0) {
            dispatch(setProjects(data.listProjects));
        }
    }, [graphQLloading, data, dispatch, projects]);

    return (
        projects && (
            <div className="asset-container flex justify-start flex-wrap">
                {projects.map((project: any, i) => (
                    <ProjectCard
                        key={i}
                        project={project}
                        readOnly
                        actionURL={`/dashboard/asset/project/${project.id}`}
                    />
                ))}
            </div>
        )
    );
}
