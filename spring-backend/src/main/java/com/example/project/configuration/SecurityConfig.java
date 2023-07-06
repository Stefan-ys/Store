package com.example.project.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public AuthenticationManager customAuthenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
        return authenticationManagerBuilder.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeRequests()
                .and()
                .httpBasic()
                .and()
                .authorizeRequests()
                .anyRequest()
                .permitAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();

//
//        http
//                .authorizeRequests()
//                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
//                .requestMatchers("/").permitAll()
//                .requestMatchers("/users/login", "/users/signup").anonymous()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .loginPage("/users/login")
//                .usernameParameter(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_USERNAME_KEY)
//                .passwordParameter(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_PASSWORD_KEY)
//                .and()
//                .logout()
//                .logoutUrl("/users/logout")
//                .logoutSuccessUrl("/")
//                .invalidateHttpSession(true)
//                .deleteCookies("JSESSIONID") // Specify the cookie name(s) to delete
//                .and()
//                .securityContext()
//                .securityContextRepository(securityContextRepository());
//
//        return http.build();
    }
//    @Bean
//    public SecurityContextRepository securityContextRepository() {
//        return new DelegatingSecurityContextRepository(
//                new RequestAttributeSecurityContextRepository(),
//                new HttpSessionSecurityContextRepository()
//        );
//    }
//
//    @Bean
//    public UserDetailsService userDetailsService(UserRepository userRepository) {
//        return new ApplicationUserDetailService(userRepository);
//    }
}
