import { RoleEnum } from "@/interfaces";

export function determineUserRoleGroup(role: RoleEnum) {    
    return {
        isUser: [RoleEnum.User, RoleEnum.Member].includes(role) || false,
        isDesigner:
            [RoleEnum.Designer, RoleEnum.Agency].includes(role) || false,
        isManager:
            [RoleEnum.AccountManager, RoleEnum.Admin].includes(role) || false,
    };
}
