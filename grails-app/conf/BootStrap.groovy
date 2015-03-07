import gravitas.Event
import gravitas.auth.Role
import gravitas.auth.User
import gravitas.auth.UserRole
import org.apache.commons.lang.RandomStringUtils

class BootStrap {

    private static final String USER_ROLE = 'ROLE_USER'
    private static final String USER_USERNAME = 'test@test.com'

    def init = { servletContext ->

        Role role;
        User user;

        if (Role.countByAuthority(USER_ROLE) == 0) {
            log.info("creating new role: $USER_ROLE")
            role = new Role(authority: USER_ROLE)
            role.save()
        } else {
            log.info("role already exists: $USER_ROLE")
            role = Role.findByAuthority(USER_ROLE)
        }

        if (User.countByUsername(USER_USERNAME) == 0) {
            log.info("creating new user: $USER_USERNAME")
            user = new User(username: USER_USERNAME, password: "test123")
            user.save()
        } else {
            log.info("user already exists: $USER_USERNAME")
            user = User.findByUsername(USER_USERNAME)
        }

        if (role.version == 0 || user.version == 0) {
            log.info("creating new user/role association: $USER_USERNAME, $USER_ROLE")
            new UserRole(user: user, role: role).save()
        } else {
            log.info("user/role association already exists: $USER_USERNAME, $USER_ROLE")
        }
        /*
        for (int i = 0; i < 20; i++) {
            new Event(
                    name: RandomStringUtils.randomAlphabetic(50),
                    description: RandomStringUtils.randomAlphabetic(50),
                    date: new Date()
            ).save(flush: true)
        }
        */
    }

    def destroy = {
    }
}