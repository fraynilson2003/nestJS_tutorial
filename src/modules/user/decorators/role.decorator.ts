import { SetMetadata } from "@nestjs/common"

//@Roles("admin", "other")
export const DRoles = (...roles: string[]) => {
    return SetMetadata("roles", roles)
}

