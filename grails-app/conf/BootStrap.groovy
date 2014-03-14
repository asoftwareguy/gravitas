import gravitas.auth.Role
import gravitas.auth.User
import gravitas.auth.UserRole

class BootStrap {

    def init = { servletContext ->

        User user = new User(username: "test", password: "test123")
        user.save()

        Role roleUser = new Role(authority: "ROLE_USER")
        roleUser.save()

        new UserRole(user: user, role: roleUser).save()
    }
    def destroy = {
    }
}
