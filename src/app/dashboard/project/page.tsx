"use client";

import AddNewProjectCard from "@/components/Dashboard/Project/AddNewProjectCard";
import AddNewProjectCardModal from "@/components/Dashboard/Project/AddNewProjectCardModal";
import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Project as ProjectInterface, UserInterface } from "@/interfaces";
import { setProjects } from "@/store/features/project";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LIST_PROJECTS = gql`
    query {
        listProjects {
            id
            title
            description
        }
    }
`;

export default function Projects() {
    const [open, setOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState({});

    const { data: session } = useSession();
    const isUser = (session?.data.user as UserInterface)?.isUser;
    const projects = useAppSelector((state) => state.projectReducer.projects);
    const dispatch = useAppDispatch();
    const { loading: graphQLloading, error, data } = useQuery(LIST_PROJECTS);

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (!graphQLloading && data?.listProjects && projects.length == 0) {
            dispatch(setProjects(data.listProjects));
        }
    }, [graphQLloading, data, dispatch, projects]);

    const handleEditProject = (project: ProjectInterface) => {
        setProjectToEdit(project);
        handleToggleModal();
    };
    const handleToggleModal = () => {
        setOpen((prevState) => (prevState = !prevState));
    };

    return (
        projects && (
            <div className="flex justify-start flex-wrap">
                {projects.map((project: ProjectInterface, i: number) => (
                    <ProjectCard
                        project={project}
                        key={project.id}
                        readOnly={!isUser}
                        actionURL={`/dashboard/project/${project.id}`}
                        onEditProject={handleEditProject}
                    />
                ))}

                <AddNewProjectCard handleToggleModal={handleToggleModal} />
                <AddNewProjectCardModal
                    open={open}
                    handleToggleModal={handleToggleModal}
                    projectToEdit={projectToEdit}
                />
            </div>
        )
    );
}
