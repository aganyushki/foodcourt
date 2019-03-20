package far.galaxy.foodcourt.appcore.etc;

import far.galaxy.foodcourt.appcore.system.SecurityUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@Configuration
public class SecureConfig extends WebSecurityConfigurerAdapter {

    private final static String ROLE_ADMIN = "ADMIN";

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable().cors()
                .and()
                .formLogin()
                    .successForwardUrl("/api/system/auth/ok")
                    .failureForwardUrl("/api/system/auth/fail")
                    .usernameParameter("login")
                    .passwordParameter("password")
                    .loginPage("/api/login")
                    .permitAll()
                .and()
                .logout()
                    .logoutUrl("/api/logout")
                    .invalidateHttpSession(true)
                    .logoutSuccessUrl("/")
                    .deleteCookies("JSESSIONID")
                    .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout"))
                .and()
                .authorizeRequests()
                    .antMatchers(HttpMethod.GET, "/api/incoming").hasRole(ROLE_ADMIN)
                    .antMatchers(HttpMethod.GET, "/api/system/check/admin").hasRole(ROLE_ADMIN)
                    .antMatchers(HttpMethod.PUT, "/api/orders").permitAll()
                    .antMatchers(HttpMethod.GET, "/api/orders").hasRole(ROLE_ADMIN)
                    .antMatchers("/api/login").permitAll()
                    .antMatchers("/api/logout").permitAll()
                    .antMatchers(HttpMethod.GET, "/api/orders/**").hasRole(ROLE_ADMIN)
                    .antMatchers(HttpMethod.GET, "/**").permitAll()
                    .anyRequest().hasRole(ROLE_ADMIN);
    }

    @Autowired
    private SecurityUserDetailsService securityUserDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(securityUserDetailsService);
        authProvider.setPasswordEncoder(encoder());

        return authProvider;
    }

    @Bean
    public PasswordEncoder encoder() {
        return NoOpPasswordEncoder.getInstance();
//        return new BCryptPasswordEncoder(11); // todo
    }
}
