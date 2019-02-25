package far.galaxy.foodcourt.appcore.system;

import far.galaxy.foodcourt.entity.system.User;
import far.galaxy.foodcourt.entity.system.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@ExtendWith(MockitoExtension.class)
public class SecurityUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SecurityUserDetailsService service;

    @Test
    public void initializationTest() {
        Assertions.assertNotNull(service);
    }

    @Test
    public void checkLoadUserByUsername() {
        String name = "user-name";
        User mockUser = Mockito.mock(User.class);

        Mockito.when(userRepository.findByUsername(name)).thenReturn(mockUser);
        SecurityUserPrincipal userDetails = (SecurityUserPrincipal) service.loadUserByUsername(name);
        Assertions.assertEquals(mockUser, userDetails.getUser());
    }

    @Test
    public void checkLoadUserByUsernameWithUsernameNotFoundException() {
        String name = "user-name";

        Mockito.when(userRepository.findByUsername(name)).thenReturn(null);
        Assertions.assertThrows(
                UsernameNotFoundException.class,
                () -> service.loadUserByUsername(name)
        );
    }
}
